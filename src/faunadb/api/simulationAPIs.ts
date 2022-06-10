import { Simulation } from "../../model/Simulation";
import {client, q} from "../client";

export const getSimulationByName = async (name: string) => {
    try {
        const response = await client.query(
            q.Select("data", q.Get(q.Match(q.Index('simulation_by_name'), name)))
        )
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
        return response as Simulation
    }catch (e) {
        console.log(e)
        return {} as Simulation;
    }
}