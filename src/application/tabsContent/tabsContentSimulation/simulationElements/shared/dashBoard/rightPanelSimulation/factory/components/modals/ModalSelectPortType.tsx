import React from 'react';
import {Modal} from "react-bootstrap";
import {Port} from "../../../../../../../../../../model/Project";

interface ModalSelectPortTypeProps {
    show: boolean,
    setShow: Function,
    selectedPort: Port,
    setPortType: Function
}

export const ModalSelectPortType: React.FC<ModalSelectPortTypeProps> = (
    {
        show, setShow, selectedPort, setPortType
    }
) => {
    return(
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
    )

}