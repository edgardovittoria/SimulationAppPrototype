import React from 'react';
import {Project} from "../../../../../../../../model/Project";
import {GiPowerButton} from "react-icons/gi";
import {Simulation} from "../../../../../../../../model/Simulation";

interface ResultsProps {
    selectedProject: Project | undefined,
    setSelectedSimulation: Function,
    selectedSimulation: Simulation | undefined
}

export const Results: React.FC<ResultsProps> = ({selectedProject, setSelectedSimulation, selectedSimulation}) => {
    (selectedProject && !selectedSimulation) && setSelectedSimulation(selectedProject.simulations[0])
    return(
        <>
            {(selectedProject && selectedProject.simulations.length > 0)
                ? <div className="leftPanel modelContainer p-4">
                    {selectedProject.simulations.map(sim => {
                        return(
                            <div
                                className={(selectedSimulation && sim.name === selectedSimulation.name) ? "row mb-2 simulationItem simulationItemSelected": "row mb-2 simulationItem"} key={sim.name}
                                onClick={() => {setSelectedSimulation(sim)}}
                            >
                                <div className="col-1">
                                    <GiPowerButton color={'#00ae52'} style={{width: "20px", height: "20px"}}/>
                                </div>
                                <div className="col-6 ps-0">
                                    {sim.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
                : <div className="leftPanel modelContainer">
                    <img src="/noResultsIcon.png" style={{marginTop: "100px"}}/>
                    <h5>No results to view</h5>
                    <p style={{marginTop: "50px"}}>Complete a study setup with CAD, materials, and physics, then Estimate and Run to generate results.</p>
                </div>
            }
        </>
    )

}