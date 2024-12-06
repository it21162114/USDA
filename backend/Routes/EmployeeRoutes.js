const { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById, getSelectedEmployeeFields, getEmployeesWithUpcomingPayIncrement,  } = require('../Controllers/EmployeeController');

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

module.exports = routes;