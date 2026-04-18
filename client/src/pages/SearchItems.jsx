import { useState } from "react";

export default function SearchItems() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/search?query=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <h2 className="report-title">Search Items</h2>

        <form className="report-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter item name or description"
            className="input-field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="report-btn">
            Search
          </button>
        </form>

        {results.length > 0 && (
          <div className="search-results" style={{ marginTop: "20px" }}>
            {results.map((item, index) => (
              <div key={index} className="report-container" style={{ padding: "15px", marginBottom: "15px" }}>
                <h4 className="report-title">{item.itemName}</h4>
                <p>{item.description}</p>
                <p><strong>Location:</strong> {item.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}