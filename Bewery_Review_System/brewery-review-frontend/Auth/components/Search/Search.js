import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {
  const [searchType, setSearchType] = useState('city');
  const [searchValue, setSearchValue] = useState('');
  const [breweries, setBreweries] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/breweries/search?by=${searchType}&value=${searchValue}`);
      setBreweries(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Search Breweries</h2>
      <select onChange={(e) => setSearchType(e.target.value)}>
        <option value="city">City</option>
        <option value="name">Name</option>
        <option value="type">Type</option>
      </select>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
