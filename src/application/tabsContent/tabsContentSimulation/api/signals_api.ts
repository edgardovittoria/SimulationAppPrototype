import axios from "axios";
import {Signal} from "../../../../model/Port";
import {client} from "../../../../faunadb/client";
import faunadb from "faunadb";
import {FaunaResSignals} from "../../../../faunadb/responseModels";

export async function getSignals(){

    const q = faunadb.query
    try {
        const response = await client.query(
            q.Map(q.Paginate(q.Documents(q.Collection('Signals'))), q.Lambda('doc', q.Get(q.Var('doc'))))
            //q.Paginate(q.Match(q.Ref('indexes/signals')))
        )
            //.then((res) => console.log(res))
            /*.then(res => {
                let data = (res as { data: [] }).data.map(ref => q.Get(ref))
                client.query(data).then(d => (d as {data: Signal[], ref: Object, ts: number}[]).forEach(v => console.log(v.data)))
            })*/
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return (response as FaunaResSignals).data.map(d => d.data)
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