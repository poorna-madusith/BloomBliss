import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen pt-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {cartItems.map(item => (
                            <div key={item.flowerId} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                            <p className="text-[#06D6A0] font-bold">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.flowerId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-8 flex justify-between items-center">
                            <div className="text-xl font-bold">Total: ₹{total}</div>
                            <button 
                                onClick={() => navigate('/checkout')}
                                className="bg-[#06D6A0] text-white px-6 py-3 rounded-lg hover:bg-[#05bf8f]"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
