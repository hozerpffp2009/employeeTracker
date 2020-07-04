DROP DATABASE IF EXISTS empTrack_db;
Create database empTrack_db;
USE empTrack_db;
    --Employee table
CREATE TABLE employee (
	position INT NOT NULL,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE CASCADE
);
    --empRole Table
CREATE TABLE empRole (
	position INT NOT NULL,
	title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
    --Department Table
CREATE TABLE department (
	position INTEGER NOT NULL,
	deptName VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

