import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          
        </div>
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/employees">Employees</a>
          <a href="/community">Community</a>
          <a href="/resources">Resources</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="user-info">
          
          
        </div>
      </header>

      <div className="button-section">
        <button className="custom-button" onClick={() => handleNavigation('/employee')}>Employee Management</button>
        <button className="custom-button" onClick={() => handleNavigation('/Folderselect')}>File Management</button>
        <button className="custom-button" onClick={() => handleNavigation('/Form')}>Service Letters</button>
        <button className="custom-button" onClick={() => handleNavigation('/EmpIncrement')}>Increment</button>
        <button className="custom-button" onClick={() => handleNavigation('/performance')}>Performance MGT</button>
        <button className="custom-button" onClick={() => handleNavigation('/inventory')}>Inventory</button>
      </div>
    </div>
  );
};

export default Home;
