const {signup, login,updateProfile} = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


router.post('/signup', signup);
router.post('/login', login);
router.put('/profile',auth,updateProfile);




module.exports = router;