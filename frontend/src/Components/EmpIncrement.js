import React, { useEffect, useState } from 'react';
import './EmpIncrement.css'; // Import the updated CSS file
import backgroundImage from '../img/IncrementBG.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const EmployeeTable = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [employees, setEmployees] = useState([]);
    const [upcomingEmployees, setUpcomingEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUpcoming, setLoadingUpcoming] = useState(true);
    const [selectedRows, setSelectedRows] = useState({}); // Track selected rows

    // Fetch all employees for the table
    useEffect(() => {
        fetch('http://localhost:8080/api/employees/ui-data')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setEmployees(data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                setLoading(false);
            });
    }, []);

    // Fetch employees with upcoming pay increments
    useEffect(() => {
        fetch('http://localhost:8080/api/employees/upcoming-increments')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setUpcomingEmployees(data.data);
                }
                setLoadingUpcoming(false);
            })
            .catch(error => {
                console.error('Error fetching upcoming increments:', error);
                setLoadingUpcoming(false);
            });
    }, []);

    const handleCheckboxChange = (employeeNumber) => {
        setSelectedRows((prevSelectedRows) => ({
            ...prevSelectedRows,
            [employeeNumber]: !prevSelectedRows[employeeNumber],
        }));
    };

    const handleHomeButtonClick = () => {
        navigate('/Home'); // Navigate to the home page
    };

    if (loading || loadingUpcoming) return <div className="loading">Loading...</div>;

    return (
        <div className='d-flex flex-column min-vh-100'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            {/* Home Button */}
                <button
                    className='home-button09'
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
            <div className="container">
                <h1 className="title">Employee Increments Management System</h1>
                <div className="tables-container">
                    <div className="table-section">
                        <h2 className="section-title">Employee List</h2>
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Employee Number</th>
                                    <th>Name</th>
                                    <th>Date of Pay Increment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.employee_number}>
                                        <td>{employee.employee_number}</td>
                                        <td>{employee.name}</td>
                                        <td>{new Date(employee.date_of_grant_of_pay_increment).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="table-section">
                        <h2 className="section-title">Upcoming Pay Increments (Next 30 Days)</h2>
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>Employee Number</th>
                                    <th>Name</th>
                                    <th>Date of Pay Increment</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {upcomingEmployees.length > 0 ? (
                                    upcomingEmployees.map((employee) => (
                                        <tr key={employee.employee_number}
                                            style={{
                                                backgroundColor: selectedRows[employee.employee_number] ? 'green' : 'red',
                                                color: 'white'
                                            }}>
                                            <td>{employee.employee_number}</td>
                                            <td>{employee.name}</td>
                                            <td>{new Date(employee.date_of_grant_of_pay_increment).toLocaleDateString()}</td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedRows[employee.employee_number]}
                                                    onChange={() => handleCheckboxChange(employee.employee_number)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No employees have pay increments in the next 30 days.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTable;