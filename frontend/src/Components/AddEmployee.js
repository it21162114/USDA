import React, { useEffect, useState } from 'react'
import { CreateEmployees, UpdateEmployeeById } from '../api';
import { notify } from '../utils';

function AddEmployee({showModal, setShowModal, fetchEmployees, updateEmpObj}) {
    const [employee, setEmployee] = useState({
        employee_number:'',
        name:'',
        profileImage: null, 
        id_number:'',
        address_permanent:'',
        address_temporary:'',
        birthday:'',
        email:'',
        phone_number:'',
        position:'',
        date_of_oppointment:'',
        grade:'',
        department:'',
        educational_qualification:'',
        date_of_grant_of_pay_increment:'',
        date_of_retirement:'',
        date_of_resignation:'',
        awarding_of_gratuities:'',
        regarding_promotions:''
    })

    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if(updateEmpObj){
            setUpdateMode(true);
            setEmployee(updateEmpObj)
        }
    }, [updateEmpObj])

    const resetEmoployeeStates = () => {
        setEmployee({
            employee_number:'',
            name:'',
            profileImage: null, 
            id_number:'',
            address_permanent:'',
            address_temporary:'',
            birthday:'',
            email:'',
            phone_number:'',
            position:'',
            date_of_oppointment:'',
            grade:'',
            department:'',
            educational_qualification:'',
            date_of_grant_of_pay_increment:'',
            date_of_retirement:'',
            date_of_resignation:'',
            awarding_of_gratuities:'',
            regarding_promotions:''
        })
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const handleChange = (e) => {
        const { name, value} = e.target;
        setEmployee({ ...employee, [name]: value});
    }

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    }

    //Add or Update Employee
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(employee);
        try{
            const {success, message} = 
            updateMode ? 
                await UpdateEmployeeById(employee, employee._id) :
                await CreateEmployees(employee);
            console.log(success, message);
            if(success){
                notify(message, 'Success');
            }else{
                notify(message, 'Error');
            }
            setShowModal(false);
            resetEmoployeeStates();
            fetchEmployees();
        } catch(err) {
            notify('Failed to create Employee, Try again later', 'Error');
        }
    }

    return (
        <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex={-1} role='dialog' style={{ display: showModal ? 'block' : 'none' }}>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5>
                            {updateMode ? 'Update Employee' : 'Add Employee'}
                        </h5>
                        <button type='button' className='btn-close' onClick={() => handleClose()}></button>
                    </div>

                    <div className='modal-body'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='mb-3'>
                                <label className='form-label'>Employee Number</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    name="employee_number"
                                    value={employee.employee_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Profile Image</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    name="profileImage"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>ID Number</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="id_number"
                                    value={employee.id_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Permanent Address</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="address_permanent"
                                    value={employee.address_permanent}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Temporary Address</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="address_temporary"
                                    value={employee.address_temporary}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Birthday</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    name="birthday"
                                    value={employee.birthday}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input
                                    type='email'
                                    className='form-control'
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Phone Number</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    name="phone_number"
                                    value={employee.phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Position</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="position"
                                    value={employee.position}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Date of Oppointment</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    name="date_of_oppointment"
                                    value={employee.date_of_oppointment}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Grade</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="grade"
                                    value={employee.grade}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Department</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Educational Qualification</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="educational_qualification"
                                    value={employee.educational_qualification}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Date of Grant of Pay Increment</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    name="date_of_grant_of_pay_increment"
                                    value={employee.date_of_grant_of_pay_increment}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Date of Retirement</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    name="date_of_retirement"
                                    value={employee.date_of_retirement}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Date of Resignation</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    name="date_of_resignation"
                                    value={employee.date_of_resignation}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Awarding of Gratuities</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="awarding_of_gratuities"
                                    value={employee.awarding_of_gratuities}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Regarding Promotions</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name="regarding_promotions"
                                    value={employee.regarding_promotions}
                                    onChange={handleChange}
                                    required
                                />
                            </div>  

                            <button className='btn btn-primary' type='submit'>
                                {
                                    updateMode ? 'Update' : 'Save'
                                }    
                            </button>         
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default AddEmployee