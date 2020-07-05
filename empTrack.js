var mysql = require("mysql");
var inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Rootbeer1",
    database: "empTrack_db"
  });

  connection.connect(function(err) {
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
            "View all employees by department",
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
    })      // begin switch statements for prompted answers
    .then((answer) => {
        switch(answer.action) {
            case "View all employees":
            viewEmployees();
            break;

            case  "View all employees by department":
                viewEmployeesDept();
                break;

                case   "View all employees by manager":
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

                                            case  "Remove role":
                                                removeRole();
                                                break;

                                                case "Exit":
                                                    connection.end();
                                                    break;
        }
    });
  }
  // this function allows users to see all employees
  function viewEmployees() {
      inquirer
      .prompt({
          name: "first_name",
          type: "list",
          message: "Current employees",
          choices: [
            "Joseph Arocha",
            "Jesse Diaz",
            "Chris Car",
            "Eliza Cantu",
            "Larry Dehart",
            "Shaun Neidig",
            "Rhonda Woodward"
          ]
      })
      .then((answer) => {
          var query = "SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?";
          connection.query(query, {first_name: answer.first_name}, (err, res) => {
              if (err) throw err;
              for (var i = 0; i < res.length; i++) {
                  console.log("first_name" + res[i].first_name + "|| last_name" + res[i].last_name + "|| role_id" + res[i].role_id + "|| manager_id" + res[i].manager_id);
              }
              beginPrompt();
          });
      });
  }
    // this function allows users to view employees by dept.
  function viewEmployeesDept() {
    inquirer
    .prompt({
        name: "deptName",
        type: "list",
        message: "Select department",
        choices: [
            "Sales",
            "Plumbing",
            "Dispatch",
            "CSR"
        ]
    })
    .then((answer) => {
        var query = "SELECT deptName FROM department WHERE ?";
        connection.query(query, {deptName: answer.deptName}, (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("deptName" + res[i].deptName)             
            }
            beginPrompt();
        });
    });
  }
        // this fucntion allows users to view employees by manager.
  function viewEmployeesManager() {
    inquirer
    .prompt({
        name: "manager_id",
        type: "list",
        message: "Select manager",
        choices: [
            "Shaun Neidig",
            "Larry Dehart",
            "Rhonda Woodward"
            
        ]
    })
    .then((answer) => {
        var query = "SELECT manager_id FROM employee WHERE ?";
        connection.query(query, {manager_id: answer.manager_id}, (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("manager_id" + res[i].manager_id)             
            }
            
        });
    });
  }