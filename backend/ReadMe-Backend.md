# Backend README

This document explains how to set up, run, and use the backend API server for the Crypto Project.

## Prerequisites

1. **Python 3.12** (or compatible version)
2. **Virtual Environment** (venv) - recommended
3. **API Key** from Twelve Data API (stored in `.env` file)

## Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Activate the virtual environment:**

   ```bash
   # From the project root
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies:**

   ```bash
   pip install -r ../requirements.txt
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the project root directory
   - Add your Twelve Data API key:
     ```
     API_KEY=your_api_key_here
     ```

5. **Ensure model file exists:**
   - The `rf_model.pkl` file should be present in the `backend` directory
   - This file contains the trained machine learning model

## Running the Server

To start the uvicorn server, run the following command from the `backend` directory:

```bash
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

**Command breakdown:**

- `uvicorn` - ASGI server for FastAPI
- `api:app` - Points to the `app` object in `api.py`
- `--reload` - Enables auto-reload on code changes (useful for development)

**Alternative (production):**

```bash
uvicorn api:app --reload
```

The server will start and be available at: `http://localhost:8000`

## API Endpoints

### 1. Health Check

**Endpoint:** `GET /health`

**Description:** Check if the server is running and responding.

**Request:**

```bash
curl http://localhost:8000/health
```

**Response:**

```json
{
  "status": "online"
}
```

---

### 2. Analyze Stock/Crypto

**Endpoint:** `POST /analyze`

**Description:** Analyzes a stock or cryptocurrency symbol and returns a grade with market metrics.

**Request:**

**Headers:**

```
Content-Type: application/json
```

**Body:**

```json
{
  "symbol": "AAPL"
}
```

**Example using JavaScript (fetch):**

```javascript
const response = await fetch("http://localhost:8000/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    symbol: "AAPL",
  }),
});

const data = await response.json();
console.log(data);
```

**Parameters:**

- `symbol` (string, required): The stock or cryptocurrency ticker symbol (e.g., "AAPL", "BTCUSD", "TSLA")

**Response:**

**Success Response:**

```json
{
  "symbol": "AAPL",
  "market_cap": {
    "value": "3000000000000",
    "condition": "Excellent"
  },
  "volatility": {
    "value": "0.01523",
    "condition": "Excellent"
  },
  "liquidity": {
    "value": "0.02345",
    "condition": "Good"
  },
  "grade": "A"
}
```

**Error Response:**

- Due to the limited resources for retrieving market cap, we're using yfinance to retrieve it which doesn't include every single possible stock.

```json
{
  "error": "Stock not available, could not retrieve market cap"
}
```

**Response Fields:**

- `symbol` (string): The stock/crypto symbol that was analyzed
- `market_cap` (object):
  - `value` (string): Market capitalization value
  - `condition` (string): One of: "Excellent", "Good", "Ok", "Bad", "Terrible"
- `volatility` (object):
  - `value` (string): Calculated volatility (standard deviation of price changes)
  - `condition` (string): One of: "Excellent", "Good", "Ok", "Bad"
- `liquidity` (object):
  - `value` (string): Liquidity score (calculated as average volume / market cap \* 100)
  - `condition` (string): One of: "Excellent", "Good", "Ok", "Bad"
- `grade` (string): Machine learning predicted grade (typically "A", "B", "C", "D", or "F")

## Frontend Integration

### Example React Component

```javascript
import { useState } from "react";

function StockAnalyzer() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeStock = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze stock");
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter symbol (e.g., AAPL)"
      />
      <button onClick={analyzeStock} disabled={loading || !symbol}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <h2>
            {result.symbol} - Grade: {result.grade}
          </h2>
          <div>
            <h3>Market Cap</h3>
            <p>Value: {result.market_cap.value}</p>
            <p>Condition: {result.market_cap.condition}</p>
          </div>
          <div>
            <h3>Volatility</h3>
            <p>Value: {result.volatility.value}</p>
            <p>Condition: {result.volatility.condition}</p>
          </div>
          <div>
            <h3>Liquidity</h3>
            <p>Value: {result.liquidity.value}</p>
            <p>Condition: {result.liquidity.condition}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockAnalyzer;
```

## CORS Configuration

The API currently has CORS enabled for all origins (`allow_origins=["*"]`). For production, you should restrict this to your frontend domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

1. **Port already in use:**

   - Change the port: `uvicorn api:app --port 8001`

2. **Module not found errors:**

   - Ensure virtual environment is activated
   - Reinstall dependencies: `pip install -r ../requirements.txt`

3. **API key errors:**

   - Verify `.env` file exists in project root
   - Check that `API_KEY` is set correctly
   - Ensure the API key is valid and active

4. **Model file not found:**

   - Ensure `rf_model.pkl` exists in the `backend` directory

5. **Connection timeout:**
   - Check internet connection
   - Verify Twelve Data API is accessible
   - Check API key rate limits

## Notes

- The API fetches the last 90 days of historical data from Twelve Data API
- The machine learning model requires market_cap, volatility, and liquidity features
- The server runs on port 8000 by default (changeable with `--port` flag)
