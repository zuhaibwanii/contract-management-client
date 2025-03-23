import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Contract Management System</Link>
      </div>
      <ul className="navbar-menu">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Dashboard</Link>
        </li>
        <li className={location.pathname === '/upload' ? 'active' : ''}>
          <Link to="/upload">Upload Contract</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;