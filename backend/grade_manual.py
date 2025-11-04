
import re
from typing import List, final
import math


class Grade:
    
    def __init__(self, symbol: str, market_cap: float, volume: float, history: List[dict]):
        self.symbol = symbol
        self.market_cap = market_cap
        self.volume = volume
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
        
        liquidity_score = (self.avg_volume / self.market_cap) * 100
        return liquidity_score
    
    def score_market_cap(self, market_cap):
        mc = market_cap
        if mc > 100_000_000_000: return 100
        elif mc > 10_000_000_000: return 80
        elif mc > 1_000_000_000: return 60
        elif mc > 100_000_000: return 40
        else: return 20
    
    def score_volatility(self, vol):
        if vol < 0.02: return 100
        elif vol < 0.04: return 80
        elif vol < 0.08: return 60
        else: return 40
    
    def score_liquidity(self, liq):
        if liq > 0.1: return 100
        elif liq > 0.05: return 80
        elif liq > 0.01: return 60
        else: return 40
    
    def assign_letter_grade(self, reliability_score):
        if reliability_score >= 90: return 'A'
        elif reliability_score >= 75: return 'B'
        elif reliability_score >= 60: return 'C'
        elif reliability_score >= 45: return 'D'
        else: return 'F'
    
    def assign_number_grade(self, liquidity_score):
        rounded = round(liquidity_score / 10) # Score of 76 returns 7.6 then rounds to 8
        capped = min(10, rounded) # ensures value is not > 10
        return max(1, capped) # ensures value is not < 1
    
    def grade(self, market_cap=None, volatility=None, liquidity=None):
        if market_cap is None:
            market_cap = self.market_cap
        if volatility is None:
            volatility = self.compute_volatility()
        if liquidity is None:
            liquidity = self.compute_liquidity()
        
        market_cap_score = self.score_market_cap(market_cap)
        volatility_score = self.score_volatility(volatility)
        liquidity_score = self.score_liquidity(liquidity)
        
        reliability_score = (market_cap_score + volatility_score) / 2
        
        letter_grade = self.assign_letter_grade(reliability_score)
        number_grade = self.assign_number_grade(liquidity_score)
        final_grade = f'{letter_grade}{number_grade}'
        
        return final_grade
    
        # print(f"""
        #       Volatility: {volatility}
        #       Liquidity: {liquidity}
        #       Market Cap Score: {market_cap_score}
        #       Volatility Score: {volatility_score}
        #       Liquidity Score: {liquidity_score}
        #       Reliability Score: {reliability_score}
        #       Letter Grade: {letter_grade}
        #       Number Grade: {number_grade}
        #       """)
        
        # return {
        #     "symbol": self.symbol,
        #     "market_cap": self.market_cap,
        #     "volatility": round(volatility, 5),
        #     "volume": self.volume,
        #     "liquidity": round(liquidity, 5),
        #     "grade": f"{letter_grade}{number_grade}",
        #     "breakdown": {
        #         "market_cap_score": market_cap_score,
        #         "volatility_score": volatility_score,
        #         "liquidity_score": liquidity_score,
        #         "reliability_score": reliability_score,
        #         "letter": letter_grade,
        #         "number": number_grade
        #     }
        # }