import axios from "axios";

export async function getMaterials(){
    try {
        const response = await axios.get('http://localhost:3002/materials');
        return response.data
    }catch (e) {
        console.log(e)
        return [];
    }
}