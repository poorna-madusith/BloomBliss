import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../services/authservices";


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

  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const fetchUserProfile = async () => {
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
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try{
        const res = await updateProfile(formData);
        console.log("Profile updated successfully:", res);
        fetchUserProfile();
        setIsUpdate(false);
        
    }catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again later.");
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [Navigate]);

  return (
    <div className="min-h-screen font-[Montserrat] py-12" style={{ backgroundColor: '#F8FFE5' }}>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold" style={{ color: '#06D6A0' }}>Your Profile</h2>
          <p className="text-gray-600 mt-2 text-sm">Manage your account information</p>
        </div>

        {isUpdate ? (
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-sm"
                  style={{ '--tw-ring-color': '#06D6A0' }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
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
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label htmlFor="mobilenumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobilenumber"
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
              <div className="bg-gray-50 rounded-lg p-5 min-h-[100px]">
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="text-base font-medium">{userData.name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 min-h-[100px]">
                <p className="text-sm text-gray-600 mb-1">Email Address</p>
                <p className="text-base font-medium">{userData.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-5 min-h-[100px]">
                <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                <p className="text-base font-medium">{userData.mobilenumber}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 min-h-[100px]">
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
    </div>
  );
}

export default Profile;
