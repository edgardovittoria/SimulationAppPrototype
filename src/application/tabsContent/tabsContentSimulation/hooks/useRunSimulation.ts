import {useEffect, useState} from "react";
import {Simulation} from "../../../../model/Simulation";
import {getSimulationByName} from "../../../../faunadb/api/simulationAPIs";
import {ComponentEntity, useFaunaQuery} from "cad-library";
import {Project} from "../../../../model/Project";
import {getMaterialListFrom} from "./auxiliaryFunctions/auxiliaryFunctions";
import {useDispatch, useSelector} from "react-redux";
import {createSimulation, simulationSelector, updateSimulation} from "../../../../store/projectSlice";
import {MesherOutput} from "../../../../model/MesherInputOutput";
import {exportSolverJson} from "../../../../importExport/exportFunctions";
import {SignalValues} from "../../../../model/Port";

export const useRunSimulation =
    (
        showSimulationModel: boolean, associatedProject: Project | undefined,
        mesherOutput: MesherOutput | undefined
    ) => {

        const dispatch = useDispatch()
        const simulations = useSelector(simulationSelector)
        const [simulationStarted, setSimulationStarted] = useState<"notStarted" | "started" | "Completed">("notStarted");
        const [meshApproved, setMeshApproved] = useState(false);
        const [newSimulation, setNewSimulation] = useState<Simulation>({} as Simulation);
        const {execQuery} = useFaunaQuery()



        useEffect(() => {
            if (showSimulationModel && meshApproved) {
                setSimulationStarted("started");
                let simulation: Simulation = {
                    name: associatedProject?.name + ' - sim' + ((simulations as Simulation[]).length + 1).toString(),
                    started: Date.now().toString(),
                    ended: "",
                    results: [],
                    status: "Queued",
                    associatedProject: associatedProject?.name as string
                }
                dispatch(createSimulation(simulation))
                setNewSimulation(simulation)

                let frequencyArray: number[] = []
                if(associatedProject) associatedProject.signal?.signalValues.forEach(sv => frequencyArray.push(sv.freq))

                let signalsValuesArray: { Re: number; Im: number; }[] = []
                if(associatedProject) associatedProject.signal?.signalValues.forEach(sv => signalsValuesArray.push(sv.signal))

                let dataToSendToSolver = {
                    mesherOutput: mesherOutput,
                    ports: (associatedProject) && associatedProject.ports,
                    materials: getMaterialListFrom(associatedProject?.model.components as ComponentEntity[]),
                    frequencies: frequencyArray,
                    signals: signalsValuesArray,
                    powerPort: (associatedProject) && associatedProject.signal?.powerPort
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
                exportSolverJson(dataToSendToSolver)
                setTimeout(() => {
                    setSimulationStarted("Completed")
                    execQuery(getSimulationByName, 'simulation1').then(res => {
                        let simulationUpdated: Simulation = {
                            ...simulation,
                            results: [...(res.results)],
                            ended: Date.now().toString(),
                            status: "Completed"
                        }
                        dispatch(updateSimulation(simulationUpdated))
                    })
                        .catch(() => {
                            //management of exceptions
                        });

                }, 5000)
            }
        }, [showSimulationModel, meshApproved]);

        return {simulationStarted, meshApproved, setMeshApproved, newSimulation}
    }