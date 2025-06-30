const {addCategory,getCategory, getCategoryById} = require('../controllers/categoryController');
const express = require('express');
const router = express.Router();

router.post('/addcategory',addCategory);
router.get('/getcategory',getCategory);
router.get('/getcategory/:id',getCategoryById);


module.exports = router;
