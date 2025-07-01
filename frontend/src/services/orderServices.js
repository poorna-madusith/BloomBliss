import API from "../api";

export const createOrder = async (orderData) => {
    try {
        console.log('Making API request to create order with data:', JSON.stringify(orderData, null, 2));
        // Verify token is present
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        console.log('Authentication token is present');
        
        const response = await API.post("/api/orders/create", orderData);
        console.log('Order creation response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            details: error.response?.data?.message || 'No detailed error message available'
        });
        throw error;
    }
};

export const getUserOrders = async () => {
    try {
        console.log('Sending request to fetch user orders...');
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await API.get("/api/orders/user-orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        console.log('User orders API response:', response);
        
        if (!response.data) {
            throw new Error('No data received from the server');
        }
        
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching user orders:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};
