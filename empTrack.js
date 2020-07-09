const mysql = require("mysql");
const inquirer = require("inquirer");
// const createTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Rootbeer1",
    database: "employTrack_db"
});

connection.connect((err) => {
    if (err) throw err;
    beginPrompt();
});
// begin function for asking prompt statemants
let beginPrompt = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "what would you like to do",
            choices: [
                "View all employees",
                "View all departments",
                "View all employees by manager id",
                "Add employee",
                "Remove employee",
                "Update employee role",
                "Update employee manager",
                "View all roles",
                "Add role",
                "Remove role",
                "Exit"
            ]
        }) // begin switch statements for prompted answers
        .then((answer) => {
            switch (answer.action) {
                case "View all employees":
                    viewEmployees();
                    break;

                case "View all departments":
                    viewEmployeesDept();
                    break;

                case "View all employees by manager id":
                    viewEmployeesManager();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Remove employee":
                    removeEmployee();
                    break;

                case "Update employee role":
                    updateRole();
                    break;

                case "Update employee manager":
                    updatedManager();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Remove role":
                    removeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}
// this function allows users to see all employees

let viewEmployees = () => {
    var query = "SELECT * FROM employee";
    connection.query(query, (err, answer) => {
        if (err) throw err;
        console.log("All employees currently employed");
        console.table(answer);
    });
    beginPrompt();
}
// this function allows users to view all dept.
let viewEmployeesDept = () => {
    connection.query("SELECT * FROM department", (err, answer) => {
        if (err) throw err;
        console.log("All departments");
        console.table(answer);
    });
    beginPrompt();
}
// this fucntion allows users to view employees by manager.
let viewEmployeesManager = () => {
    connection.query("SELECT * FROM employee ORDER BY manager_id", (err, answer) => {
        if (err) throw err;
        console.log("all employees by manager id");
        console.table(answer);
    })

    beginPrompt();
}

let addRole = () => {
    inquirer.prompt([{
                name: "roleTitle",
                type: "input",
                message: "Enter name of new role"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "Enter the salary amount"
            },
            {
                name: "roleDeptID",
                type: "list",
                choices: [
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",

                ]
            }
        ])
        .then((answer) => {
            connection.query("INSERT INTO emprole SET ?", {
                    title: answer.roleTitle,
                    salary: answer.roleSalary,
                    department_id: answer.roleDeptID                   
                }),
                (err) => {
                    if (err) throw err;
                }
            console.log("Successfully added role")
        })
}

let addEmployee = () => {
    inquirer
        .prompt([{
                name: "firstName",
                type: "input",
                message: "Type in employees first name."
            },
            {
                name: "lastName",
                type: "input",
                message: "Type in employees last name."
            },
            {
                name: "roleID",
                type: "list",
                choices: [
                    "1",
                    "2",
                    "3",
                    "4"
                ]
            },
            {
                name: "managerID",
                type: "list",
                choices: [
                    "5",
                    "6",
                    "7"
                ]
            }

        ])
        .then((answer) => {
            connection.query("INSERT INTO employee SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                }),
                (err) => {
                    if (err) throw err;
                }
            console.log("Successfully added employee")
        })

}

let removeEmployee = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "remove",
                type: "input",
                message: "Enter employee ID# you wish to remove"
            }])
            .then((answer) => {
                connection.query("DELETE FROM employee where ?", {
                    id: answer.remove

                });
                console.log("Successfully deleted employee")
                beginPrompt();
            });
    });

}

let removeRole = () => {
    connection.query("SELECT title FROM emprole", (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "remove",
                type: "input",
                message: "Enter role ID# you wish to remove"
            }])
            .then((answer) => {
                connection.query("DELETE FROM emprole where ?", {
                    id: answer.remove

                });
                console.log("Successfully deleted role")
                beginPrompt();
            });
    });

}

let viewRoles = () => {
    var query = "SELECT title FROM emprole";
    connection.query(query, (err, answer) => {
        if (err) throw err;
        console.log("All employees currently employed");
        console.table(answer);
    });
    beginPrompt();
}