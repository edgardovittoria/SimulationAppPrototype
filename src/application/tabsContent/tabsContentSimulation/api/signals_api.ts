import axios from "axios";
import {Signal} from "../../../../model/Port";
import {client} from "../../../../faunadb/client";
import faunadb from "faunadb";
import {FaunaResSignals} from "../../../../faunadb/responseModels";



export async function saveSignal(signal: Signal){
    try {
        await axios.post(`http://localhost:3002/signals`, signal);
    }catch (e) {
        console.log(e)
        return [];
    }
}