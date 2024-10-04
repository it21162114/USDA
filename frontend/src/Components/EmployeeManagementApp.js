import React, { useEffect, useState } from 'react'
import EmployeeTable from './EmployeeTable'
import { GetAllEmployees } from '../api';
import AddEmployee from './AddEmployee';
import { ToastContainer } from 'react-toastify';

function EmployeeManagementApp() {

    const [showModal, setShowModal] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        "employees":[],
        "pagination": {
            "totalEmoloyess": 0,
            "currentPage": 1,
            "totalPages": 3,
            "pageSize": 5
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        try {
            const {data} = await GetAllEmployees(search, page, limit);
            setEmployeeData(data);
        }catch(err) {
            console.log('Error', err)
        }
    }

    useEffect(() =>{
        fetchEmployees();
    }, [])

    const handleAddEmployee = () => {
        setShowModal(true)
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <h1>Employee Management App</h1>
            <div className='w-100 d-flex justify-content-center'>
                <div className='w-80 border bg-light p3' style={{ width: '80%'}}>
                    <div className='d-flex justify-content-between mb-3'>
                        <button className='btn btn-primary' onClick={()=> handleAddEmployee()}>
                            Add
                        </button>
                        <input
                            type='text'
                            placeholder='Search Employee'
                            className='form-control w-50'
                        />
                    </div>
                    <EmployeeTable
                        fetchEmployees={fetchEmployees}
                        employees={employeeData.employees}
                        pagination={employeeData.pagination}
                    />
                    <AddEmployee
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                </div>
            </div>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    )
}

export default EmployeeManagementApp

