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
    <div>
      <h2>Profile</h2>
      {isUpdate ? (
        <form>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={formData.mobilenumber}
            onChange={(e) => setFormData({ ...formData, mobilenumber: e.target.value })}
            placeholder="Mobile Number"
          />
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Address"
          />
          <button type="submit" onClick={handleEditSave}>Update</button>
          <button type="submit" onClick={()=>setIsUpdate(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Mobile Number: {userData.mobilenumber}</p>
          <p>Address: {userData.address}</p>
          <button onClick={() => setIsUpdate(true)}>Edit</button>
        </>
      )}

      <button onClick={handleLogout}>Logout</button>
      
    </div>
  );
}

export default Profile;
