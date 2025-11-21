import React, { useEffect, useState } from "react";

const StockTicker = ({ stock }) => {
  const isPositive = stock.change >= 0;
  
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0 16px', borderRight: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{stock.symbol}</span>
      <span style={{ fontSize: '13px', color: '#374151' }}>{stock.price.toFixed(2)}</span>
      <span style={{ fontSize: '12px', fontWeight: 500, color: isPositive ? '#16a34a' : '#dc2626' }}>
        {isPositive ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}
      </span>
    </div>
  );
};

const StockApp = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const fetchStocks = async () => {
    try {
      setError(null);
      if (stocks.length > 0) setIsRefreshing(true);
      
      const symbols = stocksData.map(s => s.symbol).join(",");
      const url = `https://api.twelvedata.com/quote?symbol=${symbols}&apikey=${API_KEY}`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      
      const data = await response.json();
      let formattedStocks = [];
      
      if (Array.isArray(data)) {
        formattedStocks = data.map((stockData) => {
          if (!stockData?.close) return null;
          const stockInfo = stocksData.find(s => s.symbol === stockData.symbol);
          return { 
            symbol: stockData.symbol,
            name: stockInfo?.name || stockData.symbol,
            price: parseFloat(stockData.close),
            change: stockData.change ? parseFloat(stockData.change) : 0,
            changePercent: stockData.percent_change ? parseFloat(stockData.percent_change) : 0
          };
        }).filter(Boolean);
      } else if (data.symbol && data.close) {
        const stockInfo = stocksData.find(s => s.symbol === data.symbol);
        formattedStocks = [{ 
          symbol: data.symbol,
          name: stockInfo?.name || data.symbol,
          price: parseFloat(data.close),
          change: data.change ? parseFloat(data.change) : 0,
          changePercent: data.percent_change ? parseFloat(data.percent_change) : 0
        }];
      } else if (typeof data === 'object' && !data.code) {
        formattedStocks = stocksData.map((stockInfo) => {
          const stockData = data[stockInfo.symbol];
          if (!stockData || !stockData.close) return null;
          return { 
            symbol: stockInfo.symbol,
            name: stockInfo.name,
            price: parseFloat(stockData.close),
            change: stockData.change ? parseFloat(stockData.change) : 0,
            changePercent: stockData.percent_change ? parseFloat(stockData.percent_change) : 0
          };
        }).filter(Boolean);
      } else if (data.code || data.message) {
        throw new Error(data.message || `API error: ${data.code}`);
      }

      if (formattedStocks.length === 0) throw new Error("No valid stock data received");

      setStocks(formattedStocks);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching stocks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>Loading stocks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', background: '#fef2f2', borderBottom: '1px solid #fecaca' }}>
        <span style={{ fontSize: '14px', color: '#dc2626' }}>Error: {error}</span>
        <button onClick={fetchStocks} style={{ marginLeft: '12px', padding: '4px 12px', fontSize: '12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Compact Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#1f2937', borderBottom: '1px solid #374151' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Louisiana Stocks</span>
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>Real-time tracking</span>
        </div>
        <button
          onClick={fetchStocks}
          disabled={isRefreshing}
          style={{ padding: '4px 12px', fontSize: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: isRefreshing ? 0.6 : 1 }}
        >
          {isRefreshing ? '⟳ ...' : '⟳ Refresh'}
        </button>
      </div>

      {/* Stock Ticker Bar - Full Width */}
      <div style={{ display: 'flex', alignItems: 'center', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', height: '40px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', paddingLeft: '8px' }}>
            {stocks.map((stock) => (
              <StockTicker key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
        {lastUpdate && (
          <div style={{ flexShrink: 0, padding: '0 16px', fontSize: '11px', color: '#6b7280', borderLeft: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>
            Updated: {lastUpdate}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockApp;