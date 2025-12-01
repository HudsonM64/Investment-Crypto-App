import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/SearchBar.css";

function SearchBar({setResults}) {
  const [input, setInput] = useState("");
  const debounceRef = useRef(null);
  const controllerRef = useRef(null);
  const lastQueryRef = useRef("");

  const fetchData = async (value) => {
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setResults([]);
      return;
    }

    if (lastQueryRef.current === trimmed) return;
    lastQueryRef.current = trimmed;

    const apiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;
    const url = `https://api.twelvedata.com/symbol_search?symbol=${trimmed}&apikey=${apiKey}`;

    try {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      console.log("[twelvedata][symbol_search] firing request", { symbol: trimmed, url });
      const response = await fetch(url, { signal: controllerRef.current.signal });

      const data = await response.json(); 

      const items = Array.isArray(data.data) ? data.data : [];

      const results = items.filter(stock => stock.symbol && stock.instrument_name).slice(0, 10);

      console.log("[twelvedata][symbol_search] success", { symbol: trimmed, results: results.length });
      setResults(results)
      return results


    } catch (error) {
      if (error.name === "AbortError") {
        console.log("[twelvedata][symbol_search] aborted previous request");
        return;
      }
      console.log(`Error fetching api data: ${error}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchData(value);
    }, 450);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  return (
    <div className="search-bar-container">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type a stock or ticket symbol..."
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
