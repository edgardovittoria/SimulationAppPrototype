import {useEffect, useState} from "react";
import {Simulation} from "../../../../model/Simulation";
import {getSimulationByName} from "../../../../faunadb/api/simulationAPIs";
import {ComponentEntity, Material, useFaunaQuery} from "cad-library";
import {updateFolderOrProject} from "../../../../faunadb/api/projectsFolderAPIs";
import {store} from "../../../../store/store";
import {Project} from "../../../../model/Project";
import {getMaterialListFrom} from "./auxiliaryFunctions/auxiliaryFunctions";

export const useRunSimulation =
    (
        showSimulationModel: boolean, createNewSimulation: Function, updateSimulation: Function,
        simulationsDone: Simulation[], associatedProject: Project | undefined, mesherOutput: undefined
    ) => {
        const [simulationStarted, setSimulationStarted] = useState<"notStarted" | "started" | "Completed">("notStarted");
        const [meshApproved, setMeshApproved] = useState(false);
        const [newSimulation, setNewSimulation] = useState<Simulation>({} as Simulation);
        const {execQuery} = useFaunaQuery()



        useEffect(() => {
            if (showSimulationModel && meshApproved) {
                setSimulationStarted("started");
                let simulation: Simulation = {
                    name: 'simulation' + (simulationsDone.length + 1).toString(),
                    started: Date.now().toLocaleString(),
                    ended: "",
                    results: [],
                    status: "Queued",
                    associatedProject: associatedProject?.name as string
                }
                createNewSimulation(simulation)
                setNewSimulation(simulation)
                let dataToSendToSolver = {
                    mesherOutput: mesherOutput,
                    ports: (associatedProject) && associatedProject.ports,
                    materials: (associatedProject?.model.components) && getMaterialListFrom(associatedProject?.model.components),
                    //frequencies: (project) && project.ports[0]
                    /*
                    * ogni porta ha il suo segnale associato dato da una lista di valori così fatti:
                    * {
                    *   freq: valore,
                    *   signal: {
                    *       Re: valore,
                    *       Im: valore
                    *   }
                    * }
                    * il dubbio è: bisogna passare esplicitamente il vettore delle frequenze ed i segnali,
                    * oppure basta passare le porte che hanno già l'informazione su frequenze e segnali?
                    * */
                }
                //TODO: add http request to execute the simulation
                /*
                * axios.post("url", dataToSendToSolver).then((res) => {
                *   save results on the store to visualize relative charts
                * })
                * */

                console.log(dataToSendToSolver)
                setTimeout(() => {
                    setSimulationStarted("Completed")
                    execQuery(getSimulationByName, simulation.name).then(res => {
                        console.log(res)
                        let simulationUpdated: Simulation = {
                            ...simulation,
                            results: [...(res.results)],
                            ended: Date.now().toString(),
                            status: "Completed"
                        }
                        updateSimulation(simulationUpdated);
                        execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {
                        })
                    })
                        .catch(() => {
                            //management of exceptions
                        });

                }, 5000)
            }
        }, [showSimulationModel, meshApproved]);

        return {simulationStarted, meshApproved, setMeshApproved, newSimulation}
    }