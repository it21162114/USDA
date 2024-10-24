import React from 'react';
import './Home.css'; // Add your CSS styling here
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle navigation (this can later redirect to actual routes)
  const handleNavigation = (route) => {
    navigate(route); // Navigate to the given route
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        
        
        <div className="logo">
          <img src="../img/LogoUSDA.png" alt="USDA Logo" className="logo-img" />
        </div>
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/employees">Employees</a>
          <a href="/community">Community</a>
          <a href="/resources">Resources</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="user-info">
          <img src="../img/ProfilePicture1.jpg" alt="User Profile" className="user-pic" />
          <span className="user-name">Nipuni Sandeepa</span>
          <span className="user-id">EPF_012367</span>
        </div>
      </header>

      {/* Button Section */}
      <div className="button-section">
        <button1 onClick={() => handleNavigation('/employee')}>Employee Management</button1>
        <button2 onClick={() => handleNavigation('Board Decision')}>Board Decision</button2>
        <button3 onClick={() => handleNavigation('Circulars')}>Circulars</button3>
        <button4 onClick={() => handleNavigation('Transport MGT')}>Transport MGT</button4>
        <button5 onClick={() => handleNavigation('Performance MGT')}>Performance MGT</button5>
        <button6 onClick={() => handleNavigation('Inventory')}>Inventory</button6>
      </div>
    </div>
  );
};

export default Home;
