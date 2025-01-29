const { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById, getSelectedEmployeeFields, getEmployeesWithUpcomingPayIncrement,  } = require('../Controllers/EmployeeController');
const { createLeave, getEmployeeLeaves, getAllLeaves, updateLeave, deleteLeave, updateLeaveStatus } = require('../Controllers/LeaveController');

const { cloudinaryFileUploader } = require('../Middlewares/FileUplaoder');

const routes = require('express').Router();

// More specific routes should come first
routes.get('/ui-data', getSelectedEmployeeFields);

routes.get('/upcoming-increments', getEmployeesWithUpcomingPayIncrement);

routes.get('/',getAllEmployees);

routes.post('/', cloudinaryFileUploader.single('profileImage'), createEmployee);

routes.put('/:id', cloudinaryFileUploader.single('profileImage'), updateEmployeeById);

routes.get('/:id',getEmployeeById);

routes.delete('/:id',deleteEmployeeById);

// Employee routes
routes.post('/', createLeave); // Create a new leave
routes.get('/employee/:employeeId', getEmployeeLeaves); // Get leaves for a specific employee
routes.put('/:id', updateLeave); // Update a leave
routes.delete('/:id', deleteLeave); // Delete a leave

// Manager routes
routes.get('/', getAllLeaves); // Get all leave requests
routes.put('/status/:id', updateLeaveStatus); // Update leave status (Approve/Reject)

module.exports = routes;