import React from 'react';
import {Modal} from "react-bootstrap";

interface ModalSignalsProps {
    showModalSignal: boolean,
    setShowModalSignal: Function
}

export const ModalSignals: React.FC<ModalSignalsProps> = (
    {
        showModalSignal, setShowModalSignal
    }
) => {
    return(
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
    )

}