DROP DATABASE IF EXISTS employTrack_db;
Create database employTrack_db;
USE employTrack_db;
   
    --Department Table
CREATE TABLE department (
	id INTEGER NOT NULL,
	deptName VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
    --empRole Table
CREATE TABLE emprole (
	id INT NOT NULL,
	title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
 --Employee table
CREATE TABLE employee (
	id INT NOT NULL,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES emprole(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) 
);

