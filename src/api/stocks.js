const BASE = "https://finnhub.io/api/v1";
const KEY = import.meta.env.VITE_FINNHUB_KEY;

// Get O/H/L/C + current for a ticker like "AAPL"
export async function fetchQuote(symbol, { signal } = {}) {
  const url = `${BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${KEY}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const q = await res.json();
  return {
    symbol: symbol.toUpperCase(),
    price: q.c,     // current
    open: q.o,      // open
    high: q.h,      // high
    low: q.l,       // low
    prevClose: q.pc,// previous close
    ts: q.t ? new Date(q.t * 1000) : new Date(),
  };
}
