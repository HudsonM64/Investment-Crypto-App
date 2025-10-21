import json
import re
import argparse
import sys
from grade import Grade


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Grade a cryptocurrency asset from JSON data')
    parser.add_argument('json_file', nargs='?', 
                       help='Path to the JSON file containing asset data (default: mock_data.json)')
    
    args = parser.parse_args()
    
    try:
        with open(args.json_file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File '{args.json_file}' not found.")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in file '{args.json_file}': {e}")
        sys.exit(1)
        
    mc = float(data['market_cap'])
    volume = float(data.get('volume', 0))
    
    asset = Grade(symbol=data['symbol'], market_cap=mc, volume=data['volume'], history=data['history'])
    result = asset.grade()
    
    print(f"Stock: {data['symbol']}\nGrade: {result['grade']}")