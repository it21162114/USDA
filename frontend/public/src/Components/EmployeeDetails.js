import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notify } from '../utils';
import { GetEmployeeById } from '../api';
import backgroundImage from '../img/p3.jpeg';
import { FaPhoneAlt, FaEnvelope, FaHome, FaUser, FaBirthdayCake } from 'react-icons/fa';

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
        <div
            className='d-flex flex-column min-vh-100'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingBottom: '50px',
            }}
        >
            <div className="container mt-5">
                <div className="card shadow-lg" style={{ borderRadius: '15px', borderColor: '#2f3336cc', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div
                        className="card-header text-white text-center"
                        style={{
                            background: 'linear-gradient(45deg, #242526, #b3560b)',
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                            padding: '15px 0',
                        }}
                    >
                        <h2 className="mb-0">Employee Details</h2>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-3 text-center">
                                <img
                                    src={empDetails.profileImage || 'https://via.placeholder.com/150'}
                                    alt={empDetails.name}
                                    className="img-fluid rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', border: '5px solid #3b82f6' }}
                                />
                                <h4 className="mt-3">{empDetails.name}</h4>
                            </div>
                            <div className="col-md-9">
                                <h4 className="text-primary mb-3">
                                    <FaUser className="me-2" />
                                    {empDetails.name}
                                </h4>
                                <p><strong>Employee Number:</strong> {empDetails.employee_number}</p>
                                <p><strong>ID Number:</strong> {empDetails.id_number}</p>
                                <p><FaHome className="me-2 text-secondary" /><strong>Permanent Address:</strong> {empDetails.address_permanent}</p>
                                <p><FaHome className="me-2 text-secondary" /><strong>Temporary Address:</strong> {empDetails.address_temporary}</p>
                                <p><FaBirthdayCake className="me-2 text-warning" /><strong>Birthday:</strong> {new Date(empDetails.birthday).toLocaleDateString()}</p>
                                <p><FaEnvelope className="me-2 text-danger" /><strong>Email:</strong> {empDetails.email}</p>
                                <p><FaPhoneAlt className="me-2 text-success" /><strong>Phone Number:</strong> {empDetails.phone_number}</p>
                                <p><strong>Position:</strong> {empDetails.position}</p>
                                <p><strong>Date of Appointment:</strong> {new Date(empDetails.date_of_oppointment).toLocaleDateString()}</p>
                                <p><strong>Grade:</strong> {empDetails.grade}</p>
                                <p><strong>Department:</strong> {empDetails.department}</p>
                                <p><strong>Educational Qualification:</strong> {empDetails.educational_qualification}</p>
                                <p><strong>Date of Pay Increment:</strong> {new Date(empDetails.date_of_grant_of_pay_increment).toLocaleDateString()}</p>
                                <p><strong>Date of Retirement:</strong> {new Date(empDetails.date_of_retirement).toLocaleDateString()}</p>
                                <p><strong>Date of Resignation:</strong> {new Date(empDetails.date_of_resignation).toLocaleDateString()}</p>
                                <p><strong>Awarding of Gratuities:</strong> {empDetails.awarding_of_gratuities}</p>
                                <p><strong>Regarding Promotions:</strong> {empDetails.regarding_promotions}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-outline-primary btn-lg px-4"
                                onClick={() => navigate('/employee')}
                                style={{ borderRadius: '10px', transition: '0.3s', background: 'linear-gradient(45deg, #d9670b, #e09b07)' }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;
