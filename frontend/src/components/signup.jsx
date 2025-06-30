import API from "../api";
import {signup} from "../services/authservices";
import {useState} from"react";
import {useNavigate}from "react-router-dom";

function Signup(){

    const[formdata,SetFormData] = useState({
        name:"",
        email:"",
        mobilenumber:"",
        address:"",
        password:"",
    });

    const Navigate = useNavigate();

    const handleChange = (e)=>{
        const{name,value} = e.target;
        SetFormData((prev)=>({
            ...prev,
            [name]:value

        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(formdata.password != formdata.confirmPassword){
            alert("Passwords do not match");
            return;
        }
        try{
            const response = await signup(formdata);
            console.log("Signup successful:", response);
            Navigate("/login");
        }catch(err){
            console.error("Error during signup:", err);
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>signup</h2>
                <input type="text" onChange={handleChange} name="name" placeholder="Name" value={formdata.name} required />
                <input type="email" onChange={handleChange} name="email" placeholder="Email" value={formdata.email} required />
                <input type="number" onChange={handleChange} name="mobilenumber" placeholder="Mobile Number" value={formdata.mobilenumber} required />
                <input type="text" onChange={handleChange} name="address" placeholder="Address" value={formdata.address} required />
                <input type="password" onChange={handleChange} name="password" placeholder="Password" value={formdata.password} required />
                <input type="password" onChange={handleChange} name="confirmPassword" placeholder="Confirm Password" value={formdata.confirmPassword} required />
                <button type="submit">Sign Up</button>
                <a href='/login'>Already have an account? Login</a>
            </form>
        </div>
    );
}



export default Signup;
 