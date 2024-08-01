const db = require('./database');

const createUser = (username, password, role, callback) => {
  const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
  db.run(query, [username, password, role], function (err) {
    if (err) {
      console.error('Error inserting user into database:', err.message);
      callback(err, null);
      return;
    }
    callback(null, this.lastID);
  });
};

const getUserByUsername = (username, callback) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], (err, user) => {
    if (err) {
      console.error('Error fetching user from database:', err.message);
    }
    callback(err, user);
  });
};

module.exports = {
  createUser,
  getUserByUsername
};
