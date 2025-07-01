import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/authservices";
import { toast } from 'react-toastify';
import '../app.css';
import '../index.css';
import background2 from '../assets/background2.png';

function Login(){
    const [formdata, SetFormData] = useState({
        email:"",
        password:"",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    });

    const navigate = useNavigate();
    const { state } = useLocation();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: "",
            password: "",
            general: ""
        };

        // Email validation
        if (!formdata.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        // Password validation
        if (!formdata.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formdata.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await login(formdata);
            localStorage.setItem("token", response.token);
            toast.success(
                <div>
                    <h4 className="font-medium">Welcome Back! 👋</h4>
                    <p className="text-sm">Successfully logged in</p>
                </div>,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                }
            );
            if (state?.from) {
                navigate(state.from);
            } else {
                navigate("/profile");
            }
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.message || "Invalid email or password";
            toast.error(
                <div>
                    <h4 className="font-medium">Login Failed</h4>
                    <p className="text-sm">{errorMessage}</p>
                </div>,
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
            setErrors(prev => ({
                ...prev,
                general: errorMessage
            }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" 
             style={{
                backgroundImage: `url(${background2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
             }}>
            <div className="max-w-md w-full space-y-8 bg-white/90 p-8 rounded-lg shadow-xl backdrop-blur-sm">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold" style={{ color: '#06D6A0' }}>Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Please sign in to continue</p>
                </div>
                {errors.general && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errors.general}
                    </div>
                )}
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => {
                                SetFormData({...formdata, email: e.target.value});
                                if (errors.email) setErrors({...errors, email: ""});
                            }}
                            name="email"
                            placeholder="Enter your email"
                            value={formdata.email}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                            style={{ 
                                'focus:ring-color': '#06D6A0',
                                '--tw-ring-color': '#06D6A0'
                            }}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => {
                                SetFormData({...formdata, password: e.target.value});
                                if (errors.password) setErrors({...errors, password: ""});
                            }}
                            name="password"
                            placeholder="Enter your password"
                            value={formdata.password}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition ${
                                errors.password ? 'border-red-500' : ''
                            }`}
                            style={{ 
                                'focus:ring-color': '#06D6A0',
                                '--tw-ring-color': '#06D6A0'
                            }}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ 
                            backgroundColor: '#06D6A0',
                            '--tw-ring-color': '#06D6A0',
                            ':hover': {
                                backgroundColor: '#05bf90'
                            }
                        }}
                    >
                        Sign In
                    </button>
                    <div className="text-center mt-4">
                        <a href="/signup" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#06D6A0' }}>
                            Don't have an account? Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;