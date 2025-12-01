import React, { useEffect, useState, useRef } from "react";

const StockTicker = ({ stock }) => {
  const isPositive = stock.change >= 0;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 16px",
        borderRight: "1px solid #e5e7eb",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>
        {stock.symbol}
      </span>
      <span style={{ fontSize: "13px", color: "#374151" }}>
        {stock.price.toFixed(2)}
      </span>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 500,
          color: isPositive ? "#16a34a" : "#dc2626",
        }}
      >
        {isPositive ? "▲" : "▼"} {Math.abs(stock.change).toFixed(2)}
      </span>
    </div>
  );
};

const Header = () => {
  const [stocks, setStocks] = useState([]);
  const [pinned, setPinned] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Load pinned list on startup
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pinnedStocks") || "[]");
    setPinned(saved);

    const syncPinned = () => {
      const latest = JSON.parse(localStorage.getItem("pinnedStocks") || "[]");
      setPinned(latest);
    };
    window.addEventListener("pinnedStocksUpdated", syncPinned);
    window.addEventListener("storage", syncPinned);
    return () => {
      window.removeEventListener("pinnedStocksUpdated", syncPinned);
      window.removeEventListener("storage", syncPinned);
    };
  }, []);

  const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

  const stocksData = [
    { symbol: "ETR", name: "Entergy Corporation" },
    { symbol: "LUMN", name: "Lumen Technologies" },
    { symbol: "HLX", name: "Helix Energy Solutions" },
    { symbol: "SPN", name: "Superior Energy Services" },
    { symbol: "NBR", name: "Nabors Industries" },
    { symbol: "PUMP", name: "ProPetro Holding Corp" },
    { symbol: "MTRN", name: "Materion Corporation" }
  ];


  return (
    <div style={{ width: "100%" }}>
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: "#1f2937",
          borderBottom: "1px solid #374151",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>
            Louisiana Stocks
          </span>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>
            Real-time tracking
          </span>
        </div>

        <button
          disabled={isRefreshing}
          style={{
            padding: "4px 12px",
            fontSize: 12,
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            opacity: isRefreshing ? 0.6 : 1,
          }}
        >
          {isRefreshing ? "⟳ ..." : "⟳ Refresh"}
        </button>
      </div>

      {/* Unified Ticker */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f9fafb",
          borderBottom: "1px solid #e5e7eb",
          height: 40,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              paddingLeft: 8,
            }}
          >
            {/* Louisiana Stocks */}
            {stocks.map((stock) => (
              <StockTicker key={stock.symbol} stock={stock} />
            ))}

            {/* Pinned Stocks */}
            {pinned.map((p) => (
              <a
                key={`pinned-${p.symbol}`}
                href={`/dashboard/${p.symbol}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 16px",
                  borderRight: "1px solid #e5e7eb",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  color: "#0ea5e9",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {p.symbol}
                <span style={{ color: "#34d399" }}>
                  {Number.isFinite(Number(p.price))
                    ? Number(p.price).toFixed(2)
                    : "--"}
                </span>
              </a>
            ))}
          </div>
        </div>

        {lastUpdate && (
          <div
            style={{
              flexShrink: 0,
              padding: "0 16px",
              fontSize: 11,
              color: "#6b7280",
              borderLeft: "1px solid #e5e7eb",
              whiteSpace: "nowrap",
            }}
          >
            Updated: {lastUpdate}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
