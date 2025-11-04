import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from analyze import analyze

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
    symbol: str
    
    
@app.post("/analyze")
async def predict_stock_grade(data: StockInput):
    result = await analyze(data.symbol)
    return result

@app.get("/health")
def health():
    return {
        "status": "online"
    }