const Order = require('../models/orders');
const Flower = require('../models/flowers');

exports.createOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;
        
        // Calculate total amount and verify stock
        let totalAmount = 0;
        for (const item of items) {
            const flower = await Flower.findById(item.flowerId);
            if (!flower || flower.quantity < item.quantity) {
                return res.status(400).json({ message: "Invalid order: Insufficient stock" });
            }
            totalAmount += flower.price * item.quantity;
            
            // Update flower quantity
            flower.quantity -= item.quantity;
            await flower.save();
        }

        const order = new Order({
            userId: req.user.id,
            items,
            totalAmount,
            shippingAddress
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate('items.flowerId')
            .sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.orderId,
            userId: req.user.id
        }).populate('items.flowerId');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
};
