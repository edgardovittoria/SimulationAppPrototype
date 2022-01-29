import React from 'react';
import './simulationPanel.css'
import {Modal} from "react-bootstrap";

interface SimulationPanelProps {
    showSimulationModel: boolean,
    setShowSimulationModel: Function
}

export const SimulationPanel: React.FC<SimulationPanelProps> = (
    {children, showSimulationModel, setShowSimulationModel}
) => {


    function handleClose() {
        setShowSimulationModel(false)
    }

    const [leftMenu, panelContent, panelFooter] = children as React.ReactNode[]

    return (
        <>

            <Modal show={showSimulationModel} className="simulationModal">
                <Modal.Header>
                    <div className="row w-100 mx-0">
                        <div className="col-3 simulationModalTitle py-3 text-uppercase">Launcher</div>
                        <div className="col-8 py-3 text-uppercase">Simulations</div>
                        <div className="col-1 d-flex justify-content-end">
                            <i className="fa fa-close mt-2" onClick={handleClose}/>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className="py-0">
                    <div className="row simulationPanelContainer mx-0 w-100">
                        {leftMenu}
                        {panelContent}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {panelFooter}
                </Modal.Footer>
            </Modal>
        </>
    )

}