import { useState, useEffect } from "react";
import axios from "axios";

export default function FavoriteStocks() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [newStock, setNewStock] = useState("");
  const [prices, setPrices] = useState({}); // { ticker: { price, change } }
  const [loading, setLoading] = useState(false);

  // Save favorites in localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch stock prices whenever favorites change
  useEffect(() => {
    if (favorites.length === 0) return;
    setLoading(true);

    const fetchPrices = async () => {
      try {
        const results = {};
        for (const ticker of favorites) {
          // Use Yahoo Finance unofficial API
          const response = await axios.get(
            `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`
          );
          const quote = response.data.quoteResponse.result[0];
          results[ticker] = {
            price: quote.regularMarketPrice,
            change: quote.regularMarketChange,
          };
        }
        setPrices(results);
      } catch (err) {
        console.error("Error fetching stock prices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [favorites]);

  const addFavorite = () => {
    const ticker = newStock.trim().toUpperCase();
    if (ticker && !favorites.includes(ticker)) {
      setFavorites([...favorites, ticker]);
      setNewStock("");
    }
  };

  const removeFavorite = (ticker) => {
    setFavorites(favorites.filter((f) => f !== ticker));
    const copy = { ...prices };
    delete copy[ticker];
    setPrices(copy);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>Favorite Stocks</h2>

      <div>
        <input
          type="text"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="Enter stock ticker (e.g., AAPL)"
        />
        <button onClick={addFavorite} style={{ marginLeft: "0.5rem" }}>
          Pin Stock
        </button>
      </div>

      {favorites.length === 0 ? (
        <p>No pinned stocks yet.</p>
      ) : (
        <table style={{ marginTop: "1rem", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc" }}>Ticker</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Price</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Change</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((ticker) => (
              <tr key={ticker}>
                <td>{ticker}</td>
                <td>{prices[ticker]?.price ?? "..."}</td>
                <td
                  style={{
                    color:
                      prices[ticker]?.change > 0
                        ? "green"
                        : prices[ticker]?.change < 0
                        ? "red"
                        : "black",
                  }}
                >
                  {prices[ticker]?.change?.toFixed(2) ?? "..."}
                </td>
                <td>
                  <button onClick={() => removeFavorite(ticker)}>Unpin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {loading && <p>Fetching prices...</p>}
    </div>
  );
}
