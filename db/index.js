const mysql = require('mysql');

const db = {};

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'myPass',
  database : 'employees'
});

db.findAllEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM employee`, (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.findAllDepartments = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM department`, (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.findAllRoles = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM role`, (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.findAllEmployeesByDepartment = (departmentId) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT d.name, e.first_name, e.last_name FROM employee e JOIN role r ON e.role_id=r.id JOIN department d ON d.id=r.department_id WHERE r.department_id = ?`, [ departmentId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.findAllEmployeesByManager = (managerId) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM employee WHERE manager_id = ?`, [ managerId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.removeEmployee = (employeeId) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM employee WHERE id = ?`, [ employeeId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.updateEmployeeRole = (employeeId, roleId) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [ roleId, employeeId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.updateEmployeeManager = (employeeId, managerId) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [ managerId, employeeId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.createRole = (role) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [ role.title, role.salary, role.department_id ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
}


module.exports = db;
