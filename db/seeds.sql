INSERT INTO department (name) VALUES
('Marketing'),
('Human Resources'),
('Accounting'),
('Sales'),
('Customer Service');

INSERT INTO role (title, salary, department_id) VALUES
('Marketing associate', '60000', '1'),
('Marketing analyst', '80000', '1'),
('Marketing director', '120000', '1'),
('HR specialist', '70000', '2'),
('HR manager', '90000', '2'),
('Billing specialist', '75000', '3'),
('Accounting specialist', '90000', '3'),
('Sales associate', '90000', 4),
('Sales manager', '120000', 4),
('General Sales Manager', '200000', '4'),
('Customer Support Representative', '70000', '5'),
('Technical Support Specialist', '80000', '5'),
('Client Relations Manager', '100000', '5');

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Johnson', 1, 3),  
('Bob', 'Smith', 2, 3),          
('Carol', 'Williams', 3, NULL),     
('David', 'Brown', 4, 5),      
('Eve', 'Davis', 5, NULL),           
('Frank', 'Miller', 6, 7),    
('Grace', 'Wilson', 7, NULL),        
('Hannah', 'Taylor', 8, 9),   
('Ian', 'Moore', 9, 10),          
('Jack', 'Anderson', 10, NULL),      
('Kara', 'Thomas', 11, 13),     
('Leo', 'Jackson', 12, 13),      
('Mia', 'White', 13, NULL);     