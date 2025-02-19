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
        type: String  
    },
    address_temporary: {
        type: String
    },
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String   
    },
    phone_number: {
        type: Number
    },
    position: {
        type: String
    },
    date_of_oppointment: {
        type: Date
    },
    grade: {
        type: String
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