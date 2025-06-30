const {addFlower,getFlowers} = require('../controllers/flowerController');
const express = require('express');
const router = express.Router();

router.post('/addflower',addFlower);
router.get('/getflowers',getFlowers);


module.exports = router;
