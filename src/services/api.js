import { axiosInstance } from '../utils/axios';


// Get all contracts with filters
export const getContracts = async (filters = {}) => {
  try {
    const response = await axiosInstance.get('/contracts', { params: filters });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch contracts');
  }
};

// Get a single contract by ID
export const getContract = async (id) => {
  try {
    const response = await axiosInstance.get(`/contracts/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Create a new contract
export const createContract = async (contractData) => {
  try {
    const response = await axiosInstance.post('/contracts', contractData);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Update an existing contract
export const updateContract = async (id, contractData) => {
  try {
    const response = await axiosInstance.put(`/contracts/${id}`, contractData);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Delete a contract
export const deleteContract = async (id) => {
  try {
    const response = await axiosInstance.delete(`/contracts/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};