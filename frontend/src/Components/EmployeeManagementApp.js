import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import AddEmployee from './AddEmployee';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import backgroundImage from '../img/p1.jpg';
import './EmployeeManagementApp.css';
import { Spinner, Button } from 'react-bootstrap'; // New imports for better UI

function EmployeeManagementApp() {

    const [showModal, setShowModal] = useState(false);
    const [updateEmpObj, setUpdateEmpObj] = useState(null); // Use null to check for empty state
    const [employeeData, setEmployeeData] = useState({
        employees: [],
        pagination: {
            totalEmployees: 0,
            currentPage: 1,
            totalPages: 1,
            pageSize: 5
        }
    });
    const [loading, setLoading] = useState(false); // New loading state

    const fetchEmployees = async (search = '', page = 1, limit = 20) => {
        setLoading(true); // Show loader while data is being fetched
        try {
            const { data } = await GetAllEmployees(search, page, limit);
            setEmployeeData(data);
        } catch (err) {
            console.log('Error', err);
        } finally {
            setLoading(false); // Hide loader after data fetch
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddEmployee = () => {
        setShowModal(true);
        setUpdateEmpObj(null); // Clear form when adding new employee
    };

    const handleUpdateEmployee = (empObj) => {
        setUpdateEmpObj(empObj);
        setShowModal(true);
    };

    const handleDeleteEmployee = async (emp) => {
        if (window.confirm(`Are you sure you want to delete employee ${emp.name}?`)) {
            try {
                const { success, message } = await DeleteEmployeeById(emp._id);
                if (success) {
                    notify(message, 'Success');
                    fetchEmployees(); // Refresh employee list after deletion
                } else {
                    notify(message, 'Error');
                }
            } catch (err) {
                console.log('Error', err);
                notify(err, 'Error');
            }
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        fetchEmployees(term);
    };

    return (
        <div className='d-flex flex-column min-vh-100'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
                <h1>USDA Employee Management System</h1>

                <div className='w-100 d-flex justify-content-center'>
                    <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>
                        <div className='d-flex justify-content-between mb-3'>
                            <button
                                className='btn btn-primary'
                                onClick={handleAddEmployee}
                            >
                                Add New Employee
                            </button>

                            <input
                                onChange={handleSearch}
                                type='text'
                                placeholder='Search Employee by Name, Email or Department'
                                className='form-control w-50'
                            />
                        </div>

                        {loading ? (
                            <div className='d-flex justify-content-center'>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <>
                                <EmployeeTable
                                    handleUpdateEmployee={handleUpdateEmployee}
                                    handleDeleteEmployee={handleDeleteEmployee}
                                    employees={employeeData.employees}
                                    pagination={employeeData.pagination}
                                    fetchEmployees={fetchEmployees}
                                />
                                <div className='d-flex justify-content-between mt-3'>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => fetchEmployees('', employeeData.pagination.currentPage - 1)}
                                        disabled={employeeData.pagination.currentPage === 1}
                                    >
                                        Previous
                                    </Button>

                                    <span>Page {employeeData.pagination.currentPage} of {employeeData.pagination.totalPages}</span>

                                    <Button
                                        variant="outline-primary"
                                        onClick={() => fetchEmployees('', employeeData.pagination.currentPage + 1)}
                                        disabled={employeeData.pagination.currentPage === employeeData.pagination.totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <AddEmployee
                    updateEmpObj={updateEmpObj}
                    fetchEmployees={fetchEmployees}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />

                <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    );
}

export default EmployeeManagementApp;
