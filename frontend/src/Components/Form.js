import React, { useState } from "react";
import axios from "axios";
import "./Form.css"; // Assuming you're using an external CSS file for styles
import backgroundImage from '../img/letterformbg.jpg';

const Form = () => {
  const [formData, setFormData] = useState({
    fileNo: "",
    date: "",
    employeeName: "",
    employeeNo: "",
    nic: "",
    address: "",
    designation: "",
    natureOfAppointment: "",
    retirementDate: "",
    comments: "",
    tableData: [],
  });

  const [row, setRow] = useState({
    position: "",
    natureOfAppointment: "",
    institute: "",
    servicePeriod: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRowChange = (e) => {
    setRow({ ...row, [e.target.name]: e.target.value });
  };

  const addRow = () => {
    if (
      row.position &&
      row.natureOfAppointment &&
      row.institute &&
      row.servicePeriod
    ) {
      setFormData({
        ...formData,
        tableData: [...formData.tableData, row],
      });
      setRow({ position: "", natureOfAppointment: "", institute: "", servicePeriod: "" });
    } else {
      alert("Please fill out all fields for the row!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/generate-letter", formData, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ServiceConfirmationLetter.pdf";
      a.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="App1" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
    <div className="form-container">
      <h1 className="form-header">Service Confirmation Form</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <h2>Enter Details Here -:</h2>
          <br></br>
          <label className="form-label">File Number</label>
          <input
            name="fileNo"
            placeholder="File No"
            value={formData.fileNo}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Employee Name</label>
          <input
            name="employeeName"
            placeholder="Employee Name"
            value={formData.employeeName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Employee No</label>
          <input
            name="employeeNo"
            placeholder="Employee No"
            value={formData.employeeNo}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">NIC</label>
          <input
            name="nic"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Address</label>
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Designation</label>
          <input
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Nature of Appointment</label>
          <input
            name="natureOfAppointment"
            placeholder="Nature of Appointment"
            value={formData.natureOfAppointment}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Retirement Date</label>
          <input
            name="retirementDate"
            type="date"
            value={formData.retirementDate}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          <label className="form-label">Comments</label>
          <textarea
            name="comments"
            placeholder="Comments"
            value={formData.comments}
            onChange={handleInputChange}
            className="form-textarea"
          ></textarea>
        </div>

        <div className="form-section">
          <h2>Service Table</h2>
          <div className="table-row">
            <input
              name="position"
              placeholder="Position"
              value={row.position}
              onChange={handleRowChange}
              required
              className="form-input"
            />
            <input
              name="natureOfAppointment"
              placeholder="Nature of Appointment"
              value={row.natureOfAppointment}
              onChange={handleRowChange}
              required
              className="form-input"
            />
            <input
              name="institute"
              placeholder="Institute"
              value={row.institute}
              onChange={handleRowChange}
              required
              className="form-input"
            />
            <input
              name="servicePeriod"
              placeholder="Service Period"
              value={row.servicePeriod}
              onChange={handleRowChange}
              required
              className="form-input"
            />
            <button type="button" onClick={addRow} className="btn1 btn-add">
              Add Row
            </button>
          </div>
          <ul className="table-list">
            {formData.tableData.map((row, index) => (
              <li key={index} className="table-list-item">
                {`${row.position}, ${row.natureOfAppointment}, ${row.institute}, ${row.servicePeriod}`}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="btn1 btn-submit1">

          Generate PDF
        </button>
      </form>
    </div>
  </div>
  );
};

export default Form;
