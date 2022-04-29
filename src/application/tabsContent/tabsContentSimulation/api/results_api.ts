import {getSimulationByName} from "../../../../faunadb/api/simulationAPIs";

export async function getResults(simulationName: string){
        return await getSimulationByName(simulationName)
}