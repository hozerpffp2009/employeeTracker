USE empTrack_db;
    --PRS Employee
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Joseph", "Arocha", 3, 5)
INSERT INTO empRole (id, title, salary, department_id)
VALUES (1, "PRS", 80000, 1)
INSERT INTO department (ID, deptName)
VALUES (1, "Sales")
    --Technician Employee
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Jesse", "Diaz", 4, 6)
INSERT INTO empRole (id, title, salary, department_id)
VALUES (2, "Technician", 60000, 2)
INSERT INTO department (ID, deptName)
VALUES (2, "Plumbing")
    --Dispatch Employee
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Chris", "Car", 3, 7)
INSERT INTO empRole (id, title, salary, department_id)
VALUES (3, "Lead Dispatch", 50000, 3)
INSERT INTO department (ID, deptName)
VALUES (3, "Dispatch")
    --CSR Employee
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Eliza", "Cantu", 4, 7)
INSERT INTO empRole (id, title, salary, department_id)
VALUES (4, "Lead CSR", 40000, 4)
INSERT INTO department (ID, deptName)
VALUES (4, "CSR")
    -- Sales manager
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Shaun", "Neidig", 5, NULL)
INSERT INTO empRole (id, title, salary, department_id)
VALUES (5, "Sales manager", 90000, 1)

    -- Plumbing Manager
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Larry", "Dehart", 6, NULL)
INSERT INTO empRole (id, title, salary, department_id)
VALUES (6, "Plumbing manager", 100000, 2)

    --Dispatch/CSR Manager
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Rhonda", "Woody", 7, NULL)
INSERT INTO empRole (id, title, salary, department_id)
VALUES (7, "Dispatch/Csr Manager", 60000, 4)
