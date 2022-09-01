import React from 'react';

import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface ModelerProps {
}

export const Modeler: React.FC<ModelerProps> = ({children}) => {

    const selectedProject = useSelector(selectedProjectSelector)

    return(
        <>
            {(selectedProject && selectedProject.model.components !== undefined)
                ? <div className="rounded bg-white p-[10px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max text-center">
                    {children}
                </div>
                : <div className="rounded bg-white text-center p-[10px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max">
                    <img src="/noModelsIcon.png" className="mt-[50px] mx-auto"/>
                    <h5>No Model</h5>
                    <p className="mt-[50px]">Use the icon from the Tool Bar <br/> to import a 3D CAD File.
                    </p>
                </div>
            }
        </>
    )

}