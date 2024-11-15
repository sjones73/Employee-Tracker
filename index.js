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
                    // "View All Roles",
                    // "View All Employees",
                    "Add a Department",
                    // "Add a Role",
                    // "Add an Employee",
                    // "Update Employee Role",
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
                    })
    
    
    
                })
        
            }
    
            if(answers.selectedAction == "Exit") {
                process.exit(1)
            }
    

        })
    }


    mainMenu();
    
}


startApp();