import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccessDenied.css';

const AccessDenied = () => {
    const navigate = useNavigate();
  
    const handleNavigation = (route) => {
      navigate(route);
    };
  
    return (
      <div className="home-container1">
        <div className="button-section">
          <button className="custom-button" onClick={() => handleNavigation('/Folderselect')}>Back</button>
        </div>
      </div>
    );
  };
  
  export default AccessDenied;