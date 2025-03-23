import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createContract } from '../services/api';
import './UploadContract.css';

const UploadContract = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client_name: '',
    // contract_id: '',
    status: 'Draft',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (e) => {
    setFormData(prev => ({ ...prev, content: e.target.value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        setFileContent(content);

        // Try to parse if it's JSON
        try {
          JSON.parse(content);
          // If valid JSON, set content as is
          setFormData(prev => ({ ...prev, content }));
        } catch {
          // If not valid JSON, set as string
          setFormData(prev => ({ ...prev, content }));
        }
      } catch (err) {
        toast.error('Error reading file');
      }
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Process the content field
      let processedContent;

      // If it's a string that could be JSON, try to parse it
      if (typeof formData.content === 'string') {
        try {
          processedContent = JSON.parse(formData.content);
        } catch {
          processedContent = formData.content;
        }
      } else {
        processedContent = formData.content;
      }

      const data = {
        ...formData,
        content: processedContent
      };

      toast.loading('Uploading contract...');
      let response = await createContract(data);
      toast.dismiss();
      // console.log('createContract response = ', response);

      if (response.status === 201) {
        toast.success('Contract uploaded successfully');
        navigate('/');
      }

    } catch (err) {
      toast.error('Failed to upload contract');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="upload-contract">
      <h1>Upload New Contract</h1>

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
            type="number"
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
          <label htmlFor="file">Upload Contract File (Optional):</label>
          <input
            type="file"
            id="file"
            accept=".json,.txt"
            onChange={handleFileUpload}
          />
          <small>Upload a JSON or text file containing contract data</small>
        </div>

        <div className="form-group">
          <label htmlFor="content">Contract Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleContentChange}
            rows="10"
            placeholder="Enter contract content or upload a file"
            required
          />
          <small>Enter JSON or plain text</small>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Contract'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadContract;