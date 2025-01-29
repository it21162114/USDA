// Import the Leave model
const Leave = require('../Models/LeaveModel');

// Create a new leave entry
const createLeave = async (req, res) => {
    try {
        const leave = new Leave(req.body);
        await leave.save();
        res.status(201).json({ message: 'Leave created successfully', leave });
    } catch (error) {
        res.status(500).json({ message: 'Error creating leave', error });
    }
};

// Get all leaves for an employee
const getEmployeeLeaves = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const leaves = await Leave.find({ employeeId });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving leaves', error });
    }
};

// Get all leave requests (for manager)
const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving leaves', error });
    }
};

// Update leave details (employee only if not approved)
const updateLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        if (leave.status === 'Approved') {
            return res.status(403).json({ message: 'Cannot edit approved leave' });
        }

        Object.assign(leave, req.body);
        await leave.save();
        res.status(200).json({ message: 'Leave updated successfully', leave });
    } catch (error) {
        res.status(500).json({ message: 'Error updating leave', error });
    }
};

// Delete a leave entry (employee only if not approved)
const deleteLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        if (leave.status === 'Approved') {
            return res.status(403).json({ message: 'Cannot delete approved leave' });
        }

        await Leave.findByIdAndDelete(leaveId);
        res.status(200).json({ message: 'Leave deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting leave', error });
    }
};

// Approve or reject a leave (manager only)
const updateLeaveStatus = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { status } = req.body;

        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const leave = await Leave.findById(leaveId);

        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        leave.status = status;
        await leave.save();
        res.status(200).json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
    } catch (error) {
        res.status(500).json({ message: 'Error updating leave status', error });
    }
};

module.exports = {
    createLeave,
    getEmployeeLeaves,
    getAllLeaves,
    updateLeave,
    deleteLeave,
    updateLeaveStatus
}
