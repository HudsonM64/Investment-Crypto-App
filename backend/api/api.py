import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from analyze import analyze
from v1_regression_model import ForecastResponse, forecast_stock

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analyze/{stock}")
def analyze_stock(stock: str):
    result = analyze(stock)
    return result

@app.get("/forecast/{symbol}")
def get_forecast(symbol: str):
    past_data = analyze(symbol)

    prices = [float(p["close"]) for p in past_data["price_data"]]
    prices = prices[::-1]

    result = forecast_stock(prices)
    return result


@app.get("/health")
def health():
    return { "status": "online" }
