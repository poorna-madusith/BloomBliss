import API from "../api";

export const signup = async (formData) => {
    try {
        const response = await API.post("/api/auth/signup", formData);
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}


export const login = async (formData)=>{
    try{
        const response = await API.post("/api/auth/login",formData);
        return response.data;
    }catch(error){
        console.error("Error during login:", error);
        throw error;
    }
}

export const getProfile = async () => {
    try{
        const response = await API.get("/api/auth/profile");
        return response.data;
    }catch(error){
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export const updateProfile = async (formData) => {
    try{
        const response = await API.put("/api/auth/profile",formData);
        return response.data;
    }catch(error){
        console.error("Error updating profile:", error);
        throw error;
    }
}

export const getusercount = async () => {
    try{
        const response = await API.get("/api/auth/usercount");
        return response.data.count;
    }catch(error){
        console.error("Error fetching user count:", error);
        throw error;
    }
}