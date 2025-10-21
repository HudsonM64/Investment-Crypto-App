import pytest
from grade import Grade
import os
import json

def test_empty_history_should_return_zero_volatility_and_liquidity():
    asset = Grade(symbol="TEST", market_cap=1_000_000_000, volume=1_000_000, history=[])
    result = asset.grade()

    assert result["volatility"] == 0.2
    assert result["liquidity"] == 0
    
def test_default_volatility_for_new_assets():
    asset = Grade("NEWCOIN", market_cap=500_000_000, volume=10_000_000, history=[])
    result = asset.grade()
    assert round(result["volatility"], 2) == 0.2
    assert result["breakdown"]["volatility_score"] == 40

def test_low_market_cap_should_result_in_low_score():
    mock_history = [
        {"close": "10.0", "volume": "10000"},
        {"close": "10.5", "volume": "11000"},
        {"close": "10.2", "volume": "9500"},
        {"close": "10.1", "volume": "9800"},
        {"close": "10.3", "volume": "10200"}
    ]
    asset = Grade(
        symbol="PENNY",
        market_cap=50_000_000,  # Very small
        volume=500_000,
        history=mock_history
    )
    result = asset.grade()

    assert result["breakdown"]["market_cap_score"] == 20
    assert result["grade"].startswith("D") or result["grade"].startswith("F")

def test_high_volatility_should_penalize_score():
    high_vol_history = [
        {"close": "100.0", "volume": "100000"},
        {"close": "130.0", "volume": "110000"},
        {"close": "70.0", "volume": "120000"},
        {"close": "140.0", "volume": "105000"},
        {"close": "60.0", "volume": "115000"},
    ]
    asset = Grade(
        symbol="VOLATILE",
        market_cap=5_000_000_000,
        volume=20_000_000,
        history=high_vol_history
    )
    result = asset.grade()

    assert result["breakdown"]["volatility_score"] == 40
    assert result["grade"].startswith("C") or result["grade"].startswith("D")

def test_liquidity_above_10_percent_should_be_graded_as_10():
    # liquidity = (avg_volume / market_cap) * 100
    # => (12B / 100B) * 100 = 12%
    history = [{"close": "100.0", "volume": "12_000_000_000"} for _ in range(30)]
    asset = Grade(
        symbol="LIQUID",
        market_cap=100_000_000_000,
        volume=12_000_000_000,
        history=history
    )
    result = asset.grade()

    assert result["breakdown"]["liquidity_score"] == 100
    assert result["breakdown"]["number"] == 10

def test_grade_returns_expected_structure():
    mock_history = [{"close": "100.0", "volume": "100000"} for _ in range(30)]
    asset = Grade("STRUCT", 1_000_000_000, 10_000_000, mock_history)
    result = asset.grade()

    assert "symbol" in result
    assert "market_cap" in result
    assert "volatility" in result
    assert "volume" in result
    assert "liquidity" in result
    assert "grade" in result
    assert isinstance(result["grade"], str)
    assert result["grade"][0] in "ABCDEF"
    assert 1 <= int(result["grade"][1:]) <= 10


def test_grading_with_mock_json():
    # Load JSON file
    with open("mock_data.json", "r") as f:
        data = json.load(f)

    # Extract values needed for Grade
    symbol = data["symbol"]
    market_cap = 2_800_000_000_000  # You can hardcode or derive this
    volume = float(data["volume"])
    history = data["history"]

    # Create and grade asset
    asset = Grade(symbol, market_cap, volume, history)
    result = asset.grade()

    # Assertions (you can change these based on what you expect)
    assert result["symbol"] == "AAPL"
    assert result["market_cap"] == market_cap
    assert isinstance(result["volatility"], float)
    assert 0 < result["liquidity"] < 100
    assert result["grade"][0] in "ABCDEF"
    assert 1 <= int(result["grade"][1:]) <= 10