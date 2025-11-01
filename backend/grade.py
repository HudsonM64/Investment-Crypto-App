
import re
from typing import List
import math


class Grade:
    
    def __init__(self, symbol: str, market_cap: float, liquidity: float, volatility: float):
        self.symbol = symbol
        self.market_cap = market_cap
        self.liquidity = liquidity
        self.volatility = volatility
    
    def score_market_cap(self):
        mc = self.market_cap
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
    
    def grade(self):
        volatility = self.volatility
        liquidity = self.liquidity
        
        market_cap_score = self.score_market_cap()
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


