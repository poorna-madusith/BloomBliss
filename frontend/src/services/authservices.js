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