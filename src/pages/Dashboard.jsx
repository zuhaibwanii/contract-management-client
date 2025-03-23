import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import ContractList from '../components/ContractList';
import SearchBar from '../components/SearchBar';
import { getContracts } from '../services/api';
import './Dashboard.css';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    client_name: '',
    contract_id: '',
    page: 1,
    limit: 5
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('contract:created', (newContract) => {
      toast.info(`New contract added: ${newContract.contract_id}`);
      fetchContracts();
    });

    socket.on('contract:updated', (updatedContract) => {
      toast.info(`Contract updated: ${updatedContract.contract_id}`);

      setContracts(prevContracts =>
        prevContracts.map(contract =>
          contract.contract_id === updatedContract.contract_id ? updatedContract : contract
        )
      );
    });

    socket.on('contract:deleted', ({ contract_id }) => {
      toast.info(`Contract deleted`);
      setContracts(prevContracts =>  prevContracts.filter(contract => contract.contract_id !== contract_id) );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchContracts();
  }, [filters]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const response = await getContracts(filters);
      // console.log('response = ', response);
      if (response.status === 200) {
        setContracts(response.data.contracts);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error('Failed to fetch contracts');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Contract Management</h1>
        <Link to="/upload" className="btn-primary">Upload New Contract</Link>
      </div>

      <SearchBar filters={filters} onFilterChange={handleFilterChange} />

      {loading ? (
        <Loader isLoading={loading} message='Loading contracts...' />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <ContractList contracts={contracts} />

          <div className="pagination">
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
              className="btn-secondary"
            >
              Previous
            </button>
            <span>Page {filters.page} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page >= totalPages}
              className="btn-secondary"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;