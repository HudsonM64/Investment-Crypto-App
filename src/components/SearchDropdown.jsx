import React from "react";
import '../styles/SearchDropdown.css'
import SearchResult from "./SearchResult";

function SearchDropdown({ results }) {
    console.log("Results:", results)
  return (
    <div className="dropdown-container">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id}/>;
      })}
    </div>
  );
}

export default SearchDropdown;
