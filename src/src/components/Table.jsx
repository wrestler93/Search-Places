import React from "react";
import "./../styles/Table.css";

const Table = ({ data, loading, query }) => {
  if (loading) return <div className="spinner">Loading...</div>;
  if (!query.length) return <div className="no-results">Start Searching...</div>;
  if (!data.length) return <div className="no-results">No results found</div>;

  return (
    <table className="places-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>
              <img
                src={`https://flagsapi.com/${item.countryCode}/flat/24.png`}
                alt={`${item.country} flag`}
              />{" "}
              {item.country}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
