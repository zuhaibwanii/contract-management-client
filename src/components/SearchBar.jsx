import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    status: filters.status || '',
    client_name: filters.client_name || '',
    contract_id: filters.contract_id || ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };
  
  const handleReset = () => {
    const resetFilters = {
      status: '',
      client_name: '',
      contract_id: ''
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-filters">
          <div className="filter-group">
            <label htmlFor="contract_id">Contract ID:</label>
            <input
              type="text"
              id="contract_id"
              name="contract_id"
              value={localFilters.contract_id}
              onChange={handleInputChange}
              placeholder="Search by ID"
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="client_name">Client Name:</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={localFilters.client_name}
              onChange={handleInputChange}
              placeholder="Search by client"
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={localFilters.status}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="Draft">Draft</option>
              <option value="Finalized">Finalized</option>
            </select>
          </div>
        </div>
        
        <div className="search-actions">
          <button type="submit" className="btn-primary">Search</button>
          <button type="button" onClick={handleReset} className="btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;