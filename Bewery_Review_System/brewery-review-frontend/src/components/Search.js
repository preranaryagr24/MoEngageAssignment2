import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';  

function Search() {
  const [query, setQuery] = useState('');
  const [breweries, setBreweries] = useState([]);

  const search = async () => {
    try {
      const response = await axios.get(`/api/breweries/search?query=${query}`);
      setBreweries(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Search Breweries</h2>
      <input
        type="text"
        id="searchInput"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={search}>Search</button>
      <div id="searchResults">
        {breweries.map(brewery => (
          <div key={brewery.id} className="brewery">
            <h3>{brewery.name}</h3>
            <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
            <p>Phone: {brewery.phone}</p>
            <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <button onClick={() => window.location.href = `/brewery/${brewery.id}`}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
