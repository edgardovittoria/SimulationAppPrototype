import { ComponentEntity } from '@Draco112358/cad-library';
import React from 'react';
import {Accordion} from "react-bootstrap";

interface LeftMenuProps {
    components?: ComponentEntity[]
    physics: string[]
}

export const LeftMenu: React.FC<LeftMenuProps> = ({components, physics}) => {
    return(
        <div className="col-3 simulationPanelMenu">
            <Accordion>
                <Accordion.Item eventKey="0" key={0}>
                    <Accordion.Header>Materials</Accordion.Header>
                    <Accordion.Body>
                        { (components !== undefined) && components.map(component => {
                            return (
                                <div className="flex-column" key={component.name}>
                                    <i className="fa fa-circle fa-xs" style={{color: (component.material !== undefined) ? component.material.color : "gray"}}/>
                                    <span className="fw-normal ms-2">{(component.material !== undefined) ? component.material.name : "No material"}</span>
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