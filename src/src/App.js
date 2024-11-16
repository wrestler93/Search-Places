import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import "./App.css";
import Pagination from "./components/Pagination";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = async (searchQuery, limit = 5, page = 1) => {
    setLoading(true);
    const currentLimit = parseInt(limit, 10);
    const currentPage = parseInt(page, 10);
    const offset = (currentPage - 1) * currentLimit;
  
    if (isNaN(currentLimit) || isNaN(currentPage)) {
      console.error("Invalid limit or page number");
      return;
    }
  
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        },
        params: {
          namePrefix: searchQuery,
          limit: currentLimit,
          offset: offset,
        },
      });
  
      const result = response.data;
      setData(result.data || []);
      setTotalResults(result.metadata.totalCount || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Debounce function to minimize API calls on every keystroke
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((searchQuery) => {
      setQuery(searchQuery);
      fetchData(searchQuery, limit, 1);
      setCurrentPage(1);
    }, 500),
    [fetchData, limit]
  );

  // Handle page change from react-paginate
  const handlePageChange = (selectedItem) => {
    const selectedPage = selectedItem;
    setCurrentPage(selectedPage);
    fetchData(query, limit, selectedPage);
  };

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    if (newLimit > 10) {
      alert("Maximum limit is 10 items per page.");
      return;
    }
    setLimit(newLimit);
    fetchData(query, newLimit, 1);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Search Places</h1>
        <SearchBox onSearch={handleSearch} />
      </header>
      <main>
        <Table data={data} loading={loading} query={query}/>
        {(data.length > 0 && query.length !== 0) &&(
              <Pagination
                total={totalResults}
                limit={limit}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              />
            )}
      </main>
    </div>
  );
};

export default App;
