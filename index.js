
const inquirer = require('inquirer');
const {Pool} = require('pg');

const client = new Pool({
    database: 'employees_db',
    host: 'localhost',
    user: 'postgres',
    password: '',
})

client.connect(function (error) {
    if (error) {`Error: ${error}`};
    console.log('Connected to the database');
    runAction();
})

const actions = {
        name: "answer",
        message: "Choose an action",
        type: "list",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit"
        ],
        pageSize: 10
    }

async function runAction() {
    const response = await inquirer.prompt(actions);
    console.log(response.answer);

    if (response.answer == 'View all departments') {
        viewDepartments();
    } else if (response.answer == 'View all roles') {
        viewRoles();
    } else if (response.answer == 'View all employees') {
        viewEmployees();
    } else if (response.answer == 'Add a department') {
        addDepartment();
    } else if (response.answer == 'Add a role') {
        addRole();
    } else if (response.answer == 'Add an employee') {
        addEmployee();
    } else if (response.answer == 'Update an employee role') {
        updateEmployeeRole();
    } else {
        endConnection();
    }
}

function viewDepartments () {
    client.query(
        `SELECT * FROM department`
        ).then((response)=>{
            console.table(response.rows)
        }).catch((error)=>{
            console.log('Error retrieving the data', error)
        })
        runAction();
}

function viewRoles () {
    client.query(
        `SELECT role.id, title, salary, name AS department
        FROM role
        LEFT JOIN department ON role.department_id = department.id`
        ).then((response)=>{
            console.table(response.rows)
        }).catch((error)=>{
            console.log('Error retrieving the data', error)
        })
        runAction();
}

function viewEmployees () {
    client.query(
        `SELECT e1.id AS id, e1.first_name AS Firt_name, e1.last_name AS last_name, title, salary AS Salary, name AS Department, e2.first_name || ' ' || e2.last_name AS Manager
        FROM employee e1
        LEFT JOIN employee e2 ON e1.manager_id = e2.id
        LEFT JOIN role ON e1.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id`
        ).then((response)=>{
            console.table(response.rows)
        }).catch((error)=>{
            console.log('Error retrieving the data', error)
        })
        runAction();
}

function addDepartment () {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: 'Please name your department.'
    }]).then(function(response){
        console.log(response.department);
        const departmentName = response.department
        client.query(
           `INSERT INTO department (name) VALUES ($1)`, [departmentName]
        ).then(() => {
            console.log('Congrats! Department added successfully.')
        }).catch((error) => {
            console.log('Error inserting department.', error)
        })
    }).then(()=>{
        runAction();
    })
    
}

function addRole () {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "Enter a title for the role."
    },
    {
        name: "salary",
        type: "input",
        message: "Enter a salary for the role."
    },
    {
        name: "department_id",
        type: "input",
        message: "Enter the id of the department for the role."
    }
    ]).then(function(response){
        const title = response.title;
        const salary = response.salary;
        const depId = response.department_id;

        client.query(
            `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [title,salary,depId]
        ).then(()=>{
            console.log('Role added successfully')
        }).catch((error)=>{
            console.log('Error trying to add the role. Make sure you used a correct department ID', error)
        })
    }).then(()=>{
        runAction();
    })
}

function addEmployee () {
    inquirer.prompt([{
        name: "first_name",
        type: "input",
        message: "Please enter an employee first name."
    },
    {
        name: "last_name",
        type: "input",
        message: "Please enter an employee last name."
    },
    {
        name: "role_id",
        type: "input",
        message: "Please enter the id of the role for the employee."
    },
    {
        name: "manager_id",
        type: "input",
        message: "Please enter the id of the manager for the employee."
    }
    ]).then(function(response){
        const firstName = response.first_name;
        const lastName = response.last_name;
        const roleId = response.role_id;
        const managerId = response.manager_id;

        client.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [firstName,  lastName, roleId, managerId]
        ).then(()=>{
            console.log('Employee added successfully')
        }).catch((error)=>{
            console.log('Error trying to add the employee.', error)
        })
    }).then(()=>{
        runAction();
    })

}

function updateEmployeeRole () {
    inquirer.prompt([{
        name: "employee_id",
        type: "input",
        message: "Please enter the id of the employee that youd would like to update."
    },
    {
        name: "new_role",
        type: "input",
        message: "Please enter the id of the new role you would like to give the employee."
    }
]).then((response)=>{
    const roleId = response.new_role;
    const employeeId = response.employee_id
    client.query(
        `UPDATE employee SET role_id = ($1) WHERE id = ($2)`, [roleId, employeeId]
    ).then(()=>{
        console.log('Successfully updated the employees role')
    }).catch((error)=>{
        console.log('Error updating', error)
    })
}).then(()=>{
    runAction();
})
}

function endConnection () {
    client.end;
}
