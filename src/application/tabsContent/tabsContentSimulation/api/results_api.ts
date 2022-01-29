import axios from "axios";

export async function getResults(simulationName: string){
    try {
        const response = await axios.get(`http://localhost:3001/simulation?simulationName=${simulationName}`);
        return response.data[0]
    }catch (e) {
        console.log(e)
        return [];
    }
}