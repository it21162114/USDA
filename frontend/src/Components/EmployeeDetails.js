import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../utils';
import { GetEmployeeById } from '../api';
import { FaPhoneAlt, FaEnvelope, FaHome, FaUser, FaBirthdayCake } from 'react-icons/fa';
import './EmployeeDetails.css'; // Import the CSS file

function EmployeeDetails() {
    const { id } = useParams();
    const [empDetails, setEmpDetails] = useState({});
    const navigate = useNavigate();

    const fetchEmpById = useCallback(async () => {
        try {
            const { data } = await GetEmployeeById(id);
            setEmpDetails(data);
        } catch (err) {
            notify('Failed to fetch Employee, Try again later', 'Error');
        }
    }, [id]);

    useEffect(() => {
        fetchEmpById();
    }, [fetchEmpById]);

    return (
        <div className="employee-details-container">
            <div className="employee-details-card">
                <div className="employee-details-header">
                    <h2>Employee Details</h2>
                </div>
                <div className="employee-details-body">
                    <div className="employee-profile-section">
                        <div className="employee-profile-image">
                            <img
                                src={empDetails.profileImage || 'https://via.placeholder.com/150'}
                                alt={empDetails.name}
                                className="profile-image"
                            />
                            <h3>{empDetails.name}</h3>
                        </div>
                        <div className="employee-details-info">
                            <div className="info-section">
                                <h4><FaUser className="icon" /> Personal Information</h4>
                                <p><strong>Employee Number:</strong> {empDetails.employee_number}</p>
                                <p><strong>ID Number:</strong> {empDetails.id_number}</p>
                                <p><FaBirthdayCake className="icon" /><strong>Birthday:</strong> {new Date(empDetails.birthday).toLocaleDateString()}</p>
                            </div>
                            <div className="info-section">
                                <h4><FaHome className="icon" /> Address</h4>
                                <p><strong>Permanent Address:</strong> {empDetails.address_permanent}</p>
                                <p><strong>Temporary Address:</strong> {empDetails.address_temporary}</p>
                            </div>
                            <div className="info-section">
                                <h4><FaEnvelope className="icon" /> Contact Information</h4>
                                <p><strong>Email:</strong> {empDetails.email}</p>
                                <p><FaPhoneAlt className="icon" /><strong>Phone Number:</strong> {empDetails.phone_number}</p>
                            </div>
                            <div className="info-section">
                                <h4>Professional Information</h4>
                                <p><strong>Position:</strong> {empDetails.position}</p>
                                <p><strong>Department:</strong> {empDetails.department}</p>
                                <p><strong>Grade:</strong> {empDetails.grade}</p>
                                <p><strong>Educational Qualification:</strong> {empDetails.educational_qualification}</p>
                            </div>
                            <div className="info-section">
                                <h4>Dates</h4>
                                <p><strong>Date of Appointment:</strong> {new Date(empDetails.date_of_oppointment).toLocaleDateString()}</p>
                                <p><strong>Date of Pay Increment:</strong> {new Date(empDetails.date_of_grant_of_pay_increment).toLocaleDateString()}</p>
                                <p><strong>Date of Retirement:</strong> {new Date(empDetails.date_of_retirement).toLocaleDateString()}</p>
                                <p><strong>Date of Resignation:</strong> {new Date(empDetails.date_of_resignation).toLocaleDateString()}</p>
                            </div>
                            <div className="info-section">
                                <h4>Additional Information</h4>
                                <p><strong>Awarding of Gratuities:</strong> {empDetails.awarding_of_gratuities}</p>
                                <p><strong>Regarding Promotions:</strong> {empDetails.regarding_promotions}</p>
                            </div>
                        </div>
                    </div>
                    <div className="employee-details-footer">
                        <button
                            className="back-button"
                            onClick={() => navigate('/employee')}
                        >
                            Back to Employee List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;