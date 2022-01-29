import React from 'react';
import {Project} from "../../../../../../../../model/Project";

interface SimulatorProps {
    selectedProject: Project | undefined
}

export const Simulator: React.FC<SimulatorProps> = ({selectedProject}) => {
    return(
        <>
            {(selectedProject && selectedProject.materials.length > 0 && selectedProject.physics !== "")
                ? <div className="leftPanel modelContainer">
                    Simulator
                </div>
                : <div className="leftPanel modelContainer">
                    <img src="/noSimulationsIcon.png" style={{marginTop: "100px"}}/>
                    <h5>No Simulations</h5>
                    <p style={{marginTop: "50px"}}>Assign materials, apply physics, and start your first
                        simulation. </p>
                </div>
            }
        </>
    )

}