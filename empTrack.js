const mysql = require("mysql");
const inquirer = require("inquirer");

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
                "Add manager",
                "Add Department",
                "Remove employee",
                "Remove manager",
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

                case "Add manager":
                    addManager();
                    break;

                    case "Add Department":
                        addDepartment();
                        break;

                case "Remove employee":
                    removeEmployee();
                    break;

                case "Remove manager":
                    removeManager();
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
        console.log(answer.length + " employees found ");
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
    });
    beginPrompt();
}
// this function allows users to view all roles by title
let viewRoles = () => {
    var query = "SELECT * FROM emprole";
    connection.query(query, (err, answer) => {
        if (err) throw err;
        console.log("All employees currently employed");
        console.table(answer);
    });
    beginPrompt();
}
// this function allows users to add new role
let addRole = () => {
    connection.query("SELECT * FROM emprole", (err, results) => {
        inquirer.prompt([{
                    name: "emproleid",
                    type: "input",
                    message: "Enter desired role id# Greater then 8"
                },
                {
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
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].department_id);
                        }
                        return choiceArray
                    }

                }
            ])
            .then((answer) => {
                connection.query("INSERT INTO emprole SET ?", {
                        id: answer.emproleid,
                        title: answer.roleTitle,
                        salary: answer.roleSalary,
                        department_id: answer.roleDeptID
                    }),
                    (err) => {
                        if (err) throw err;
                    }
                console.log("Successfully added role")
                beginPrompt();
            })
    });
}

let addDepartment = () => {
    connection.query("SELECT * FROM department", (err, results) => {
        inquirer.prompt([{
                    name: "deptid",
                    type: "input",
                    message: "Enter desired dept id# Greater then 10"
                },
                {
                    name: "deptname",
                    type: "input",
                    message: "Enter name of new department"
                }
            ])
            .then((answer) => {
                connection.query("INSERT INTO department SET ?", {
                        id: answer.deptid,
                        deptName: answer.deptname,                     
                    }),
                    (err) => {
                        if (err) throw err;
                    }
                console.log("Successfully added new department");
                console.table(answer);
                beginPrompt();
            })
    });
}

// this function allows users to add new employee
let addEmployee = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "empid",
                    type: "input",
                    message: "Enter desired employee id# Greater then 8"
                },
                {
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
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].role_id);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "managerID",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].manager_id);
                        }
                        return choiceArray;
                    }

                }

            ])
            .then((answer) => {
                connection.query("INSERT INTO employee SET ?", {
                        id: answer.empid,
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.roleID,
                        manager_id: answer.managerID
                    }),
                    (err) => {
                        if (err) throw err;
                    }
                console.log("Successfully added employee")
                beginPrompt();
            });
    });

}
// this function allows users to add new employee
let addManager = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "empid",
                    type: "input",
                    message: "Enter desired manager id# Greater then 50"
                },
                {
                    name: "firstName",
                    type: "input",
                    message: "Type in managers first name."
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Type in managers last name."
                },
                {
                    name: "roleID",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].role_id);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "managerID",
                    type: "input",
                    message: "type in manager id greater then 50"

                }

            ])
            .then((answer) => {
                connection.query("INSERT INTO employee SET ?", {
                        id: answer.empid,
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.roleID,
                        manager_id: answer.managerID
                    }),
                    (err) => {
                        if (err) throw err;
                    }
                console.log("Successfully added manager")
                beginPrompt();
            });
    });

}
// this function allows users to remove employee
let removeEmployee = () => {
    connection.query("SELECT * FROM employee", (err) => {
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
// this function allows users to remove a role
let removeRole = () => {
    connection.query("SELECT * FROM emprole", (err, results) => {
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
                console.table(results)
                beginPrompt();
            });
    });

}
// this function allows users to remove a manager
let removeManager = () => {
    connection.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "remove",
                type: "input",
                message: "Enter manager id you wish to remove"
            }])
            .then((answer) => {
                connection.query("DELETE FROM employee where ?", {
                    id: answer.remove

                });
                console.log("Successfully deleted manager");
                console.table(results);
                beginPrompt();
            });
    });

}