import API from "../api";

export const createOrder = async (orderData) => {
    try {
        console.log('Making API request to create order');
        const response = await API.post("/api/orders/create", orderData);
        console.log('Order creation response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

export const getUserOrders = async () => {
    try {
        const response = await API.get("/api/orders/user-orders");
        return response.data;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
};
