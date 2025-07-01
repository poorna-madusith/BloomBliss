const {signup, login, updateProfile, getProfile, getUserCount} = require('../controllers/authController');
const {getUserData} = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');



router.post('/signup', signup);
router.post('/login', login);
router.put('/profile',auth,updateProfile);
router.get('/profile',auth,getProfile);
router.get('/user', auth, getUserData);
router.get('/usercount', getUserCount);


module.exports = router;