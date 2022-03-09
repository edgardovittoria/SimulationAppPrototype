import React, { useState } from 'react';
import {NavDropdown, Nav} from "react-bootstrap";
import css from "./selectPorts.module.css";
import {AiOutlineThunderbolt} from "react-icons/ai";
import {BsArrowDownShort} from "react-icons/bs";
import { Project } from "../../../../../../../model/Project";
import {Port, RLCParams} from "../../../../../../../model/Port";
import { CircleGeometryAttributes, ComponentEntity, TransformationParams } from '@Draco112358/cad-library';

interface SelectPortsProps {
    addPorts: Function,
    selectedProject: Project
}

export const SelectPorts: React.FC<SelectPortsProps> = ({addPorts, selectedProject}) => {
    const [keyPort, setKeyPort] = useState(selectedProject.ports.length)
    const generateNewKeyPort = (key: number) => {
        setKeyPort(key+1)
        return key+1
    }
    return(
        <>
            < div className={css.selectPortsContainer}>
                <div className={css.selectPorts}>
                    <NavDropdown
                        title={
                            <div className="row py-1">
                                <div className="col-2 ps-0">
                                    <AiOutlineThunderbolt color={'#00ae52'} style={{width: "20px", height: "20px"}}/>
                                </div>
                                <div className="col-5 text-black">
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
                                rlcParams: {} as RLCParams,
                                associatedSignal: undefined
                            }
                            addPorts(port)
                        }}>
                            <div className={css.dropdownItem}>
                                <span>Port</span>
                            </div>
                        </Nav.Link>
                        <Nav.Link onClick={() => {}}>
                            <div className={css.dropdownItem}>
                                <span>Lumped</span>
                            </div>
                        </Nav.Link>
                        <Nav.Link onClick={() => {}}>
                            <div className={css.dropdownItem}>
                                <span>Probe</span>
                            </div>
                        </Nav.Link>
                    </NavDropdown>
                </div>
            </div>
        </>
    )

}