import React from 'react';
import {Modal} from "react-bootstrap";
import css from "../portManagement/components/inputSignal/inputSignal.module.css";
import {SignalChart} from "../portManagement/components/inputSignal/components/SignalChart";
import {Port, Signal} from "../../../../../../../../../../model/Port";

interface ModalInputSignalProps {
    show: boolean,
    setShow: Function,
    selectedPort: Port
}

export const ModalInputSignal: React.FC<ModalInputSignalProps> = (
    {
        show, setShow, selectedPort
    }
) => {
    return(
        <Modal show={show} onHide={() => setShow(false)} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{selectedPort.associatedSignal?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row justify-content-center text-center py-3 h-50">
                    <div className={css.tableWrapper}>
                        <table className="w-100">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Frequency</th>
                                <th>Signal(Re+Im)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(selectedPort.associatedSignal) && selectedPort.associatedSignal.signalValues.map((row, index) => {
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
                        <SignalChart signal={selectedPort.associatedSignal ?? {} as Signal} type="module"/>
                    </div>
                    <div className="col-6">
                        <SignalChart signal={selectedPort.associatedSignal ?? {} as Signal} type="phase"/>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )

}