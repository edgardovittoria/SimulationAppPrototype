import React from 'react';
import {GiPowerButton} from "react-icons/gi";
import {Simulation} from "../../../../../../../../model/Simulation";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface ResultsProps {
    setSelectedSimulation: Function,
    selectedSimulation: Simulation | undefined
}

export const Results: React.FC<ResultsProps> = ({setSelectedSimulation, selectedSimulation}) => {

    const selectedProject = useSelector(selectedProjectSelector);
    (selectedProject && !selectedSimulation) && setSelectedSimulation(selectedProject.simulations[0])

    return(
        <>
            {(selectedProject && selectedProject.simulations.length > 0)
                ? <div className="rounded bg-white p-[15px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max text-center">
                    {selectedProject.simulations.map(sim => {
                        return(
                            <div
                                className={(selectedSimulation && sim.name === selectedSimulation.name) ? `flex mb-2 p-[5px] hover:cursor-pointer hover:bg-gray-200 bg-gray-200`: `flex mb-2 p-[5px]  hover:cursor-pointer hover:bg-gray-200`} key={sim.name}
                                onClick={() => {setSelectedSimulation(sim)}}
                            >
                                <div className="w-[12%] flex items-center">
                                    <GiPowerButton color={'#00ae52'} style={{width: "20px", height: "20px"}}/>
                                </div>
                                <div className="w-[90%] text-left">
                                    {sim.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
                : <div className="rounded bg-white p-[10px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max text-center">
                    <img src="/noResultsIcon.png" className="mx-auto mt-[50px]"/>
                    <h5>No results to view</h5>
                    <p className="mt-[50px]">Complete a study setup with CAD, materials, and physics, then Estimate and Run to generate results.</p>
                </div>
            }
        </>
    )

}