import { useState } from 'react';
import { CartContext } from './cartContext';

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (flower, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.flowerId === flower._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.flowerId === flower._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, {
                flowerId: flower._id,
                name: flower.name,
                price: flower.price,
                image: flower.image,
                quantity
            }];
        });
    };

    const removeFromCart = (flowerId) => {
        setCartItems(prevItems => prevItems.filter(item => item.flowerId !== flowerId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
