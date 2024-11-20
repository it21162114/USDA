import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccessDenied.css';

const AccessDenied = () => {

    const navigate = useNavigate();
  
    const handleNavigation = (route) => {
      navigate(route);
    };
  
    return (
      <div className="access-denied-container">
          <div className="lock-icon">
              <img
                  src="https://img.icons8.com/ios/100/000000/lock--v1.png" // Placeholder lock icon
                  alt="Lock Icon"
              />
          </div>
          <h1>Access denied</h1>
          <p>
              You don't have permissions to access this page. <br />
              Contact an administrator to get permissions or go to the home page and browse other pages.
          </p>
          <button
              className="go-home-button"
              onClick={() => handleNavigation('/Folderselect')} // Redirect to back
          >
              Go to back
          </button>
      </div>
  );
};
  
export default AccessDenied;