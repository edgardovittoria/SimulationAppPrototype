import React from 'react';
import {NavDropdown, Nav} from "react-bootstrap";
import "./selectPorts.css"
import {AiOutlineThunderbolt} from "react-icons/ai";
import {Port} from "../../../../../../../model/Project";

interface SelectPortsProps {
    addPorts: Function
}

export const SelectPorts: React.FC<SelectPortsProps> = ({addPorts}) => {
    return(
        <>
            < div className="selectPortsContainer">
                <div className="selectPorts">
                    <NavDropdown
                        title={<AiOutlineThunderbolt color={'#00ae52'} style={{width: "20px", height: "20px"}}/>}
                        menuVariant="light"
                    >
                        <Nav.Link onClick={() => {
                            let port: Port = {
                                name: 'port'+Math.floor(Math.random() * 10),
                                type: 'port',
                                position: {
                                    first: [-2.5, 2.5, 0],
                                    last: [2.5, 2.5, 0]
                                },
                                isSelected: false
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