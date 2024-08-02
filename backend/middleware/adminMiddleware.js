module.exports = (req, res, next) => {
  if (req.userRole !== 'admin') {
    console.log('Access denied. Admins only.');
    return res.status(403).send('Access denied. Admins only.');
  }
  next();
};