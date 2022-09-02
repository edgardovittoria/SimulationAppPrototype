import React from 'react';
import {Modal} from "react-bootstrap";
import {SignalChart} from "../inputSignalManagement/components/inputSignal/components/SignalChart";
import {Signal} from "../../../../../../../../../../model/Port";
import {Project} from "../../../../../../../../../../model/Project";

interface ModalInputSignalProps {
    show: boolean,
    setShow: Function,
    selectedProject: Project
}

export const ModalInputSignal: React.FC<ModalInputSignalProps> = (
    {
        show, setShow, selectedProject
    }
) => {

    return(
        <Modal show={show} onHide={() => setShow(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{(selectedProject.signal) && selectedProject.signal.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row justify-content-center text-center py-3 h-50">
                    <div className="w-[50%] h-[200px] overflow-scroll p-[10px] bg-[#f6f6f6] shadow-xl">
                        <table className="w-100">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Frequency</th>
                                <th>Signal(Re+Im)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(selectedProject.signal) &&
                                selectedProject.signal.signalValues.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{row.freq}</td>
                                        <td>{row.signal.Re} + {row.signal.Im}i</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="row mt-4">
                    <div className="col-6">
                        <SignalChart signal={selectedProject.signal ?? {} as Signal} type="module"/>
                    </div>
                    <div className="col-6">
                        <SignalChart signal={selectedProject.signal ?? {} as Signal} type="phase"/>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )

}