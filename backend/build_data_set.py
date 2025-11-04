import collections
import csv
import math
from ntpath import isfile
import os
import yfinance as yf
from grade_manual import Grade

class BuildDataSet:
    def __init__(self):
        self.stocks_with_errors = []
        
    def get_market_cap(self, ticker):
        try:
            info = yf.Ticker(ticker).info
            market_cap = info['marketCap']
            return market_cap
        except Exception as e:
            print(f"Error getting market cap: {ticker}: {e}")
            self.stocks_with_errors.append(ticker)
            return 0
        
    def calculate_liquidity(self, avg_volume, market_cap):
        if market_cap == 0:
            return 0
        
        liquidity_score = (avg_volume / market_cap) * 100
        return liquidity_score
        
    def calculate_volatility(self, closes, volumes):
            # Calculate daily changes as a percentage
            percent_changes = []
            for i in range(1, len(closes)):
                previous = closes[i - 1]
                current = closes[i]

                if previous == 0:
                    continue  # avoid divide-by-zero

                daily_change = (current - previous) / previous
                percent_changes.append(daily_change)

            # Calculate the average change
            total = 0
            for r in percent_changes:
                total += r
            avg_return = total / len(percent_changes)

            # Calculate squared differences
            squared_diffs = 0
            for r in percent_changes:
                squared_diffs += (r - avg_return) ** 2

            # Evaluate variance and standard deviation
            variance = squared_diffs / len(percent_changes)
            std_dev = math.sqrt(variance)
            return std_dev
            
    def collect_n_day_data(self, content, ticker, n=90):
        last_n_days = content[-n:]
        closes = []
        for row in last_n_days:
            if row[1]:
                closes.append(float(row[1]))
                
        volumes = []
        for row in last_n_days:
            if row[5]:
                volumes.append(float(row[5]))
                
        avg_volume = sum(volumes) / len(volumes)
        volatility = self.calculate_volatility(closes, volumes)
        market_cap = self.get_market_cap(ticker)
        liquidity = self.calculate_liquidity(avg_volume, market_cap)
        grader = Grade(ticker, market_cap, avg_volume, None)
        grade = grader.grade(market_cap, volatility, liquidity)
        
        return {
            "symbol": ticker,
            "market_cap": market_cap,
            "volatility": round(volatility, 6),
            "liquidity": round(liquidity, 6),
            "grade": grade
        }
        
    def main(self):
        folder_path = "./stocks"
        output_file = 'new_graded_data_set.csv'
        with open(output_file, 'w', encoding='utf-8') as f:
            
            writer = csv.DictWriter(f, fieldnames=["symbol", "market_cap", "volatility", "liquidity", "grade"])
            writer.writeheader()
            
            for filename in os.listdir(folder_path):
                file_path = os.path.join(folder_path, filename)
                if os.path.isfile(file_path) and filename.endswith(".csv"):
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f_in:
                            reader = list(csv.reader(f_in))
                            content = reader[3:]
                            ticker = filename.removesuffix('.csv')
                            row_data = self.collect_n_day_data(content, ticker)
                            if row_data:
                                writer.writerow(row_data)
                                print(f"Processed {filename}")
                            else:
                                print(f"Skipped {filename}")
                    except Exception as e:
                        print(f"Failed to read {filename}")
            
        print(f'\n\nStocks with errors: {self.stocks_with_errors}')
        # Price,Close,High,Low,Open,Volume
        
if __name__ == '__main__':
    BuildDataSet().main()