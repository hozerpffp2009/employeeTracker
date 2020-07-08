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

connection.connect(function (err) {
    if (err) throw err;
    beginPrompt();
});
// begin function for asking prompt statemants
function beginPrompt() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "what would you like to do",
            choices: [
                "View all employees",
                "View all departments",
                "View all employees by manager",
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

                case "View all employees by manager":
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
    connection.query(query, (err,answer) => {
    if (err) throw err;
    console.log("All employees currently employed");
    console.table(answer);    
    });
    beginPrompt();
} 
// this function allows users to view all dept.
function viewEmployeesDept() {
    connection.query("SELECT * FROM department", (err, answer) => {
        if (err) throw err;
        console.log("All departments")
        console.table(answer)
    }); beginPrompt();
}
// this fucntion allows users to view employees by manager.
function viewEmployeesManager() {
    inquirer.prompt({
        name:"manager",
        type: "list",
        message: "view employees by manager",
        choices: [
            "Shaun Neidig",
            "Larry Dehart",
            "Rhonda Woodard"
        ]
        .then(function(answer) {
        switch (answer.action) {
            case "Shaun Neidig":
                salesManager();
                break;

                case "Larry Dehart":
                    plumbingManager();
                    break;
        }
        })
    });  
    // beginPrompt();
}

function addEmployee() {
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
                type: "input",
                message: "Type in employees role id 1 = PRS, 2 = Technician, 3 = Dispatch, 4 = CSR"
            },
            {
                name: "managerID",
                type: "input",
                message: "Type in employees manager id 5 = Shaun neidig, 6 = Larry Dehart, 7 = Rhonda Woodward"
            },
            {
                name: "Salary",
                type: "input",
                message: "Type in employees salary"
            },
            {
                name: "dept",
                type: "input",
                message: "Type in employees department id 1 = Sales, 2 = Plumbing, 3 = Dispatch, 4 = CSR",
            }

        ])
        .then(function (answer) {
            connection.query("INSERT INTO employee, empRole, department SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID,
                    salary: answer.Salary,
                    department_id: answer.dept
                },
                function (err) {
                    if (err) throw err;
                    console.log("New employee submitted succesfully")
                    beginPrompt();
                }
            );
        })
}

function removeEmployee() {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;

        inquirer
            .prompt({
                name: "remove",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].first_name + results[i].last_name);
                    }
                    return choiceArray;
                }
            })
    })
}