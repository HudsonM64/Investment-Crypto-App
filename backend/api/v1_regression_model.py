import numpy as np
from pydantic import BaseModel
from typing import List

class ForecastResponse(BaseModel):
    dates: List[str]
    predictions: List[float]


def forecast_stock(prices: List[float]) -> ForecastResponse:
    """
    Generate a 30-day forecast using momentum + noise.
    Looks much more like a real stock price curve.
    """

    if len(prices) < 5:
        raise ValueError("Not enough price data")

    last_price = prices[-1]

    # Recent momentum → slope of last 5 days
    momentum = (prices[-1] - prices[-5]) / 5

    preds = []
    curr = last_price

    for _ in range(30):
        noise = np.random.normal(scale=0.8)  # control randomness
        curr += momentum * 0.6 + noise       # blend of trend + noise
        preds.append(round(curr, 2))

    # Generate future date labels
    import datetime
    today = datetime.date.today()
    date_list = [(today + datetime.timedelta(days=i)).isoformat() for i in range(1, 31)]

    return ForecastResponse(dates=date_list, predictions=preds)
