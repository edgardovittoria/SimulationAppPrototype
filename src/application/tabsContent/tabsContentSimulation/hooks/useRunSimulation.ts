import {useEffect, useState} from "react";
import {Simulation} from "../../../../model/Simulation";
import {getResults} from "../api/results_api";

export const useRunSimulation = (showSimulationModel: boolean, createNewSimulation: Function, updateSimulation: Function, simulationsDone: Simulation[]) => {
    const [simulationStarted, setSimulationStarted] = useState<"notStarted" | "started" | "Completed">("notStarted");
    const [meshApproved, setMeshApproved] = useState(false);
    let simulationName = 'simulation'+(simulationsDone.length + 1).toString()
    let newSimulation: Simulation = {
        name: simulationName,
        started: Date.now().toLocaleString(),
        ended: "",
        results: [],
        status: "Queued"
    }
    useEffect(() => {
        if (showSimulationModel && meshApproved) {
            setSimulationStarted("started");
            createNewSimulation(newSimulation)
            //TODO: add request to the server to do the simulation and manage the response
            setTimeout(() => {
                setSimulationStarted("Completed")

                getResults(newSimulation.name).then(res => {
                    let simulationUpdated: Simulation = {
                        ...newSimulation,
                        results: [...res.results],
                        ended: Date.now().toString(),
                        status: "Completed"
                    }
                    updateSimulation(simulationUpdated);
                })
                    .catch(() => {
                        let simulationUpdated: Simulation = {
                            ...newSimulation,
                            results: [],
                            ended: Date.now().toString(),
                            status: "Failed"
                        }
                        updateSimulation(simulationUpdated);
                    });

            }, 5000)
        }
    }, [showSimulationModel, meshApproved]);

    return {simulationStarted, meshApproved, setMeshApproved, newSimulation}
}