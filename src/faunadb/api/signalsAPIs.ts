import { client, q } from "../client";
import { Signal } from "../../model/Port";

export async function getSignals() {
    try {
        const response = await client.query(
            q.Select("data",
                q.Map(
                    q.Paginate(q.Match(q.Index("signals_all"))),
                    q.Lambda("signal", q.Select("data", q.Get(q.Var("signal"))))
                )
            )
        )
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return response as Signal[]
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