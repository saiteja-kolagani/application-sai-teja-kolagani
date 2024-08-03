
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', (req, res) => {

    const { userId } = req;
    authController.getUserDetails(userId, (err, user) => {
      if (err) return res.status(500).send('Error fetching user details.');
      res.status(200).json(user);
    });
  });

module.exports = router; 
