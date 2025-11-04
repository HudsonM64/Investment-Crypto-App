from dotenv import load_dotenv
import requests
import os
from grade_model import Grade
from build_data_set import BuildDataSet

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

async def analyze(symbol:str):

    data = await connect_to_api(symbol)
    
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
    market_cap = f.get_market_cap(ticker=symbol)
    if market_cap == 0:
        return {"error": "Stock not available, could not retrieve market cap"}
    grade = Grade(symbol, market_cap, history)
    
    result = grade.grade()
    print(result)
    return result
    
async def connect_to_api(symbol: str):

    API_KEY = os.getenv('API_KEY') 
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
        
        if 'status' in data and data['status'] != 'ok':
            print(f"API error: {data.get('message', 'Unknown error')}")
            return {
                "error: ": f"{data.get('message', 'Unknown error')}"
            }
        return data
    except Exception as e:
        print(f"Failed to connect to api: {e}")
        return None