import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        designation: '',
        ministryDept: '',
        dateOfFirstAppointment: '',
        dateOfCommencingLeave: '',
        dateOfResumingDuties: '',
        reasonsForLeave: '',
        replacementEmployeeName: '',
        replacementEmployeeNumber: '',
        leaveDetails: {
            casual: '',
            rest: '',
            medical: ''
        },
        leaveTakenCurrentYear: {
            casual: '',
            rest: '',
            medical: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("leaveDetails") || name.includes("leaveTakenCurrentYear")) {
            const [category, subField] = name.split('.');
            setFormData({
                ...formData,
                [category]: {
                    ...formData[category],
                    [subField]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/leaves', formData); // Use your backend URL
            alert('Leave submitted successfully!');
        } catch (error) {
            console.error('Error submitting leave:', error);
            alert('Failed to submit leave.');
        }
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
                <label>Designation:</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />
            </div>
            <div>
                <label>Ministry/Dept:</label>
                <input type="text" name="ministryDept" value={formData.ministryDept} onChange={handleChange} required />
            </div>
            <div>
                <label>Date of First Appointment:</label>
                <input type="date" name="dateOfFirstAppointment" value={formData.dateOfFirstAppointment} onChange={handleChange} required />
            </div>
            <div>
                <label>Date of Commencing Leave:</label>
                <input type="date" name="dateOfCommencingLeave" value={formData.dateOfCommencingLeave} onChange={handleChange} required />
            </div>
            <div>
                <label>Date of Resuming Duties:</label>
                <input type="date" name="dateOfResumingDuties" value={formData.dateOfResumingDuties} onChange={handleChange} required />
            </div>
            <div>
                <label>Reasons for Leave:</label>
                <textarea name="reasonsForLeave" value={formData.reasonsForLeave} onChange={handleChange} required />
            </div>
            <div>
                <label>Replacement Employee Name:</label>
                <input type="text" name="replacementEmployeeName" value={formData.replacementEmployeeName} onChange={handleChange} required />
            </div>
            <div>
                <label>Replacement Employee Number:</label>
                <input type="text" name="replacementEmployeeNumber" value={formData.replacementEmployeeNumber} onChange={handleChange} required />
            </div>
            <div>
                <label>Number of Days Leave Applied For:</label>
                <div>
                    <label>Casual:</label>
                    <input type="number" name="leaveDetails.casual" value={formData.leaveDetails.casual} onChange={handleChange} required />
                </div>
                <div>
                    <label>Rest:</label>
                    <input type="number" name="leaveDetails.rest" value={formData.leaveDetails.rest} onChange={handleChange} required />
                </div>
                <div>
                    <label>Medical:</label>
                    <input type="number" name="leaveDetails.medical" value={formData.leaveDetails.medical} onChange={handleChange} required />
                </div>
            </div>
            <div>
                <label>Leave Taken in Current Year:</label>
                <div>
                    <label>Casual:</label>
                    <input type="number" name="leaveTakenCurrentYear.casual" value={formData.leaveTakenCurrentYear.casual} onChange={handleChange} required />
                </div>
                <div>
                    <label>Rest:</label>
                    <input type="number" name="leaveTakenCurrentYear.rest" value={formData.leaveTakenCurrentYear.rest} onChange={handleChange} required />
                </div>
                <div>
                    <label>Medical:</label>
                    <input type="number" name="leaveTakenCurrentYear.medical" value={formData.leaveTakenCurrentYear.medical} onChange={handleChange} required />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LeaveForm;
