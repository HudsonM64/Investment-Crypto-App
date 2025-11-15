import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchResult.css";

const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const evaluateStock = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/analyze/${result.symbol.toUpperCase()}`
      );
      const data = await response.json();

      if (!data.error) {
        navigate(`/dashboard/${data}`);
      } else {
        alert("Stock not available");
      }
    } catch (error) {
      console.log("Error fetching data from backend: ", error);
    }
  };

  const navigateToDashboard = () => {
    navigate(`/dashboard/${result.symbol.toUpperCase()}`);
  };

  return (
    <div className="search-result" onClick={evaluateStock}>
      {result.symbol}
    </div>
  );
};

export default SearchResult;
