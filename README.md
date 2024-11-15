# Employee-Tracker

### SQL Challenge: Employee Tracker
Description
This command-line application is designed to manage a company's employee database. Built using Node.js, Inquirer, and PostgreSQL, it allows users to efficiently organize and access data on departments, roles, and employees.

### Table of Contents
Installation
Usage
User Story
Acceptance Criteria
Video Demonstration
License
Installation

### Installation

Clone the repository to your local machine.

Navigate to the project folder.

Install dependencies, including the required version of Inquirer.

Set up your PostgreSQL database with the appropriate tables and data by following the databases schema provided in the db folder.


### Usage
When the application launches, you’ll be presented with options to manage the employee database:
View all departments - Displays department names and IDs.
View all roles - Displays job titles, role IDs, associated departments, and salaries.
View all employees - Shows employee details, including IDs, names, job titles, departments, salaries, and managers.
Add a department - Prompts for department name and adds it to the database.
Add a role - Prompts for the role’s name, salary, and associated department, then adds it to the database.
Add an employee - Prompts for employee’s first name, last name, role, and manager, then adds it to the database.
Update an employee role - Allows updating an employee's role with a new selection.

### User Story
AS a business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

### Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with options to view/add departments, roles, employees, and update an employee role
WHEN I choose to view all departments
THEN I am shown a table with department names and IDs
WHEN I choose to view all roles
THEN I see job titles, role IDs, departments, and salaries
WHEN I choose to view all employees
THEN I see a table of employee details, including names, roles, departments, salaries, and managers
WHEN I choose to add a department, role, or employee
THEN I am prompted to enter relevant information and the database updates accordingly
WHEN I choose to update an employee role
THEN I select an employee and their new role, updating the database
Video Demonstration
Please refer to the walkthrough video demonstrating the application's functionality and meeting the acceptance criteria.

### Walkthrough Video

### Credits
I had assistance with my tutor Joem C.

### License
This project is licensed under the MIT License. See LICENSE for details.