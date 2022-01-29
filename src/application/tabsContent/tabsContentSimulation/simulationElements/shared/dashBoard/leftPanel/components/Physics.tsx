import React from 'react';
import {Project} from "../../../../../../../../model/Project";

interface PhysicsProps {
    selectedProject: Project | undefined
}

export const Physics: React.FC<PhysicsProps> = ({selectedProject}) => {
    return(
        <>
            {(selectedProject && selectedProject.physics !== "")
                ? <div className="leftPanel modelContainer">
                    Physics
                </div>
                : <div className="leftPanel modelContainer">
                    <img src="/noPhysicsIcon.png" style={{marginTop: "100px"}}/>
                    <h5>No Physics applied</h5>
                    <p style={{marginTop: "50px"}}>Select a tool from the Physics Toolbar and apply it to
                        geometry in the 3D View.</p>
                </div>
            }
        </>
    )

}