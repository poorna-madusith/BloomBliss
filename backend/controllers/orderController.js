const Order = require('../models/orders');
const Flower = require('../models/flowers');

exports.createOrder = async (req, res) => {
    try {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        console.log('Request user object:', req.user);
        
        if (!req.user || !req.user.id) {
            console.error('Missing user ID in request:', req.user);
            return res.status(401).json({ 
                message: "User not authenticated properly",
                debug: { user: req.user }
            });
        }

        const { items, shippingAddress, contactInfo, subtotal, deliveryCharge, total, paymentInfo } = req.body;
        
        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Invalid order: Items array is required and must not be empty",
                receivedItems: items
            });
        }

        if (!shippingAddress) {
            return res.status(400).json({
                message: "Invalid order: Shipping address is required"
            });
        }

        if (!contactInfo || !contactInfo.name || !contactInfo.email || !contactInfo.mobile) {
            return res.status(400).json({
                message: "Invalid order: Contact information is incomplete",
                receivedContactInfo: contactInfo
            });
        }

        console.log('Creating order for user:', req.user.id);
        
        // Calculate total amount and verify stock
        for (const item of items) {
            const flower = await Flower.findById(item.flowerId);
            if (!flower) {
                return res.status(400).json({ 
                    message: "Invalid order: Flower not found",
                    flowerId: item.flowerId 
                });
            }

            if (flower.quantity < item.quantity) {
                return res.status(400).json({
                    message: "Invalid order: Insufficient stock",
                    flower: flower.name,
                    requestedQuantity: item.quantity,
                    availableQuantity: flower.quantity
                });
            }
            
            // Update flower quantity
            flower.quantity -= item.quantity;
            await flower.save();
        }

        const orderData = {
            userId: req.user.id,
            items,
            subtotal,
            deliveryCharge,
            total,
            shippingAddress,
            contactInfo,
            paymentInfo,
            orderDate: new Date(),
            status: 'Pending'
        };

        console.log('Creating order with data:', orderData);

        const order = new Order(orderData);
        const savedOrder = await order.save();
        
        console.log('Order created successfully:', savedOrder);

        res.status(201).json({ 
            message: "Order created successfully", 
            order: savedOrder 
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ 
            message: "Error creating order", 
            error: error.message,
            details: error.errors // Include mongoose validation errors if any
        });
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
