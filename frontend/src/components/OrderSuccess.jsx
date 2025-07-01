import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function OrderSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home after 5 seconds
        const timer = setTimeout(() => {
            navigate('/shop');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen pt-24 bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto text-center p-8">
                <CheckCircleIcon style={{ fontSize: 64, color: '#06D6A0' }} />
                <h1 className="text-3xl font-bold mt-4 mb-2">Order Successful!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    You will receive a confirmation email shortly.
                </p>
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

export default OrderSuccess;
