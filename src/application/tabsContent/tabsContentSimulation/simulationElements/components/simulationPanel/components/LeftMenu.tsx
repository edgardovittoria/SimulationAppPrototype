import React from 'react';
import {Accordion} from "react-bootstrap";
import {Material} from "../../../../../../../model/Material";

interface LeftMenuProps {
    assignedMaterials: Omit<Material, 'associatedComponentKey'>[],
    physics: string[]
}

export const LeftMenu: React.FC<LeftMenuProps> = ({assignedMaterials, physics}) => {
    return(
        <div className="col-3 simulationPanelMenu">
            <Accordion>
                <Accordion.Item eventKey="0" key={0}>
                    <Accordion.Header>Materials</Accordion.Header>
                    <Accordion.Body>
                        {assignedMaterials.map(material => {
                            return (
                                <div className="flex-column" key={material.name}>
                                    <i className="fa fa-circle fa-xs" style={{color: material.color}}/>
                                    <span className="fw-normal ms-2">{material.name}</span>
                                </div>
                            )
                        })}
                    </Accordion.Body>
                </Accordion.Item>
                <hr className="my-0"/>
                <Accordion.Item eventKey="1" key={1}>
                    <Accordion.Header>Physics</Accordion.Header>
                    <Accordion.Body>
                        {physics.map(physic => {
                            return (
                                <div className="flex-column" key={physic}>
                                    <i className="fa fa-circle fa-xs"/>
                                    <span className="fw-normal ms-2">{physic}</span>
                                </div>
                            )
                        })}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )

}