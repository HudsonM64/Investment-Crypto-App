from dotenv import load_dotenv
import requests
import os
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
    f = BuildDataSet()
    market_cap = f.get_market_cap(symbol)
    if market_cap == 0:
        return {"error": "Stock not available, could not retrieve market cap"}
    
    
    grade = Grade(symbol, float(market_cap), history)
    
    result = grade.grade()
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
        return 0, ""
    
    
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
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        return data
    except Exception as e:
        print(f"Failed to connect to Twelve Data api: {e}")
        return None