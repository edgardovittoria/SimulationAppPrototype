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
            {(selectedProject && selectedProject.model.components !== undefined) ?
                <div>
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
                </div> :
                <div className="text-center">
                    <img src="/noMaterialsIcon.png" className="mx-auto mt-[50px]"/>
                    <h5>No Materials</h5>
                    <p className="mt-[50px]">apply the materials on the model directly in the CAD</p>
                </div>
            }
        </>
    )

}