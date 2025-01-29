// Import mongoose
const mongoose = require('mongoose');

// Define the Leave Schema
const LeaveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    ministryDept: {
        type: String,
        required: true
    },
    dateOfFirstAppointment: {
        type: Date,
        required: true
    },
    dateOfCommencingLeave: {
        type: Date,
        required: true
    },
    dateOfResumingDuties: {
        type: Date,
        required: true
    },
    reasonsForLeave: {
        type: String,
        required: true
    },
    replacementEmployee: {
        name: {
            type: String,
            required: true
        },
        employeeNumber: {
            type: String,
            required: true
        }
    },
    leaveDetails: {
        numberOfDaysApplied: {
            casual: {
                type: Number,
                required: true
            },
            rest: {
                type: Number,
                required: true
            },
            medical: {
                type: Number,
                required: true
            }
        },
        leaveTakenCurrentYear: {
            casual: {
                type: Number,
                required: true
            },
            rest: {
                type: Number,
                required: true
            },
            medical: {
                type: Number,
                required: true
            }
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
}, {
    timestamps: true
});

// Export the Leave model
const Leave = mongoose.model('Leave', LeaveSchema);
module.exports = Leave;
