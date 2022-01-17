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
                    {allowedMaterial.map((material) => {
                        return (
                            <Dropdown.Item key={material.name} onClick={() => {
                                selectedComponent.forEach(component => {
                                    let materialToAssign = {
                                        material: material,
                                        keyComponent: component.keyComponent
                                    }
                                    assignMaterial(materialToAssign)
                                })
                                resetSelectedComponentsArray();
                            }}>
                                <div className="flex-column" key={material.name}>
                                    <i className="fa fa-circle fa-xs" style={{color: material.color}}/>
                                    <span className="fw-normal ms-2">{material.name}</span>
                                </div>
                            </Dropdown.Item>

                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )

}