import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/SearchBar.css";

function SearchBar({setResults}) {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    const apiKey = import.meta.env.VITE_TWELVE_DATA_API_KEY;

    try {
      const response = await fetch(`https://api.twelvedata.com/symbol_search?symbol=${value}&apikey=${apiKey}`);

      const data = await response.json(); 

      const items = Array.isArray(data.data) ? data.data : [];

      const results = items.filter(stock => stock.symbol && stock.instrument_name).slice(0, 10);

      setResults(results)
      return results


    } catch (error) {
      console.log(`Error fetching api data: ${error}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchData(value);
  }

  return (
    <div className="search-bar-container">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type a stock or ticker symbol..."
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
