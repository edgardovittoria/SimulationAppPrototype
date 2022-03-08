import axios from "axios";
import {Signal} from "../../../../model/Port";

export async function getSignals(){
    try {
        const response = await axios.get(`http://localhost:3002/signals`);
        return response.data
    }catch (e) {
        console.log(e)
        return [];
    }
}

export async function saveSignal(signal: Signal){
    try {
        await axios.post(`http://localhost:3002/signals`, signal);
    }catch (e) {
        console.log(e)
        return [];
    }
}