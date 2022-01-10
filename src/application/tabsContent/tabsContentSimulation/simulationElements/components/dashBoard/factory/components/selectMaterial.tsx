import React from 'react';
import {ComponentEntity} from "@Draco112358/cad-library";
import {Dropdown} from "react-bootstrap";
import {allowedMaterial, Material} from "../../../../../../../../model/Material";
import {FaCircle} from "react-icons/fa";

interface SelectMaterialProps {
    selectedComponent: ComponentEntity[],
    assignMaterial: Function,
    resetSelectedComponentsArray: Function
}

export const SelectMaterial: React.FC<SelectMaterialProps> = (
    {selectedComponent, assignMaterial, resetSelectedComponentsArray}
) => {
    return(
        <>
            <h5>Select Material</h5>
            <Dropdown>
                <Dropdown.Toggle className="dropdownSelect"  id="dropdown-basic">
                    Select Material
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {allowedMaterial.map((material, index) => {
                        return (
                            <Dropdown.Item key={index} onClick={() => {
                                selectedComponent.forEach(component => {
                                    let materialToAssign: Material = {
                                        ...material,
                                        associatedComponentKey: component.keyComponent
                                    }
                                    assignMaterial(materialToAssign)
                                })
                                resetSelectedComponentsArray();
                            }}>
                                <div className="row">
                                    <div className="col-2 pe-0 ps-0">
                                        <FaCircle color={material.color} />
                                    </div>
                                    <div className="col-6 text-start ps-0">
                                        <h5 className="fw-normal mb-0">{material.name}</h5>
                                    </div>
                                </div>
                            </Dropdown.Item>

                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )

}