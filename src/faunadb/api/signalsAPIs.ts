import {client, q} from "../client";
import {FaunaResSignals} from "../responseModels";
import {Signal} from "../../model/Port";

export async function getSignals() {
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
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function saveSignal(newSignal: Signal) {
    try {
        await client.query((
            q.Create(
                q.Collection('Signals'),
                {
                    data: {
                        ...newSignal
                    }
                }
            )
        ))
    } catch (e) {
        console.log(e)
    }
}