const mysql = require('mysql');

const db = {};

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'myPass',
  database : 'employees'
});

//db.findAllEmployees();
db.findAllEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM employee`, (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

//db.findAllDepartments();
db.findAllDepartments = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM department`, (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

//db.findAllEmployeesByDepartment(departmentId);
db.findAllEmployeesByDepartment = (departmentId) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT d.name, e.first_name, e.last_name FROM employee e JOIN role r ON e.role_id=r.id JOIN department d ON d.id=r.department_id WHERE r.department_id = ?`, [ departmentId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
}





module.exports = db;
