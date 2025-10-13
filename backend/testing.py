import json
import re
from grade import Grade


if __name__ == "__main__":
    with open('mock_data.json', 'r') as f:
        data = json.load(f)
        
    mc = float(data['market_cap'])
    volume = float(data.get('volume', 0))
    
    asset = Grade(symbol=data['symbol'], market_cap=mc, volume=data['volume'], history=data['history'])
    result = asset.grade()
    
    print(f"Stock: {data['symbol']}\nGrade: {result['grade']}")