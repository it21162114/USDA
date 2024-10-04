const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    
    employee_number: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    id_number: {
        type: String,
        required: true,
        unique: true
    },
    address_permanent: {
        type: String,
        required: true
    },
    address_temporary: {
        type: String
    },
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    date_of_oppointment: {
        type: Date,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    educational_qualification: {
        type: String
    },
    date_of_grant_of_pay_increment: {
        type: Date
    },
    date_of_retirement: {
        type: Date
    },
    date_of_resignation: {
        type: Date
    },
    awarding_of_gratuities: {
        type: String
    },
    regarding_promotions: {
        type: String
    }
});

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;