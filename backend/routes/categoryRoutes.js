const {addCategory} = require('../controllers/categoryController');
const express = require('express');
const router = express.Router();

router.post('/addcategory',addCategory);


module.exports = router;
