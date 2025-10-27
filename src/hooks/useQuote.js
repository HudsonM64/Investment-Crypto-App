import { useEffect, useState } from "react";
import { fetchQuote } from "../api/stocks";

export function useQuote(symbol, intervalMs = 5000) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error

  useEffect(() => {
    if (!symbol) return;
    let timer;
    let cancelled = false;

    const load = async () => {
      try {
        setStatus((s) => (s === "idle" ? "loading" : s));
        const q = await fetchQuote(symbol);
        if (!cancelled) {
          setData(q);
          setStatus("idle");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    load(); // first fetch
    timer = setInterval(load, intervalMs); // poll

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [symbol, intervalMs]);

  return { data, status };
}
