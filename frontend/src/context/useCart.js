import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartContext';

export const useCart = () => {
    const context = useContext(CartContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    const addToCartWithAuth = (flower, quantity) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }
        context.addToCart(flower, quantity);
    };

    return {
        ...context,
        addToCart: addToCartWithAuth
    };
};
