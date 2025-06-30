import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authservices";

function Login(){

    const [formdata, SetFormData] = useState({
        email:"",
        password:"",
    })

    const Navigate = useNavigate();

    const handleSubmit  = async (e) => {
        e.preventDefault();

        try{
             const response = await login(formdata);
             const {token , user} = response;
             console.log("User data:", user);
             localStorage.setItem('token',token);
             console.log("Login successful:", response);
             Navigate("/profile");   
        }catch(err){
            console.error("Error during login:", err);
            alert("Login failed. Please check your credentials.");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="email" onChange={(e)=> SetFormData({...formdata,email:e.target.value})} name="email" placeholder="Email" value={formdata.email} required />
            <input type="password" onChange={(e)=> SetFormData({...formdata, password:e.target.value})} name="password" placeholder="Password" value={formdata.password} required />
            <button onClick={handleSubmit}>Login</button>
            <a href="/signup">Don't have an account? Sign Up</a>
        </div>
    )

}

export default Login;