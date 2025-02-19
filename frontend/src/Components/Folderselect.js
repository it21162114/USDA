import React from 'react';
import './Folderselect.css'; // Add your CSS styling here
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const FolderPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle navigation (this can later redirect to actual routes)
  const handleNavigation = (route) => {
    navigate(route); // Navigate to the given route
  };

const handleHomeButtonClick = () => {
        navigate('/Home'); // Navigate to the home page
    };  

  return (
    <div className="welcome-container1">
      <div className="welcome-content">
        {/* Home Button */}
                <button
                    className='home-button'
                    onClick={handleHomeButtonClick}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: '#ed7428',
                        border: 'none',
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    🏠 Home
                </button>
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
