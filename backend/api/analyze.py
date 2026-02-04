from dotenv import load_dotenv
import requests
import os
from grade_manual import Grade_Manual
from grade_model import Grade
from build_data_set import BuildDataSet

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

def analyze(symbol:str):

    data = connect_to_api(symbol)
    
    if data is None:
        print("Failed to retrieve data from API")
        return None
    
    if data and 'values' in data:
        history = data['values']
    elif isinstance(data, list):
        history = data
    else:
        history = []
    market_cap, description = get_market_cap(symbol)
    
    volume, price_data = get_avg_volume(history)
    if market_cap == 0:
        return {"error": "Stock not available, could not retrieve market cap"}
    
    
    grade = Grade(symbol, float(market_cap), history, description, price_data)
    
    result = grade.grade()
    print(result)
    manual_grade = Grade_Manual(symbol, float(market_cap), volume=volume,history=history)
    print("Manual Grade: ", manual_grade.grade())
    return result

def get_market_cap(symbol):
    API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY') 
    try:
        url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={API_KEY}'
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        market_cap = data['MarketCapitalization']
        stock_description = data['Description']
        return market_cap, stock_description
    
    except Exception as e:
        print(f"Error fetching Alpha Vantage data: {e}")
        print("Using yfinance...")
        f = BuildDataSet()
        market_cap = f.get_market_cap(symbol)
        return market_cap, "No description (We ran out of credits)"
    
    
def connect_to_api(symbol: str):

    API_KEY = os.getenv('VITE_TWELVE_DATA_API_KEY') 
    interval = '1day'
    output_size = 90

    url = 'https://api.twelvedata.com/time_series'
    params = {
            "apikey": API_KEY,
            "symbol": symbol,
            "interval": interval,
            "outputsize": output_size,
            "format": "JSON"
        }
    try:
        print(f"[twelvedata][time_series] firing request for {symbol} interval={interval} output_size={output_size}")
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        print(f"[twelvedata][time_series] success for {symbol} values={len(data.get('values', [])) if isinstance(data, dict) else 'n/a'}")
        return data
    except Exception as e:
        print(f"Failed to connect to Twelve Data api: {e}")
        return None
    
    
def get_avg_volume(values):
    if not values:
        return 0, []
    
    total_volume = sum(int(day['volume']) for day in values if 'volume' in day)
    avg_volume = total_volume / len(values)
    return avg_volume, values
