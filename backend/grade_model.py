import pandas as pd
import re
from typing import List
import math

import joblib


class Grade:
    
    def __init__(self, symbol: str, market_cap: float, history: List[dict]):
        self.symbol = symbol
        self.market_cap = market_cap
        self.history = history
        
        
        self.compute_averages()
        
    def compute_averages(self):
        if not self.history:
            self.avg_volume = 0
            self.avg_price = 0
            return
        
        total_volume = 0
        total_price = 0
        
        for day in self.history:
            total_volume += float(day.get('volume', 0))
            total_price += float(day.get('close', 0))
        
        self.avg_volume = total_volume / len(self.history)
        self.avg_price = total_price / len(self.history)
        

    def compute_volatility(self):
        """Computes volatility in the past 30 days by calculating the stock's standard deviation
        """
        # If there's no history, treat it as a new/unproven stock
        if not self.history or self.avg_price == 0:
            return 0.2

        # Collect all closing prices
        closes = []
        for day in self.history:
            close = float(day.get('close', 0))
            closes.append(close)

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
    
    def compute_liquidity(self):
        if self.market_cap == 0:
            print("Error, market cap is 0")
            return 0
        
        liquidity_score = (self.avg_volume / self.market_cap) * 100
        return liquidity_score
    
    def grade(self):
        model = joblib.load('rf_model.pkl')
        
        volatility = self.compute_volatility()
        liquidity = self.compute_liquidity()
        market_cap = self.market_cap
        X = pd.DataFrame([{
        "market_cap": market_cap,
        "volatility": volatility,
        "liquidity": liquidity
        }])
        
        predicted_grade = model.predict(X)[0]
        
        return {
            "symbol": self.symbol,
            "market_cap": self.market_cap,
            "volatility": round(volatility, 5),
            "liquidity": round(liquidity, 5),
            "grade": f"{predicted_grade}"
        }