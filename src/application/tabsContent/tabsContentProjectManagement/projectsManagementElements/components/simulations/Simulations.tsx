import React from 'react';
import css from "./simulations.module.css";
import {FaCheck, FaPauseCircle} from "react-icons/fa";
import {Simulation} from "../../../../../../model/Simulation";
import {TiDelete} from "react-icons/ti";
import {MdWatchLater} from "react-icons/md";
import {AiOutlineBarChart} from "react-icons/ai";
import {Project} from "../../../../../../model/Project";

interface SimulationsProps {
    projects: Project[],
    selectTab: Function,
    setSimulationCoreMenuItemSelected: Function,
    selectProject: Function,
    setSelectedSimulation: Function
}

export const Simulations: React.FC<SimulationsProps> = (
    {
        projects, selectTab, setSimulationCoreMenuItemSelected, selectProject, setSelectedSimulation
    }
) => {
    let simulations: Simulation[] = []
    projects.map(project => {
        project.simulations.map(simulation => simulations.push(simulation))
        return simulations
    })

    function showResultsIcon (id: string) {
        document.getElementById(id)?.setAttribute('style', 'visibility: visible')
    }
    function hideResultsIcon (id: string) {
        document.getElementById(id)?.setAttribute('style', 'visibility: hidden')
    }

    function factoryStatusIcon(status: string) {
        switch (status) {
            case "Completed":
                return <FaCheck color={'#1aa33c'}/>
            case "Failed":
                return <TiDelete color={'#ec0c0c'}/>
            case "Paused":
                return <FaPauseCircle color={'#ec0c0c'}/>
            case "Queued":
                return <MdWatchLater color={'#ffcc00'} />
            default :
                return <></>
        }
    }

    return (
        <div className={`box ${css.simulationsBox}`}>
            {simulations.length > 0
                ?
                <>
                    <h5 className="py-1">Simulations</h5>
                    <div className="px-3 overflow-scroll">
                        <table className="table mt-4">
                            <thead>
                                <tr>
                                    <th scope="col"/>
                                    <th scope="col">Name</th>
                                    <th scope="col">Started</th>
                                    <th scope="col">Ended</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Project</th>
                                    <th scope="col"/>
                                </tr>
                            </thead>
                            <tbody>
                            {simulations.map((simulation, index) => {
                                let statusIcon: JSX.Element = factoryStatusIcon(simulation.status)
                                return (
                                    <tr key={simulation.name}
                                        onMouseOver={() => showResultsIcon(index.toString())}
                                        onMouseOut={() => hideResultsIcon(index.toString())}
                                        className={css.simulationsTableRow}
                                    >
                                        <th scope="row" className="py-4">
                                            {statusIcon}
                                        </th>
                                        <td className="fw-bold py-4">{simulation.name}</td>
                                        <td className="py-4">{simulation.started}</td>
                                        <td className="py-4">{simulation.ended}</td>
                                        <td className="py-4">{simulation.status}</td>
                                        <td className="py-4">{simulation.associatedProject}</td>
                                        <td id={index.toString()} className={`py-4 ${css.simulationsResultIcon}`} style={{visibility: "hidden"}}>
                                            <AiOutlineBarChart color={'#00ae52'} style={{width: "30px", height: "30px"}}
                                                onClick={() => {
                                                    selectTab(simulation.associatedProject)
                                                    selectProject(simulation.associatedProject)
                                                    setSelectedSimulation(simulation)
                                                    setSimulationCoreMenuItemSelected('Results')
                                                }}
                                            />
                                        </td>
                                    </tr>

                                )
                            })}
                            </tbody>
                        </table>

                    </div>
                </>

                :
                <>
                    <h5>Simulations</h5>
                    <div className={css.simulationsNoResultsContainer}>
                        <img src="/noresultfound.png" className={css.simulationsNoResultsIcon} alt="No Results Icon"/>
                        <p>No results found</p>
                    </div>
                </>

            }
        </div>
    )
}