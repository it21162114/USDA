const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        const profileImage = req?.file ? req?.file?.path : null;
        console.log(body);
        body.profileImage = profileImage;
        const emp = new EmployeeModel(body);
        await emp.save();
        res.status(201)
            .json({
                message: 'Employee Created',
                success: true
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getAllEmployees = async (req, res) => {
    try {
        let { page, limit, search } = req.query;

         // Set default values if they are not provided
         page = parseInt(page) || 1;
         limit = parseInt(limit) || 5;

         // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Build the search criteria
        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                $or: [
                    { name: { $regex: search, $options: 'i' } }, // Search by name (case-insensitive)
                    { employee_number: isNaN(search) ? null : parseInt(search) } // Search by employee_number if it's a valid number
                ]
            };
        }

       
        
        // Get the total number of employees for pagination info
        const totalEmoloyess = await EmployeeModel.countDocuments(searchCriteria);

        const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        // Calculate total pages
        const totalPages = Math.ceil(totalEmoloyess / limit);    
        res.status(200)
            .json({
                message: 'All Employees',
                success: true,
                data: {
                    employees: emps,
                    pagination: {
                        totalEmoloyess,
                        currentPage: page,
                        totalPages,
                        pageSize: limit
                    }  
                }
            })
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const {id} = req.params;
        const emp = await EmployeeModel.findOne({ _id: id });
        res.status(200)
            .json({
                message: 'Get Employee Details',
                success: true,
                data: emp
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const deleteEmployeeById = async (req, res) => {
    try {
        const {id} = req.params;
        await EmployeeModel.deleteOne({ _id: id });
        res.status(200)
            .json({
                message: 'Employee Deleted',
                success: true
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const updateEmployeeById = async (req, res) => {
    try {
        const {name, address_permanent, address_temporary, birthday, email, phone_number, position, date_of_oppointment, grade, department, educational_qualification, date_of_grant_of_pay_increment, date_of_retirement, date_of_resignation, awarding_of_gratuities, regarding_promotions} = req.body;
        const {id} = req.params;
        
        let updateData = {
            name, address_permanent, address_temporary, birthday, email, phone_number, position, date_of_oppointment, grade, department, educational_qualification, date_of_grant_of_pay_increment, date_of_retirement, date_of_resignation, awarding_of_gratuities, regarding_promotions, updatedAt: new Date() 
        }

        if(req.file){
            updateData.profileImage = req.file.path;
        }
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true}
        )

        if(!updatedEmployee){
            return res.status(404).json({ message: 'Employee Not Found'});
        }

        res.status(201)
            .json({
                message: 'Employee Updated',
                success: true,
                data: updatedEmployee
            })
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const getSelectedEmployeeFields = async (req, res) => {
    try {
        const employees = await EmployeeModel.find({}, 'employee_number name date_of_grant_of_pay_increment');
        res.status(200).json({
            message: 'Selected Employee Fields',
            success: true,
            data: employees
        });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};

const getEmployeesWithUpcomingPayIncrement = async (req, res) => {
    try {
        // Get the current date and calculate the target date (five days prior)
        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 5);

        // Find employees with the matching date
        const employees = await EmployeeModel.find({
            date_of_grant_of_pay_increment: {
                $gte: today.toISOString(),
                $lte: targetDate.toISOString(),
            },
        }, 'employee_number name date_of_grant_of_pay_increment');

        res.status(200).json({
            message: 'Employees with upcoming pay increments',
            success: true,
            data: employees,
        });
    } catch (err) {
        console.error('Error fetching employees with upcoming increments:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err,
        });
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById,
    getSelectedEmployeeFields,
    getEmployeesWithUpcomingPayIncrement   
}