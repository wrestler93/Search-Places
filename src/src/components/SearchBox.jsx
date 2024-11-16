import React, { useState, useEffect } from "react";
import "./../styles/SearchBox.css";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleShortcut = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      document.getElementById("search-input").focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <input
      id="search-input"
      className="search-box"
      type="text"
      placeholder="Search for places..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBox;
