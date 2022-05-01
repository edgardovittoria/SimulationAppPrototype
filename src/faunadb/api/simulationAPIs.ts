import {client, q} from "../client";
import {FaunaResSimulation} from "../responseModels";

export const getSimulationByName = async (name: string) => {
    try {
        const response = await client.query(
            q.Get(q.Match(q.Index('simulation_by_name'), name))
        )
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return (response as FaunaResSimulation)
    }catch (e) {
        console.log(e)
        return {} as FaunaResSimulation;
    }
}