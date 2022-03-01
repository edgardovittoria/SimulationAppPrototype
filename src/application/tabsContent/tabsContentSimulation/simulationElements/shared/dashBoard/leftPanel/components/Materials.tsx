import React from 'react';
import { FaCircle } from "react-icons/fa";
import { Project } from "../../../../../../../../model/Project";

interface MaterialsProps {
    selectedProject: Project | undefined
}

export const Materials: React.FC<MaterialsProps> = ({ selectedProject }) => {
    return (
        <>
            {(selectedProject) &&
                <div className="leftPanel modelContainer py-4 h-auto">
                    <ul className="list-unstyled mb-0">
                        {selectedProject.model.components && selectedProject.model.components.map((component) => {
                            return (
                                <li key={component.name} className="mt-2">
                                    <div className="row">
                                        <div className="col-2 pe-0 ps-0">
                                            <FaCircle color={(component.material !== undefined) ? component.material.color : "gray"} />
                                        </div>
                                        <div className="col-6 text-start ps-0">
                                            <h5 className="fw-normal mb-0">{(component.material !== undefined) ? component.material.name : "No material"}</h5>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </>
    )

}