import React from 'react';
import {Project} from "../../../../../../../../model/Project";

interface ModelerProps {
    selectedProject: Project | undefined
}

export const Modeler: React.FC<ModelerProps> = ({selectedProject, children}) => {
    return(
        <>
            {(selectedProject && selectedProject.model.components !== undefined)
                ? <div className="leftPanel modelContainer">
                    {children}
                </div>
                : <div className="leftPanel modelContainer">
                    <img src="/noModelsIcon.png" style={{marginTop: "100px"}}/>
                    <h5>No Model</h5>
                    <p style={{marginTop: "50px"}}>Use the icon from the Tool Bar <br/> to import a 3D CAD File.
                    </p>
                </div>
            }
        </>
    )

}