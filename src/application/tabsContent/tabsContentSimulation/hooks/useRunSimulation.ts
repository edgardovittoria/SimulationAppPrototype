import {useEffect, useState} from "react";
import {Simulation} from "../../../../model/Simulation";
import {getSimulationByName} from "../../../../faunadb/api/simulationAPIs";
import {FaunaResSimulation} from "../../../../faunadb/responseModels";

export const useRunSimulation =
    (
        showSimulationModel: boolean, createNewSimulation: Function, updateSimulation: Function,
        simulationsDone: Simulation[], associatedProject: string
    ) => {
    const [simulationStarted, setSimulationStarted] = useState<"notStarted" | "started" | "Completed">("notStarted");
    const [meshApproved, setMeshApproved] = useState(false);
    const [newSimulation, setNewSimulation] = useState<Simulation>({} as Simulation);
    useEffect(() => {
        if (showSimulationModel && meshApproved) {
            setSimulationStarted("started");
            let simulation: Simulation = {
                name: 'simulation'+(simulationsDone.length + 1).toString(),
                started: Date.now().toLocaleString(),
                ended: "",
                results: [],
                status: "Queued",
                associatedProject: associatedProject
            }
            createNewSimulation(simulation)
            setNewSimulation(simulation)
            //TODO: add request to the server to do the simulation and manage the response
            setTimeout(() => {
                setSimulationStarted("Completed")

                getSimulationByName(simulation.name).then(res => {
                    console.log(res)
                    let simulationUpdated: Simulation = {
                        ...simulation,
                        results: [...(res.data as Simulation).results],
                        ended: Date.now().toString(),
                        status: "Completed"
                    }
                    updateSimulation(simulationUpdated);
                })
                    .catch(() => {
                        let simulationUpdated: Simulation = {
                            ...simulation,
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