import React from 'react';
import {Project} from "../../../../../../../../model/Project";

import css from "./style/modeler.module.css";

interface ModelerProps {
    selectedProject: Project | undefined
}

export const Modeler: React.FC<ModelerProps> = ({selectedProject, children}) => {
    return(
        <>
            {(selectedProject && selectedProject.model.components !== undefined)
                ? <div className={`${css.leftPanel} ${css.modelContainer}`}>
                    {children}
                </div>
                : <div className={`${css.leftPanel} ${css.modelContainer}`}>
                    <img src="/noModelsIcon.png" className={css.noModelsIcon}/>
                    <h5>No Model</h5>
                    <p className={css.noModelsText}>Use the icon from the Tool Bar <br/> to import a 3D CAD File.
                    </p>
                </div>
            }
        </>
    )

}