const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.register = (req, res) => {
  const { username, password, role } = req.body;
  console.log('Registering user:', username);

  const hashedPassword = bcrypt.hashSync(password, 8);

  userModel.createUser(username, hashedPassword, role, (err, userId) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Error registering user.' });
    }

    const token = jwt.sign({ id: userId, role }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({ token, role });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log(`Attempting login for username: ${username}`);

  userModel.getUserByUsername(username, (err, user) => {
    if (err) {
      console.error('Error on the server:', err);
      return res.status(500).json({ error: 'Error on the server.' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null, error: 'Invalid password.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1d' });

    res.status(200).json({ auth: true, token, role: user.role });
  });
};
