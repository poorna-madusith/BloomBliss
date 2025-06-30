import API from "../api";

export const signup = async (formData) => {
    try {
        const response = await API.post("/signup", formData);
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}


export const login = async (formData)=>{
    try{
        const response = await API.post("/login",formData);
        return response.data;
    }catch(error){
        console.error("Error during login:", error);
        throw error;
    }
}

export const getProfile = async () => {
    try{
        const response = await API.get("/profile");
        return response.data;
    }catch(error){
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export const updateProfile = async (formData) => {
    try{
        const response = await API.put("/profile",formData);
        return response.data;
    }catch(error){
        console.error("Error updating profile:", error);
        throw error;
    }
}