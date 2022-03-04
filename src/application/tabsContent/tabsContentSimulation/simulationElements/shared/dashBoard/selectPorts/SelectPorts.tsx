import React, { useState } from 'react';
import {NavDropdown, Nav} from "react-bootstrap";
import "./selectPorts.css"
import {AiOutlineThunderbolt} from "react-icons/ai";
import {Port, RLCParams} from "../../../../../../../model/Project";
import { CircleGeometryAttributes, ComponentEntity, TransformationParams } from '@Draco112358/cad-library';

interface SelectPortsProps {
    addPorts: Function
}

export const SelectPorts: React.FC<SelectPortsProps> = ({addPorts}) => {
    const [keyPort, setKeyPort] = useState(0)
    const generateNewKeyPort = (key: number) => {
        setKeyPort(key+1)
        return key+1
    }
    return(
        <>
            < div className="selectPortsContainer">
                <div className="selectPorts">
                    <NavDropdown
                        title={
                            <div className="row">
                                <div className="col-2">
                                    <AiOutlineThunderbolt color={'#00ae52'} style={{width: "20px", height: "20px"}}/>
                                </div>
                                <div className="col-8 text-black">
                                    Add Port
                                </div>
                            </div>


                        }
                        menuVariant="light"
                    >
                        <Nav.Link onClick={() => {
                            let port: Port = {
                                name: "Port" + generateNewKeyPort(keyPort),
                                category: 'port',
                                type: 0,
                                inputElement: {
                                    type: "CIRCLE",
                                    keyComponent: 0,
                                    geometryAttributes: {
                                        radius: 0.05,
                                        segments: 10,
                                    } as CircleGeometryAttributes,
                                    name: "inputPort" + generateNewKeyPort(keyPort),
                                    orbitEnabled: false,
                                    transformationParams: {
                                        position : [-2.5,2.5,0],
                                        rotation : [0,0,0],
                                        scale: [1,1,1]
                                    } as TransformationParams,
                                    previousTransformationParams:  {
                                        position : [-2.5,2.5,0],
                                        rotation : [0,0,0],
                                        scale: [1,1,1]
                                    } as TransformationParams,       
                                } as ComponentEntity,
                                outputElement: {
                                    type: "CIRCLE",
                                    keyComponent: 0,
                                    geometryAttributes: {
                                        radius: 0.05,
                                        segments: 10,
                                    } as CircleGeometryAttributes,
                                    name: "outputPort" + generateNewKeyPort(keyPort),
                                    orbitEnabled: false,
                                    transformationParams: {
                                        position : [2.5,2.5,0],
                                        rotation : [0,0,0],
                                        scale: [1,1,1]
                                    } as TransformationParams,
                                    previousTransformationParams:  {
                                        position : [2.5,2.5,0],
                                        rotation : [0,0,0],
                                        scale: [1,1,1]
                                    } as TransformationParams,    
                                } as ComponentEntity,
                                isSelected: false,
                                rlcParams: {} as RLCParams
                            }
                            addPorts(port)
                        }}>
                            <div className="dropdownItem">
                                <span>Port</span>
                            </div>
                        </Nav.Link>
                        <Nav.Link onClick={() => {}}>
                            <div className="dropdownItem">
                                <span>Lumped</span>
                            </div>
                        </Nav.Link>
                        <Nav.Link onClick={() => {}}>
                            <div className="dropdownItem">
                                <span>Probe</span>
                            </div>
                        </Nav.Link>
                    </NavDropdown>
                </div>
            </div>
        </>
    )

}