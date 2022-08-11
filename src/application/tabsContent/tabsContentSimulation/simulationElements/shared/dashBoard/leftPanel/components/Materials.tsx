import React from 'react';
import { FaCircle } from "react-icons/fa";
import { Project } from "../../../../../../../../model/Project";

import css from "./style/materials.module.css"
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface MaterialsProps {
}

export const Materials: React.FC<MaterialsProps> = ({}) => {

    const selectedProject = useSelector(selectedProjectSelector)

    return (
        <>
            {(selectedProject) &&
                <div className={`${css.leftPanel} ${css.modelContainer} py-4 h-auto`}>
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