import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import ContractDetails from './pages/ContractDetails';
import UploadContract from './pages/UploadContract';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contracts/:id" element={<ContractDetails />} />
            <Route path="/upload" element={<UploadContract />} />
          </Routes>
        </main>
        <ToastContainer position='top-center'/>
      </div>
    </Router>
  );
}

export default App;