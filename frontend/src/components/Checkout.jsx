import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { createOrder } from '../services/orderServices';

function Checkout() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const deliveryCharge = 10;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryCharge;

    useEffect(() => {
        // Fetch user data when component mounts
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setUserData(data);
                
                // Pre-fill the form with user data
                setFormData(prev => ({
                    ...prev,
                    name: data.name || '',
                    email: data.email || '',
                    mobile: data.mobile || '',
                    address: data.address || ''
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Format card number with spaces
        if (name === 'cardNumber') {
            const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            setFormData(prev => ({
                ...prev,
                [name]: formatted
            }));
            return;
        }

        // Format expiry date
        if (name === 'expiryDate') {
            const formatted = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})/, '$1/')
                .substr(0, 5);
            setFormData(prev => ({
                ...prev,
                [name]: formatted
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to place an order');
                navigate('/login');
                return;
            }

            // Validate cart items
            if (!cartItems || cartItems.length === 0) {
                alert('Your cart is empty');
                navigate('/shop');
                return;
            }

            const orderData = {
                items: cartItems.map(item => ({
                    flowerId: item.flowerId, // Changed from item._id to item.flowerId
                    quantity: item.quantity,
                    price: parseFloat(item.price),
                    name: item.name
                })),
                shippingAddress: formData.address.trim(),
                contactInfo: {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    mobile: formData.mobile.trim()
                },
                subtotal: parseFloat(subtotal),
                deliveryCharge: parseFloat(deliveryCharge),
                total: parseFloat(total),
                paymentInfo: {
                    cardNumber: formData.cardNumber.slice(-4),
                    expiryDate: formData.expiryDate
                }
            };

            // Debug log to verify the data
            console.log('Cart Items:', cartItems);
            console.log('Order Items:', orderData.items);

            // Validate all required fields
            if (!orderData.shippingAddress) {
                throw new Error('Shipping address is required');
            }
            if (!orderData.contactInfo.name || !orderData.contactInfo.email || !orderData.contactInfo.mobile) {
                throw new Error('All contact information fields are required');
            }

            // Validate flower IDs
            if (orderData.items.some(item => !item.flowerId)) {
                throw new Error('Some items are missing flower IDs');
            }

            const response = await createOrder(orderData);
            
            if (response) {
                // Show success alert
                alert('Order placed successfully! Thank you for shopping with us.');
                // Clear the cart
                clearCart();
                // Redirect to order success page
                navigate('/order-success');
            }
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'There was an error placing your order.';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Please login again to place your order.';
                    navigate('/login');
                } else {
                    errorMessage = error.response.data.message || errorMessage;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            alert(errorMessage + ' Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-24 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <button
                        onClick={() => navigate('/shop')}
                        className="bg-[#06D6A0] text-white px-6 py-2 rounded-lg hover:bg-[#05bf8f]"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.flowerId} className="flex justify-between">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>₹{subtotal}</p>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <p>Delivery Charge</p>
                                    <p>₹{deliveryCharge}</p>
                                </div>
                                <div className="flex justify-between font-bold mt-2">
                                    <p>Total</p>
                                    <p>₹{total}</p>
                                </div>
                            </div>
                            </div>
                    </div>

                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06D6A0] focus:ring-[#06D6A0]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06D6A0] focus:ring-[#06D6A0]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06D6A0] focus:ring-[#06D6A0]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06D6A0] focus:ring-[#06D6A0]"
                                />
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                            maxLength="19"
                                            placeholder="xxxx xxxx xxxx xxxx"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06D6A0] focus:ring-[#06D6A0]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06D6A0] focus:ring-[#06D6A0]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                required
                                                maxLength="3"
                                                placeholder="123"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#06D6A0] focus:ring-[#06D6A0]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-6 bg-[#06D6A0] text-white py-2 px-4 rounded-lg hover:bg-[#05bf8f] transition-colors ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Processing...' : `Pay ₹${total}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
