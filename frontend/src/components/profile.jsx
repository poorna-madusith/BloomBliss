import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/authservices";
import { getUserOrders } from "../services/orderServices";
import background2 from "../assets/background2.png";


function Profile() {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    address: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    address: "",
  });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/home");
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Navigate("/login");
        return;
      }
      const response = await getProfile();
      setuserData({
        name: response.name,
        email: response.email,
        mobilenumber: response.mobilenumber,
        address: response.address,
      });
      setFormData({
        name: response.name,
        email: response.email,
        mobilenumber: response.mobilenumber,
        address: response.address,
      });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      alert("Failed to fetch user profile. Please try again later.");
    }
  }, [Navigate]);

  const fetchOrders = useCallback(async () => {
    try {
      console.log('Fetching user orders...');
      const ordersData = await getUserOrders();
      console.log('Orders data received:', ordersData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
      alert("Failed to fetch orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
    fetchOrders();
  }, [fetchUserProfile, fetchOrders]);

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsUpdate(false);
      fetchUserProfile();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again later.");
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Shipped':
        return 'text-blue-600 bg-blue-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Pending':
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      className="min-h-screen pt-24 pb-12"
      style={{
        backgroundImage: `url(${background2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>
        
        {/* Profile Details Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-6">
          {isUpdate ? (
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-base"
                    style={{ '--tw-ring-color': '#06D6A0' }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-base"
                    style={{ '--tw-ring-color': '#06D6A0' }}
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    value={formData.mobilenumber}
                    onChange={(e) => setFormData({ ...formData, mobilenumber: e.target.value })}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-base"
                    style={{ '--tw-ring-color': '#06D6A0' }}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your address"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-base"
                    style={{ '--tw-ring-color': '#06D6A0' }}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsUpdate(false)}
                  className="px-6 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleEditSave}
                  className="px-6 py-3 rounded-md text-white transition duration-300 font-medium"
                  style={{ backgroundColor: '#06D6A0' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50/80 rounded-lg p-5 min-h-[100px]">
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="text-base font-medium">{userData.name}</p>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-5 min-h-[100px]">
                  <p className="text-sm text-gray-600 mb-1">Email Address</p>
                  <p className="text-base font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50/80 rounded-lg p-5 min-h-[100px]">
                  <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                  <p className="text-base font-medium">{userData.mobilenumber}</p>
                </div>
                <div className="bg-gray-50/80 rounded-lg p-5 min-h-[100px]">
                  <p className="text-sm text-gray-600 mb-1">Address</p>
                  <p className="text-base font-medium break-words">{userData.address}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition duration-300 font-medium text-sm"
                >
                  Logout
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdate(true)}
                  className="px-5 py-2.5 rounded-md text-white transition duration-300 font-medium text-sm"
                  style={{ backgroundColor: '#06D6A0' }}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order History Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Order History</h2>
          {isLoading ? (
            <div className="text-center py-4">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              You haven't placed any orders yet.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                      <p className="text-sm text-gray-500">Placed on {formatDate(order.orderDate)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-2">
                          <span>{item.name}</span>
                          <span className="text-gray-500">×{item.quantity}</span>
                        </div>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span>₹{order.deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p><span className="font-medium">Delivery Address:</span> {order.shippingAddress}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
