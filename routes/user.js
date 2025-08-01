const express = require('express');
const router = express.Router();
const { register, login, getUserDetails } = require('../controllers/authController'); // ✅ import all needed handlers
const { verify } = require('../auth');

// Routes
router.post('/register', register);          // POST /users/register
router.post('/login', login);                // POST /users/login
router.get('/details', verify, getUserDetails); // GET /users/details (protected)

module.exports = router;
