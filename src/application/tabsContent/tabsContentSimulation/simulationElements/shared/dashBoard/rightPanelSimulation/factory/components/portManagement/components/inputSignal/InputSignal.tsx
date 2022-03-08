import React, {useState} from 'react';
import {Port, Signal} from "../../../../../../../../../../../../model/Port";
import {Modal} from "react-bootstrap";
import {SignalChart} from "./components/SignalChart";
import css from "./inputSignal.module.css";

interface InputSignalProps {
    setShowModalSignal: Function,
    setPortSignal: Function,
    selectedPort: Port,
    availableSignals: Signal[]
}

export const InputSignal: React.FC<InputSignalProps> = (
    {
        setShowModalSignal, setPortSignal, selectedPort, availableSignals
    }
) => {

    const [show, setShow] = useState(false);
    function getSignalByName(name: string) {
        return availableSignals.filter(signal => signal.name === name)[0]
    }

    return (
        <>
            <div className="mt-4 portPositionBox">
                <div className="row">
                    <h6>Input Signal</h6>
                    <div className="col-4">
                        <select className="w-100 selectSignal"
                                value={selectedPort.associatedSignal?.name}
                                onChange={(event) => {
                                    if (event.currentTarget.value === 'undefined') {
                                        setPortSignal(undefined)
                                    } else {
                                        setPortSignal(getSignalByName(event.currentTarget.value))
                                    }
                                }}>
                            <option value="undefined">UNDEFINED</option>
                            {availableSignals.map(signal => {
                                return <option value={signal.name}>{signal.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-4">
                        <button
                            onClick={() => setShowModalSignal(true)}
                            className="w-100 btnNewSignal"
                        >+New Signal
                        </button>
                    </div>
                    <div className="col-4">
                        <label className="loadSignal">
                            <input type="file"/>
                            Load Signal
                        </label>
                    </div>
                    {selectedPort.associatedSignal &&
                    <div className="mt-3">
                        <h6>Selected Signal:</h6>
                        <span className="selectedSignal"
                              onClick={() => setShow(true)}>{selectedPort.associatedSignal.name}</span>
                    </div>
                    }

                </div>
                {selectedPort.associatedSignal &&
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedPort.associatedSignal.name}</Modal.Title>
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
                                <SignalChart signal={selectedPort.associatedSignal} type="module"/>
                            </div>
                            <div className="col-6">
                                <SignalChart signal={selectedPort.associatedSignal} type="phase"/>
                            </div>

                        </div>
                    </Modal.Body>
                </Modal>
                }
            </div>
        </>

    )

}


