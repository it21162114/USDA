import React from 'react';
import './WelcomePage.css'; // Add your CSS styling here
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const WelcomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle navigation (this can later redirect to actual routes)
  const handleNavigation = (route) => {
    navigate(route); // Navigate to the given route
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-title">
          WELCOME TO <span className="highlight">USDA</span> MANAGEMENT PORTAL
        </div>
        <div className="division-selection">
          <div className="division-title">Select Your Division</div>
          <div className="division-buttons">
            <button onClick={() => handleNavigation('/Home')}>Administration Division</button>
            <button onClick={() => handleNavigation('Chairman Office')}>Chairman Office</button>
            <button onClick={() => handleNavigation('Director General\'s Office')}>Director General's Office</button>
            <button onClick={() => handleNavigation('Social Mobilization Division')}>Social Mobilization Division</button>
            <button onClick={() => handleNavigation('Legal Division')}>Legal Division</button>
            <button onClick={() => handleNavigation('Land & Property Management Division')}>Land & Property Management Division</button>
            <button onClick={() => handleNavigation('Engineering Services Division')}>Engineering Services Division</button>
            <button onClick={() => handleNavigation('Planning & Monitoring Division')}>Planning & Monitoring Division</button>
            <button onClick={() => handleNavigation('IT & Media Division')}>IT & Media Division</button>
            <button onClick={() => handleNavigation('Recovery Division')}>Recovery Division</button>
            <button onClick={() => handleNavigation('Procurement & Marketing Division')}>Procurement & Marketing Division</button>
            <button onClick={() => handleNavigation('Finance Division')}>Finance Division</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
