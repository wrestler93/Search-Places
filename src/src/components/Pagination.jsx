import React, { useState } from "react";
import "./../styles/Pagination.css";

const Pagination = ({ total, limit, currentPage, onPageChange, onLimitChange }) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>

      {/* Limit Input Box */}
      <div className="pagination-limit-input">
      <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="pagination-select"
        >
          {[5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>

      <div className="pagination-info">
        Page {currentPage} of {totalPages} | Total results: {total}
      </div>
    </div>
  );
};

export default Pagination;
