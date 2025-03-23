import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//components
import Loader from '../components/Loader';

//services
import { getContract, updateContract, deleteContract } from '../services/api';

//styles
import './ContractDetails.css';


const ContractDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [formData, setFormData] = useState({
    client_name: '',
    contract_id: '',
    status: 'Draft',
    content: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchContract();
  }, [id]);

  const fetchContract = async () => {
    try {
      setLoading(true);
      const response = await getContract(id);
      console.log('fetchContract response', response);
      if (response.status === 200) {
        let data = response.data;
        setContract(data);
        setFormData({
          client_name: data.client_name,
          contract_id: data.contract_id,
          status: data.status,
          content: data.content
        });
        setLoading(false);
      }

    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error('Failed to fetch contract details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e) => {
    try {
      const contentValue = e.target.value;
      // Try to parse if it's JSON, otherwise store as text
      try {
        const jsonContent = JSON.parse(contentValue);
        setFormData(prev => ({ ...prev, content: jsonContent }));
      } catch {
        // If not valid JSON, store as string
        setFormData(prev => ({ ...prev, content: contentValue }));
      }
    } catch (err) {
      toast.error('Invalid content format');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateContract(id, formData);
      toast.success('Contract updated successfully');
      setIsEditing(false);
      fetchContract(); // Refresh data
    } catch (err) {
      toast.error('Failed to update contract');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await deleteContract(id);
        toast.success('Contract deleted successfully');
        navigate('/');
      } catch (err) {
        toast.error('Failed to delete contract');
      }
    }
  };

  if (loading) return <Loader isLoading={loading} message="Loading contract details..." />;
  // if (loading) return <div className="loading">Loading contract details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!contract) return <div className="error">Contract not found</div>;

  const formatContent = () => {
    if (typeof contract.content === 'object') {
      return JSON.stringify(contract.content, null, 2);
    }
    return contract.content;
  };

  return (
    <div className="contract-details">
      <div className="contract-header">
        <h1>Contract Details</h1>
        <div className="action-buttons">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="btn-primary">Edit</button>
              <button onClick={handleDelete} className="btn-danger">Delete</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
          )}
        </div>
      </div>

      {!isEditing ? (
        <div className="contract-view">
          <div className="contract-field">
            <strong>Contract ID:</strong> {contract.contract_id}
          </div>
          <div className="contract-field">
            <strong>Client Name:</strong> {contract.client_name}
          </div>
          <div className="contract-field">
            <strong>Status:</strong>
            <span className={`status status-${contract.status.toLowerCase()}`}>
              {contract.status}
            </span>
          </div>
          <div className="contract-field">
            <strong>Created:</strong> {new Date(contract.created_at).toLocaleString()}
          </div>
          <div className="contract-field">
            <strong>Last Updated:</strong> {new Date(contract.updated_at).toLocaleString()}
          </div>
          <div className="contract-content">
            <strong>Content:</strong>
            <pre>{formatContent()}</pre>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contract-form">
          <div className="form-group">
            <label htmlFor="client_name">Client Name:</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="contract_id">Contract ID:</label>
            <input
              type="text"
              id="contract_id"
              name="contract_id"
              value={formData.contract_id}
              onChange={handleInputChange}
              required
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Draft">Draft</option>
              <option value="Finalized">Finalized</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={typeof formData.content === 'object' ?
                JSON.stringify(formData.content, null, 2) : formData.content}
              onChange={handleContentChange}
              rows="10"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContractDetails;