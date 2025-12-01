import React, { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
    <TextField
      fullWidth
      value={input}
      onChange={handleChange}
      placeholder="Type a stock or ticker symbol..."
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "primary.main" }} />
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(41, 242, 200, 0.28)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          color: "text.primary",
          transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(41, 242, 200, 0.5)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(41, 242, 200, 0.7)",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(41, 242, 200, 0.28)",
        },
        "& .MuiInputBase-input": {
          color: "text.primary",
          "::placeholder": { color: "#6c7a7a", opacity: 1 },
        },
      }}
    />
  );
}

export default SearchBar;
