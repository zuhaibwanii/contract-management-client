import React from 'react';
import { Link } from 'react-router-dom';
import './ContractList.css';

const ContractList = ({ contracts = [] }) => {
  if (contracts.length === 0) {
    return <div className="no-contracts">No contracts found</div>;
  }

  return (
    <div className="contract-list">
      <table>
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Client Name</th>
            <th>Status</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(contract => (
            <tr key={contract.id}>
              <td>{contract.contract_id}</td>
              <td>{contract.client_name}</td>
              <td>
                <span className={`status status-${contract.status.toLowerCase()}`}>
                  {contract.status}
                </span>
              </td>
              <td>{new Date(contract.created_at).toLocaleDateString()}</td>
              <td>{new Date(contract.updated_at).toLocaleDateString()}</td>
              <td>
                <Link to={`/contracts/${contract.contract_id}`} className="btn-view">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractList;