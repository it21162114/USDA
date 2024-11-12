import React from 'react';
import './Folderselect.css'; // Add your CSS styling here
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const FolderPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle navigation (this can later redirect to actual routes)
  const handleNavigation = (route) => {
    navigate(route); // Navigate to the given route
  };

  return (
    <div className="welcome-container1">
      <div className="welcome-content">
        <div className="welcome-title">
          WELCOME TO <span className="highlight">USDA</span> Document Drive
        </div>
        <div className="division-selection">
          <div className="division-title">Please Select Your Folder !</div>
          <div className="division-buttons">
            <button0 onClick={() => handleNavigation('/FileManagementApp')}>Roshan</button0>
            <button0 onClick={() => handleNavigation('/AccessDenied')}>Alwis</button0>
            <button0 onClick={() => handleNavigation('/FileManagementApp')}>Oshadhi</button0>
            <button0 onClick={() => handleNavigation('/FileManagementApp')}>Kenee</button0>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderPage;
