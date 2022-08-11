import React from 'react';
import {Project} from "../../../../../../../../model/Project";

import css from "./style/modeler.module.css";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface ModelerProps {
}

export const Modeler: React.FC<ModelerProps> = ({children}) => {

    const selectedProject = useSelector(selectedProjectSelector)

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