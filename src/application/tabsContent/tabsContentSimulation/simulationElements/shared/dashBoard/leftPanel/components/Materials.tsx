import React from 'react';
import { FaCircle } from "react-icons/fa";
import { Project } from "../../../../../../../../model/Project";

import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";

interface MaterialsProps {
}

export const Materials: React.FC<MaterialsProps> = ({}) => {

    const selectedProject = useSelector(selectedProjectSelector)

    return (
        <>
            {(selectedProject) &&
                <div className="rounded bg-white p-[10px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max text-center">
                    <ul className="ml-0 pl-3">
                        {selectedProject.model.components && selectedProject.model.components.map((component) => {
                            return (
                                <li key={component.name} className="mt-2">
                                    <div className="flex">
                                        <div className="flex w-[10%] items-center">
                                            <FaCircle color={(component.material !== undefined) ? component.material.color : "gray"} />
                                        </div>
                                        <div className="w-[80%] text-left flex items-center">
                                            <h6 className="mb-0 text-[18px] font-normal">{(component.material !== undefined) ? component.material.name : "No material"}</h6>
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