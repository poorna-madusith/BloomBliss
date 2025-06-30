const {signup, login,updateProfile,getProfile} = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


router.post('/signup', signup);
router.post('/login', login);
router.put('/profile',auth,updateProfile);
router.get('/profile',auth,getProfile);




module.exports = router;