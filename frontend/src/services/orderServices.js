import API from "../api";

export const createOrder = async (orderData) => {
    try {
        const response = await API.post("/api/orders/create", orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
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
