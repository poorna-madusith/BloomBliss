import API from "../api";

export const getAllFlowers = async () => {
    try{
        const response = await API.get("/flowers/getflowers");
        return response.data;
    }catch(error){
        console.error("Error fetching flowers:", error);
        throw error;
    }
}

