import {client, q} from "../client";
import {FaunaResSignals} from "../responseModels";

export async function getSignals(){
    try {
        const response = await client.query(
            q.Map(q.Paginate(q.Documents(q.Collection('Signals'))), q.Lambda('doc', q.Get(q.Var('doc'))))
        )
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