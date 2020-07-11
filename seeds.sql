USE employTrack_db;
    -- department table
INSERT INTO department (id, deptName)
VALUES (1, "Sales");    
INSERT INTO department (ID, deptName)
VALUES (2, "Plumbing");
INSERT INTO department (ID, deptName)
VALUES (3, "Dispatch");
INSERT INTO department (ID, deptName)
VALUES (4, "CSR");
    -- Employee role table
INSERT INTO empRole (id, title, salary, department_id)
VALUES (1, "PRS", 80000, 1);
INSERT INTO empRole (id, title, salary, department_id)
VALUES (2, "Technician", 60000, 2);
INSERT INTO empRole (id, title, salary, department_id)
VALUES (3, "Lead Dispatch", 50000, 3);
INSERT INTO empRole (id, title, salary, department_id)
VALUES (4, "Lead CSR", 40000, 4);
INSERT INTO empRole (id, title, salary, department_id)
VALUES (5, "Sales manager", 90000, 1);
INSERT INTO empRole (id, title, salary, department_id)
VALUES (6, "Plumbing manager", 100000, 2);
INSERT INTO empRole (id, title, salary, department_id)
VALUES (7, "Dispatch/Csr Manager", 60000, 4);
    -- Employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Shaun", "Neidig", 5, 5);  
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Larry", "Dehart", 6, 6);   
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Rhonda", "Woodward", 7, 7);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Joseph", "Arocha", 3, 5);  
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Jesse", "Diaz", 2, 6);   
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Chris", "Car", 3, 7);  
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Eliza", "Cantu", 4, 7); 
