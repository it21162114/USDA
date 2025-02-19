import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleHomeButtonClick = () => {
        navigate('/'); // Navigate to the home page
    };

  return (
    <div className="home-container">
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
                    ⬅️ Back
                </button>
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
        <button className="custom-button" onClick={() => handleNavigation('/performance')}>Feature</button>
        <button className="custom-button" onClick={() => handleNavigation('/inventory')}>Feature</button>
      </div>
    </div>
  );
};

export default Home;
