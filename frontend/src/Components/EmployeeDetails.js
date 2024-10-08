import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../utils';
import { GetEmployeeById } from '../api';

function EmployeeDetails() {
    const { id } = useParams();
    const [empDetails, setEmpDetails] = useState({});
    const navigate = useNavigate();
    console.log(id);

    const fetchEmpById = async ()=>{
        try{
            const {data} = await GetEmployeeById(id);
            console.log(data);
            setEmpDetails(data);
        } catch(err) {
            notify('Failed to fetch Employee, Try again later', 'Error');
        }
    }

    useEffect(()=>{
        fetchEmpById();
    },[id])
        
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Employee Details</h2>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <img
                                src={empDetails.profileImage}
                                alt={empDetails.name}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-9">
                        <h4>{empDetails.name}</h4>
                        <p><strong>Employee Number:</strong> {empDetails.employee_number}</p>
                        <p><strong>ID Number:</strong> {empDetails.id_number}</p>
                        <p><strong>Permanent Address:</strong> {empDetails.address_permanent}</p>
                        <p><strong>Temporary Address:</strong> {empDetails.address_temporary}</p>
                        <p><strong>Birthday:</strong> {empDetails.birthday}</p>
                        <p><strong>Email:</strong> {empDetails.email}</p>
                        <p><strong>Phone Number:</strong> {empDetails.phone_number}</p>
                        <p><strong>Position:</strong> {empDetails.position}</p>
                        <p><strong>Date of Oppointment:</strong> {empDetails.date_of_oppointment}</p>
                        <p><strong>Grade:</strong> {empDetails.grade}</p>
                        <p><strong>Department:</strong> {empDetails.department}</p>
                        <p><strong>Educational Qualification:</strong> {empDetails.educational_qualification}</p>
                        <p><strong>Date of Grant of Pay Increment:</strong> {empDetails.date_of_grant_of_pay_increment}</p>
                        <p><strong>Date of Retirement:</strong> {empDetails.date_of_retirement}</p>
                        <p><strong>Date of Resignation:</strong> {empDetails.date_of_resignation}</p>
                        <p><strong>Awarding of Gratuities:</strong> {empDetails.awarding_of_gratuities}</p>
                        <p><strong>Regarding Promotions:</strong> {empDetails.regarding_promotions}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/employee')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails