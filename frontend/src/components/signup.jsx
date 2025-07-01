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
        confirmPassword:""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        mobilenumber: "",
        address: "",
        password: "",
        confirmPassword: "",
        general: ""
    });

    const Navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            email: "",
            mobilenumber: "",
            address: "",
            password: "",
            confirmPassword: "",
            general: ""
        };

        // Name validation
        if (!formdata.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        } else if (formdata.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters long";
            isValid = false;
        }

        // Email validation
        if (!formdata.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        // Mobile number validation
        if (!formdata.mobilenumber) {
            newErrors.mobilenumber = "Mobile number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(formdata.mobilenumber)) {
            newErrors.mobilenumber = "Please enter a valid 10-digit mobile number";
            isValid = false;
        }

        // Address validation
        if (!formdata.address) {
            newErrors.address = "Address is required";
            isValid = false;
        }

        // Password validation
        if (!formdata.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formdata.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
            isValid = false;
        }

        // Confirm password validation
        if (!formdata.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formdata.password !== formdata.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        SetFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear the error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await signup(formdata);
            console.log("Signup successful:", response);
            Navigate("/login");
        } catch (err) {
            console.error("Error during signup:", err);
            setErrors(prev => ({
                ...prev,
                general: "An error occurred during signup. Please try again."
            }));
        }
    }

    return(
        <div className="flex min-h-screen items-center justify-center font-[Montserrat]" style={{ backgroundColor: '#F8FFE5' }}>
            <div className="w-full max-w-xl p-8 rounded-lg shadow-lg bg-white">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold" style={{ color: '#06D6A0' }}>Create Account</h2>
                    <p className="text-gray-600 mt-2 text-base">Please fill in your details</p>
                </div>
                {errors.general && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors.general}
                    </div>
                )}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                id="name"
                                onChange={handleChange} 
                                name="name" 
                                placeholder="Enter your full name" 
                                value={formdata.name} 
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-sm ${
                                    errors.name ? 'border-red-500' : ''
                                }`}
                                style={{ '--tw-ring-color': '#06D6A0' }}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                onChange={handleChange} 
                                name="email" 
                                placeholder="Enter your email" 
                                value={formdata.email} 
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-sm ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                                style={{ '--tw-ring-color': '#06D6A0' }}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="mobilenumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Number
                            </label>
                            <input 
                                type="tel" 
                                id="mobilenumber"
                                onChange={handleChange} 
                                name="mobilenumber" 
                                placeholder="Enter your mobile number" 
                                value={formdata.mobilenumber} 
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-sm ${
                                    errors.mobilenumber ? 'border-red-500' : ''
                                }`}
                                style={{ '--tw-ring-color': '#06D6A0' }}
                            />
                            {errors.mobilenumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.mobilenumber}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input 
                                type="text" 
                                id="address"
                                onChange={handleChange} 
                                name="address" 
                                placeholder="Enter your address" 
                                value={formdata.address} 
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-sm ${
                                    errors.address ? 'border-red-500' : ''
                                }`}
                                style={{ '--tw-ring-color': '#06D6A0' }}
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                onChange={handleChange} 
                                name="password" 
                                placeholder="Enter your password" 
                                value={formdata.password} 
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-sm ${
                                    errors.password ? 'border-red-500' : ''
                                }`}
                                style={{ '--tw-ring-color': '#06D6A0' }}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input 
                                type="password" 
                                id="confirmPassword"
                                onChange={handleChange} 
                                name="confirmPassword" 
                                placeholder="Confirm your password" 
                                value={formdata.confirmPassword} 
                                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition text-sm ${
                                    errors.confirmPassword ? 'border-red-500' : ''
                                }`}
                                style={{ '--tw-ring-color': '#06D6A0' }}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white py-2.5 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ 
                            backgroundColor: '#06D6A0',
                            '--tw-ring-color': '#06D6A0',
                            ':hover': {
                                backgroundColor: '#05bf90'
                            }
                        }}
                    >
                        Create Account
                    </button>
                    <div className="text-center mt-4">
                        <a href="/login" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#06D6A0' }}>
                            Already have an account? Sign In
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Signup;
