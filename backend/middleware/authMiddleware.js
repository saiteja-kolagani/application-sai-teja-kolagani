const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("No token provided.");
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token authentication failed: ", err);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    console.log(`Authenticated user: ${req.userId}, Role: ${req.userRole}`);
    next();
  });
};
