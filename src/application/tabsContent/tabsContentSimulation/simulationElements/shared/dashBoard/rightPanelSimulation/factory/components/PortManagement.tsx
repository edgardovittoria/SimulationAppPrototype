import React, {ChangeEvent, useState} from 'react';
import {AiOutlineThunderbolt} from "react-icons/ai";
import {Port} from "../../../../../../../../../model/Project";
import {Modal} from "react-bootstrap";
import "./style/portManagement.css"

interface PortManagementProps {
    selectedPort: Port,
    setPortType: Function,
    updatePortPosition: Function
}

export const PortManagement: React.FC<PortManagementProps> = ({selectedPort, setPortType, updatePortPosition}) => {

    const [show, setShow] = useState(false);

    return(
        <>
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
                >Choose the port type</button>
                {selectedPort.type === 1 && <img src="portType1.png" alt="port type 1"/>}
                {selectedPort.type === 2 && <img src="portType2.png" alt="port type 2"/>}
                {selectedPort.type === 3 && <img src="portType3.png" alt="port type 3"/>}
                {selectedPort.type === 4 && <img src="portType4.png" alt="port type 4"/>}
                {selectedPort.type === 5 && <img src="portType5.png" alt="port type 5"/>}

            </div>
            <div className="mt-2">
                <span>First Position (X,Y,Z)</span>
                <div className="row mt-2">
                    <div className="col-4">
                        <input
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.position.first[0]}
                            onChange={(event) => {
                                let newPosition = [
                                    event.currentTarget.value,
                                    selectedPort.position.first[1],
                                    selectedPort.position.first[2]
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
                            value={selectedPort.position.first[1]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.position.first[0],
                                    event.currentTarget.value,
                                    selectedPort.position.first[2]
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
                            value={selectedPort.position.first[2]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.position.first[0],
                                    selectedPort.position.first[1],
                                    event.currentTarget.value
                                ]
                                updatePortPosition({type: 'first', position: newPosition})
                            }}
                        />
                    </div>
                </div>

            </div>
            <div className="mt-2">
                <span>Last Position (X,Y,Z)</span>
                <div className="row mt-2">
                    <div className="col-4">
                        <input
                            className="w-100 inputPortManagement form-control"
                            type="number"
                            step={.1}
                            value={selectedPort.position.last[0]}
                            onChange={(event) => {
                                let newPosition = [
                                    event.currentTarget.value,
                                    selectedPort.position.last[1],
                                    selectedPort.position.last[2]
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
                            value={selectedPort.position.last[1]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.position.last[0],
                                    event.currentTarget.value,
                                    selectedPort.position.last[2]
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
                            value={selectedPort.position.last[2]}
                            onChange={(event) => {
                                let newPosition = [
                                    selectedPort.position.last[0],
                                    selectedPort.position.last[1],
                                    event.currentTarget.value
                                ]
                                updatePortPosition({type: 'last', position: newPosition})
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <span>Impedance</span>
                <input className="w-100 inputPortManagement form-control" type="number"/>
            </div>

            <div className="mt-2">
                <span>Resistance</span>
                <input className="w-100 inputPortManagement form-control" type="number"/>
            </div>

            <div className="mt-2">
                <span>Capacitance</span>
                <input className="w-100 inputPortManagement form-control" type="number"/>
            </div>

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
        </>
    )

}