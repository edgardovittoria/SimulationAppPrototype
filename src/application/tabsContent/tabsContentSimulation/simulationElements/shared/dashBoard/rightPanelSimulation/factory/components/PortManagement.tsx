import React, {useState} from 'react';
import {AiOutlineThunderbolt} from "react-icons/ai";
import {Port} from "../../../../../../../../../model/Project";
import {Modal} from "react-bootstrap";
import "./style/portManagement.css"

interface PortManagementProps {
    selectedPort: Port
}

export const PortManagement: React.FC<PortManagementProps> = ({selectedPort}) => {

    const [show, setShow] = useState(false);
    const [portType, setPortType] = useState(0);

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
            <div>
                <button
                    className="btn button-primary mb-2"
                    onClick={() => setShow(true)}
                >Choose the port type</button>
                {portType === 1 && <img src="portType1.png" alt="port type 1"/>}
                {portType === 2 && <img src="portType2.png" alt="port type 2"/>}
                {portType === 3 && <img src="portType3.png" alt="port type 3"/>}
                {portType === 4 && <img src="portType4.png" alt="port type 4"/>}
                {portType === 5 && <img src="portType5.png" alt="port type 5"/>}

            </div>
            <div className="mt-2">
                <span>First Position (X,Y,Z)</span>
                <div className="row mt-2">
                    <div className="col-3"><input className="w-100" type="number"/></div>
                    <div className="col-3"><input className="w-100" type="number"/></div>
                    <div className="col-3"><input className="w-100" type="number"/></div>
                </div>

            </div>
            <div className="mt-2">
                <span>Last Position (X,Y,Z)</span>
                <div className="row mt-2">
                    <div className="col-3"><input className="w-100" type="number"/></div>
                    <div className="col-3"><input className="w-100" type="number"/></div>
                    <div className="col-3"><input className="w-100" type="number"/></div>
                </div>
            </div>

            <div className="mt-2">
                <span>Impedance</span>
                <input className="w-100" type="number"/>
            </div>

            <div className="mt-2">
                <span>Resistance</span>
                <input className="w-100" type="number"/>
            </div>

            <div className="mt-2">
                <span>Capacitance</span>
                <input className="w-100" type="number"/>
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
                                setPortType(1)
                                setShow(false)
                            }}
                        >
                            <img src="portType1.png" alt="img"/>
                        </div>
                        <div
                            className="col-4 text-center portTypeBox"
                            onClick={() => {
                                setPortType(2)
                                setShow(false)
                            }}
                        >
                            <img src="portType2.png" alt="img"/>
                        </div>
                        <div
                            className="col-4 text-center portTypeBox"
                            onClick={() => {
                                setPortType(3)
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
                                setPortType(4)
                                setShow(false)
                            }}
                        >
                            <img src="portType4.png" alt="img"/>
                        </div>
                        <div
                            className="col-6 text-center portTypeBox"
                            onClick={() => {
                                setPortType(5)
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