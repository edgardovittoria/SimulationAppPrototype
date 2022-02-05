import React from 'react';
import {ComponentEntity, Material} from "@Draco112358/cad-library";
import {Dropdown} from "react-bootstrap";

interface SelectMaterialProps {
    selectedComponent: ComponentEntity[],
    assignMaterial: Function,
    resetSelectedComponentsArray: Function,
    availableMaterials: Material[],
}

export const SelectMaterial: React.FC<SelectMaterialProps> = (
    {selectedComponent, assignMaterial, resetSelectedComponentsArray, availableMaterials}
) => {
    return(
        <>
            {/* <h5>Materials</h5>
            <Dropdown>
                <Dropdown.Toggle className="dropdownSelect"  id="dropdown-basic">
                    Select Material
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {selectedComponent.map((component) => {
                        return (
                            <Dropdown.Item key={component.name}>
                                <div className="flex-column" key={material.name}>
                                    <i className="fa fa-circle fa-xs" style={{color: component.material.color}}/>
                                    <span className="fw-normal ms-2">{componentmaterial.name}</span>
                                </div>
                            </Dropdown.Item>

                        )
                    })}
                </Dropdown.Menu>
            </Dropdown> */}
        </>
    )

}