import React from 'react';
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";
import {FaCircle} from "react-icons/fa";

interface SimulatorProps {
    selectedMaterials: string[],
    setSelectedMaterials: Function
}

export const Simulator: React.FC<SimulatorProps> = (
    {
        selectedMaterials, setSelectedMaterials
    }
) => {

    const selectedProject = useSelector(selectedProjectSelector)


    return (
        <>
            {(selectedProject) &&
                <div className="rounded bg-white p-[10px] shadow-2xl absolute left-[2%] top-[200px] w-[300px] h-max text-center">
                    <ul className="ml-0 pl-3">
                        {selectedProject.model.components && selectedProject.model.components.map((component) => {
                            return (
                                <li key={component.name} className={(selectedMaterials.filter(sm => sm === component.material?.name)[0]) ? 'bg-gray-200 p-[3px] rounded mt-2' : 'hover:bg-gray-200 p-[3px] rounded mt-2'}
                                    onClick={() => {
                                        if(selectedMaterials.filter(sm => sm === component.material?.name)[0]){
                                            setSelectedMaterials(selectedMaterials.filter(sm => sm !== component.material?.name))
                                        }else{
                                            setSelectedMaterials([...selectedMaterials, component.material?.name as string])
                                        }

                                    }}
                                >
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