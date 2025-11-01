import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
model = joblib.load('rf_model.pkl')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to hosted route later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StockInput(BaseModel):
    market_cap: float
    volatility: float
    liquidity: float
    
    
@app.post("/predict")
def predict_stock_grade(data: StockInput):
    X = pd.DataFrame([{
        "market_cap": data.market_cap,
        "volatility": data.volatility,
        "liquidity": data.liquidity
    }])
    
    predicted_grade = model.predict(X)[0]
    return predicted_grade

@app.get("/health")
def health():
    return {
        "status": "online"
    }
