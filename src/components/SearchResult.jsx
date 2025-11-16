import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchResult.css";

const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const navigateToDashboard = (data) => {
    navigate(`/dashboard/${result.symbol.toUpperCase()}`, { state: data });
  };

  const evaluateStock = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/analyze/${result.symbol.toUpperCase()}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error || "Stock not available");
        return;
      }

      navigateToDashboard(data);
      console.log(data)
      
    } catch (error) {
      console.log("Error fetching data from backend: ", error);
      alert("Error fetching data");
    }
  };

  return (
    <div className="search-result" onClick={evaluateStock}>
      {result.symbol}
    </div>
  );
};

export default SearchResult;
