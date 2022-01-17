import React, {useEffect, useState} from 'react';
import {Material} from "../../../../../../../../model/Material";
import './simulationPanel.css'
import {Accordion, Modal} from "react-bootstrap";

interface SimulationPanelProps {
    materials: Omit<Material, 'associatedComponentKey'>[],
    physics: string[] //TODO: change type with the correct one,
    showSimulationModel: boolean,
    setShowSimulationModel: Function
}

export const SimulationPanel: React.FC<SimulationPanelProps> = (
    {materials, physics, showSimulationModel, setShowSimulationModel}
) => {

    //TODO: move this logic inside the TabContentSimulation Component
    const [simulationStarted, setSimulationStarted] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setSimulationStarted(true);
        }, 10000)
    }, []);



    function handleClose(){
        setShowSimulationModel(false)
    }

    return (
        <>
            <Modal show={showSimulationModel} onHide={handleClose} className="simulationModal">
                <Modal.Header>
                    <div className="row w-100 mx-0">
                        <div className="col-3 simulationModalTitle py-3 text-uppercase">Launcher</div>
                        <div className="col-9 py-3 text-uppercase">Simulations</div>
                    </div>

                </Modal.Header>
                <Modal.Body className="py-0">
                    <div className="row simulationPanelContainer mx-0 w-100">
                        <div className="col-3 simulationPanelMenu">
                            <Accordion>
                                <Accordion.Item eventKey="0" key={0}>
                                    <Accordion.Header>Materials</Accordion.Header>
                                    <Accordion.Body>
                                        {materials.map(material => {
                                            return (
                                                <div className="flex-column" key={material.name}>
                                                    <i className="fa fa-circle fa-xs" style={{color: material.color}}/>
                                                    <span className="fw-normal ms-2">{material.name}</span>
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
                        <div className="col-9 simulationPanelContent p-4">
                            <div className="row">
                                <div className="col-6">Name</div>
                                <div className="col-6">Status</div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-6 fw-bold">Simulation 1</div>
                                <div className="col-6">{simulationStarted ? 'Started' : 'Not Started'}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row w-100 my-0">
                        <div className="col-7 border-end py-4">
                            footer column 1
                        </div>
                        <div className="col-2 border-end py-4">
                            footer column 2
                        </div>
                        <div className="col-3 py-4">
                            <div className="flex-column">
                                <div className="spinner spinner-border me-3" style={{width: '20px', height: '20px'}}/>
                                {simulationStarted
                                    ? <span className="fw-bold">Simulating...</span>
                                    : <span className="fw-bold">Generating Mesh...</span>
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )

}