const inquirer = require("inquirer");
const { Pool } = require("pg");
require("dotenv").config()

async function startApp() {
    const pool = new Pool({
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "employeetrackerdb",
        port: 5432
    })
    
    const db = await pool.connect()
    
    


    function mainMenu() {
        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "selectedAction",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update Employee Role",
                    "Exit"
                ]
            }
        ])
        .then(answers => {
        
            if(answers.selectedAction == "View All Departments") {
                // SEND A QUERY TO DATABASE ASKING FOR ALL DEPARTMENTS
                db.query("SELECT * FROM department;", function(err, data) {
                    if(err) {
                        console.log(err);
                        process.exit(1)
                    } else {
                        console.table(data.rows)
                        mainMenu();
                    }
                })
        
            }
    
            if (answers.selectedAction === "View All Roles") {
                db.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;", function(err, data) {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    } else {
                        console.table(data.rows);
                        mainMenu();
                    }
                });
            }

            if (answers.selectedAction === "View All Employees") {
                db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;", function(err, data) {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    } else {
                        console.table(data.rows);
                        mainMenu();
                    }
                });
            }

    
    
            if(answers.selectedAction == "Add a Department") {
               
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the name of the new department?",
                        name: "deptName"
                    }
                ])
                .then(answers => {
                    // SEND A QUERY TO INSERT INTO the department table this new department that the user want to create
    
                    db.query("INSERT INTO department(name) VALUES ($1)", [answers.deptName], function(err, data) {
                        if(err) {
                            console.log(err);
                            process.exit(1)
                        } else {
                            console.log("New department has been added!");
                            mainMenu();
                        }
                    });
    
    
    
                });
        
            }
    
            if (answers.selectedAction === "Add a Role") {
                db.query("SELECT * FROM department;", function(err, data) {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    } else {
                        const departments = data.rows.map(department => ({
                            name: department.name,
                            value: department.id
                        }));

                        inquirer.prompt([
                            {
                                type: "input",
                                message: "What is the name of the new role?",
                                name: "roleTitle"
                            },
                            {
                                type: "input",
                                message: "What is the salary for this role?",
                                name: "roleSalary"
                            },
                            {
                                type: "list",
                                message: "Which department does this role belong to?",
                                name: "departmentId",
                                choices: departments
                            }
                        ])
                        .then(answers => {
                            db.query("INSERT INTO role(title, salary, department_id) VALUES ($1, $2, $3)", [answers.roleTitle, answers.roleSalary, answers.departmentId], function(err, data) {
                                if (err) {
                                    console.log(err);
                                    process.exit(1);
                                } else {
                                    console.log("New role has been added!");
                                    mainMenu();
                                }
                            });
                        });
                    }
                });
            }

            if (answers.selectedAction === "Add an Employee") {
                db.query("SELECT * FROM role;", function(err, data) {
                    if (err) {
                        console.log(err);
                        process.exit(1);
                    } else {
                        const roles = data.rows.map(role => ({
                            name: role.title,
                            value: role.id
                        }));
            
                        inquirer.prompt([
                            {
                                type: "input",
                                message: "What is the employee's first name?",
                                name: "firstName"
                            },
                            {
                                type: "input",
                                message: "What is the employee's last name?",
                                name: "lastName"
                            },
                            {
                                type: "list",
                                message: "What is the employee's role?",
                                name: "roleId",
                                choices: roles
                            },
                            {
                                type: "list",
                                message: "Who is the employee's manager?",
                                name: "managerId",
                                choices: [
                                    { name: "None", value: null }, // Option for no manager
                                    ...data.rows.map(employee => ({
                                        name: `${employee.first_name} ${employee.last_name}`,
                                        value: employee.id
                                    }))
                                ]
                            }
                        ])
                        .then(answers => {
                            db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", 
                            [answers.firstName, answers.lastName, answers.roleId, answers.managerId], function(err, data) {
                                if (err) {
                                    console.log(err);
                                    process.exit(1);
                                } else {
                                    console.log("New employee has been added!");
                                    mainMenu();
                                }
                            });
                        });
                    }
                });
            }
                           
            if(answers.selectedAction == "Exit") {
                process.exit(1)
            }
    

        })
    }


    mainMenu();
    
}


startApp();