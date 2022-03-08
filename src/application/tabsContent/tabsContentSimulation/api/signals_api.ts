import axios from "axios";

export async function getSignals(){
    try {
        const response = await axios.get(`http://localhost:3002/signals`);
        return response.data
    }catch (e) {
        console.log(e)
        return [];
    }
}