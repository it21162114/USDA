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
          <img src="/img/LogoUSDA.png" alt="USDA Logo" className="logo-img" />
        </div>
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/employees">Employees</a>
          <a href="/community">Community</a>
          <a href="/resources">Resources</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="user-info">
          <img src="/img/ProfilePicture1.jpg" alt="User Profile" className="user-pic" />
          <span className="user-name">Nipuni Sandeepa</span>
          <span className="user-id">EPF_012367</span>
        </div>
      </header>

      <div className="button-section">
        <button className="custom-button" onClick={() => handleNavigation('/employee')}>Employee Management</button>
        <button className="custom-button" onClick={() => handleNavigation('/FileManagementApp')}>File Management</button>
        <button className="custom-button" onClick={() => handleNavigation('/circulars')}>Circulars</button>
        <button className="custom-button" onClick={() => handleNavigation('/transport')}>Transport MGT</button>
        <button className="custom-button" onClick={() => handleNavigation('/performance')}>Performance MGT</button>
        <button className="custom-button" onClick={() => handleNavigation('/inventory')}>Inventory</button>
      </div>
    </div>
  );
};

export default Home;
