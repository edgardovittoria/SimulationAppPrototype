import React from 'react';
import {FaCircle} from "react-icons/fa";
import {Project} from "../../../../../../../../model/Project";

interface MaterialsProps {
    selectedProject: Project | undefined
}

export const Materials: React.FC<MaterialsProps> = ({selectedProject}) => {
    return (
        <>
            {(selectedProject && selectedProject.materials.length > 0)
                ? <div className="leftPanel modelContainer py-4 h-auto">
                    <ul className="list-unstyled mb-0">
                        {selectedProject.materials.map((material, index) => {
                            return (
                                <li key={index} className="mt-2">
                                    <div className="row">
                                        <div className="col-2 pe-0 ps-0">
                                            <FaCircle color={material.color}/>
                                        </div>
                                        <div className="col-6 text-start ps-0">
                                            <h5 className="fw-normal mb-0">{material.name}</h5>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                : <div className="leftPanel modelContainer">
                    <img src="/noMaterialsIcon.png" style={{marginTop: "100px"}}/>
                    <h5>No Materials assigned</h5>
                    <p style={{marginTop: "50px"}}>Select a part in the 3D View or the Model Tree and assign a
                        material to it from the Properties Panel.</p>
                </div>
            }
        </>
    )

}