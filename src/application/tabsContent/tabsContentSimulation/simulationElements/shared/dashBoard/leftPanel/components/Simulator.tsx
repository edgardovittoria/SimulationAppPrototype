import React from 'react';
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface SimulatorProps {
}

export const Simulator: React.FC<SimulatorProps> = ({}) => {

    const selectedProject = useSelector(selectedProjectSelector)

    return(
        <>
            {(selectedProject && selectedProject.model.components )
                ? <div className="rounded bg-white p-[15px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max text-center">
                    Simulator
                </div>
                : <div className="rounded bg-white p-[15px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max text-center">
                    <img src="/noSimulationsIcon.png" className="mx-auto mt-[50px]"/>
                    <h5>No Simulations</h5>
                    <p className="mt-[50px]">Assign materials, apply physics, and start your first
                        simulation. </p>
                </div>
            }
        </>
    )

}