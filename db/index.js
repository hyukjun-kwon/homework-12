const mysql = require('mysql');

const db = {};

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'myPass',
  database : 'employees'
});

db.budgetByDepartment = (departmentId) => {
  return new Promise((resolve, reject) => {
    connection.query(`
      SELECT SUM(r.salary)
      FROM employee e
      JOIN role r
        ON e.role_id = r.id
      WHERE r.department_id = ?
    `, [ departmentId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result[0]['SUM(r.salary)']);
    });
  });
};

db.allEmployeesInfo = () => {
  return new Promise((resolve, reject) => {
    connection.query(`
    SELECT 
      e.id as "employee id", 
      e.first_name as "first name", 
      e.last_name as "last name", 
      r.title as "job title", 
      r.salary, 
      d.name as department 
    FROM employee e 
    JOIN role r 
      ON e.role_id=r.id 
    JOIN department d 
      ON r.department_id = d.id 
    ORDER BY e.id ASC`, (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    })
  })
}

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
    connection.query(`
    SELECT 
      d.name, 
      e.first_name, 
      e.last_name 
    FROM employee e 
    JOIN role r 
      ON e.role_id=r.id 
    JOIN department d 
      ON d.id=r.department_id 
    WHERE r.department_id = ?`, [ departmentId ], (err, result) => {
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

db.findAllPossibleManagers = (employeeId) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM employee WHERE id != ?`, [ employeeId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    })
  })
}

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
    connection.query(`
    INSERT INTO role (title, salary, department_id) 
    VALUES (?, ?, ?)`, [ role.title, role.salary, role.department_id ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.removeRole = (roleId) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM role WHERE id = ?`, [ roleId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.createDepartment = (department) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO department (name) 
    VALUES (?)`, [ department ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.removeDepartment = (departmentId) => {
  return new Promise((resovle, reject) => {
    connection.query(`DELETE FROM department WHERE id = ?`, [ departmentId ], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

db.createEmployee = (employee) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO employee 
    (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [employee.first_name,employee.last_name, employee.role_id, employee.manager_id], (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};




module.exports = db;
