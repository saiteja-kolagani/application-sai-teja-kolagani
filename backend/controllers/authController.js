const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = (req, res) => {
  const { username, password, role } = req.body;
  console.log('Registering user:', username);

  userModel.getUserByUsername(username, (err, existingUser) => {
    if (err) {
      console.error('Error checking username:', err.message);
      return res.status(500).send('Error checking username.');
    }
    if (existingUser) {
      return res.status(400).send('Username already exists.');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    userModel.createUser(username, hashedPassword, role, (err, userId) => {
      if (err) {
        console.error('Error registering user:', err.message);
        return res.status(500).send('Error registering user.');
      }

      const token = jwt.sign({ id: userId, role: role }, process.env.SECRET_KEY, { expiresIn: 86400 });
      res.cookie('token', token, { httpOnly: true }); // Optionally set token as a cookie
      res.status(200).send({ auth: true, token });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log(`Attempting login for username: ${username}`);

  userModel.getUserByUsername(username, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('User not found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: 86400 });
    res.cookie('token', token, { httpOnly: true }); // Optionally set token as a cookie
    res.status(200).send({ auth: true, token });
  });
};
