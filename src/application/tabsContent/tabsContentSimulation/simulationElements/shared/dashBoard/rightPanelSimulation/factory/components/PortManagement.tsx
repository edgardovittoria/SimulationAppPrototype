import React, {useState} from 'react';
import {AiOutlineThunderbolt} from "react-icons/ai";
import {Port, RLCParams} from "../../../../../../../../../model/Project";
import {Modal, Dropdown} from "react-bootstrap";

import "./style/portManagement.css"

interface PortManagementProps {
    selectedPort: Port,
    setPortType: Function,
    updatePortPosition: Function,
    setRLCParams: Function
}

export const PortManagement: React.FC<PortManagementProps> = ({
                                                                  selectedPort,
                                                                  setPortType,
                                                                  updatePortPosition,
                                                                  setRLCParams
                                                              }) => {

    const [show, setShow] = useState(false);
    const [showModalSignal, setShowModalSignal] = useState(false);
    const [selectedSignal, setSelectedSignal] = useState("");

    return (
        <div className="portManagementContainer">
            <div className="row">
                <div className="col-2 pe-0 ps-0">
                    <AiOutlineThunderbolt color={'#00ae52'}
                                          style={{width: "25px", height: "25px"}}/>
                </div>
                <div className="col-8 text-start ps-0">
                    <h5 className="fw-normal mb-0">{selectedPort.name}</h5>
                </div>
            </div>
            <hr/>
            <div className="choosePortTypeContainer">
                <button
                    className="btn button-primary mb-2 w-100"
                    onClick={() => setShow(true)}
                >Choose the port type
                </button>
                {selectedPort.type === 1 && <img src="portType1.png" alt="port type 1"/>}
                {selectedPort.type === 2 && <img src="portType2.png" alt="port type 2"/>}
                {selectedPort.type === 3 && <img src="portType3.png" alt="port type 3"/>}
                {selectedPort.type === 4 && <img src="portType4.png" alt="port type 4"/>}
                {selectedPort.type === 5 && <img src="portType5.png" alt="port type 5"/>}

            </div>
            <div className="mt-3 portPositionBox">
                <h6>Port Position</h6>
                <div className="mt-2">
                    <span>Input (X,Y,Z)</span>
                    <div className="row mt-2">
                        <div className="col-4">
                            <input
                                className="w-100 inputPortManagement form-control"
                                type="number"
                                step={.1}
                                value={selectedPort.inputElement.transformationParams.position[0]}
                                onChange={(event) => {
                                    let newPosition = [
                                        event.currentTarget.value,
                                        selectedPort.inputElement.transformationParams.position[1],
                                        selectedPort.inputElement.transformationParams.position[2]
                                    ]
                                    updatePortPosition({type: 'first', position: newPosition})
                                }}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                className="w-100 inputPortManagement form-control"
                                type="number"
                                step={.1}
                                value={selectedPort.inputElement.transformationParams.position[1]}
                                onChange={(event) => {
                                    let newPosition = [
                                        selectedPort.inputElement.transformationParams.position[0],
                                        event.currentTarget.value,
                                        selectedPort.inputElement.transformationParams.position[2]
                                    ]
                                    updatePortPosition({type: 'first', position: newPosition})
                                }}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                className="w-100 inputPortManagement form-control"
                                type="number"
                                step={.1}
                                value={selectedPort.inputElement.transformationParams.position[2]}
                                onChange={(event) => {
                                    let newPosition = [
                                        selectedPort.inputElement.transformationParams.position[0],
                                        selectedPort.inputElement.transformationParams.position[1],
                                        event.currentTarget.value
                                    ]
                                    updatePortPosition({type: 'first', position: newPosition})
                                }}
                            />
                        </div>
                    </div>

                </div>
                <div className="mt-2">
                    <span>Output (X,Y,Z)</span>
                    <div className="row mt-2">
                        <div className="col-4">
                            <input
                                className="w-100 inputPortManagement form-control"
                                type="number"
                                step={.1}
                                value={selectedPort.outputElement.transformationParams.position[0]}
                                onChange={(event) => {
                                    let newPosition = [
                                        event.currentTarget.value,
                                        selectedPort.outputElement.transformationParams.position[1],
                                        selectedPort.outputElement.transformationParams.position[2]
                                    ]
                                    updatePortPosition({type: 'last', position: newPosition})
                                }}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                className="w-100 inputPortManagement form-control"
                                type="number"
                                step={.1}
                                value={selectedPort.outputElement.transformationParams.position[1]}
                                onChange={(event) => {
                                    let newPosition = [
                                        selectedPort.outputElement.transformationParams.position[0],
                                        event.currentTarget.value,
                                        selectedPort.outputElement.transformationParams.position[2]
                                    ]
                                    updatePortPosition({type: 'last', position: newPosition})
                                }}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                className="w-100 inputPortManagement form-control"
                                type="number"
                                step={.1}
                                value={selectedPort.outputElement.transformationParams.position[2]}
                                onChange={(event) => {
                                    let newPosition = [
                                        selectedPort.outputElement.transformationParams.position[0],
                                        selectedPort.outputElement.transformationParams.position[1],
                                        event.currentTarget.value
                                    ]
                                    updatePortPosition({type: 'last', position: newPosition})
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>



            <div className="mt-3 portPositionBox">
                <h6>RLC Params</h6>
                <div className="mt-2">
                    <span>Resistance</span>
                    <input className="w-100 inputPortManagement form-control" type="number"
                           onChange={(event) => setRLCParams({
                               ...selectedPort.rlcParams,
                               resistance: parseFloat(event.currentTarget.value)
                           } as RLCParams)}/>
                </div>
                <div className="mt-2">
                    <span>Impedance</span>
                    <input className="w-100 inputPortManagement form-control" type="number"
                           onChange={(event) => setRLCParams({
                               ...selectedPort.rlcParams,
                               impedance: parseFloat(event.currentTarget.value)
                           } as RLCParams)
                           }/>
                </div>
                <div className="mt-2">
                    <span>Capacitance</span>
                    <input className="w-100 inputPortManagement form-control" type="number"
                           onChange={(event) => setRLCParams({
                               ...selectedPort.rlcParams,
                               capacitance: parseFloat(event.currentTarget.value)
                           } as RLCParams)}/>
                </div>
            </div>

            <div className="mt-4 portPositionBox">
                <div className="row">
                    <h6>Input Signal</h6>
                    <div className="col-4">
                        <select className="w-100" placeholder="Select Signal" onChange={(event) => {
                            setSelectedSignal(event.currentTarget.value)
                        }}>
                            <option value="undefined">UNDEFINED</option>
                            <option value="signal1">Signal 1</option>
                            <option value="signal2">Signal 2</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <button onClick={() => setShowModalSignal(true)} className="w-100">New Signal</button>
                    </div>
                    <div className="col-4">
                        <button className="w-100">Load Signal</button>
                    </div>
                    {selectedSignal !== "undefined" && <div>{selectedSignal}</div>}

                </div>
            </div>



            {/*<Dropdown>
                <Dropdown.Toggle className="dropdownSelect"  id="dropdown-basic">
                    Select Signal
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item key={1}>
                        <div className="flex-column" key={1}>
                            <i className="fa fa-circle fa-xs" style={{color: component.material.color}}/>
                            <span className="fw-normal ms-2">Signal 1</span>
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>*/}

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>SELECT PORT TYPE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div
                            className="col-4 text-center portTypeBox"
                            onClick={() => {
                                setPortType({name: selectedPort.name, type: 1})
                                setShow(false)
                            }}
                        >
                            <img src="portType1.png" alt="img"/>
                        </div>
                        <div
                            className="col-4 text-center portTypeBox"
                            onClick={() => {
                                setPortType({name: selectedPort.name, type: 2})
                                setShow(false)
                            }}
                        >
                            <img src="portType2.png" alt="img"/>
                        </div>
                        <div
                            className="col-4 text-center portTypeBox"
                            onClick={() => {
                                setPortType({name: selectedPort.name, type: 3})
                                setShow(false)
                            }}
                        >
                            <img src="portType3.png" alt="img"/>
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="col-6 text-center portTypeBox"
                            onClick={() => {
                                setPortType({name: selectedPort.name, type: 4})
                                setShow(false)
                            }}
                        >
                            <img src="portType4.png" alt="img"/>
                        </div>
                        <div
                            className="col-6 text-center portTypeBox"
                            onClick={() => {
                                setPortType({name: selectedPort.name, type: 5})
                                setShow(false)
                            }}
                        >
                            <img src="portType5.png" alt="img"/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showModalSignal} onHide={() => setShowModalSignal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>DEFINE NEW SIGNAL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        frequency vector
                    </div>
                    <div className="row">
                        signal value vector
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )

}