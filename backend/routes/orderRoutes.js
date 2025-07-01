const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/create', auth, orderController.createOrder);
router.get('/user-orders', auth, orderController.getUserOrders);
router.get('/:orderId', auth, orderController.getOrderById);

module.exports = router;
