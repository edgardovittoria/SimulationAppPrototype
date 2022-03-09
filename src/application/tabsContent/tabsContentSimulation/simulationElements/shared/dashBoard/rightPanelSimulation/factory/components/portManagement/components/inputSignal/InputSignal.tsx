import React, {useState} from 'react';
import {Port, Signal} from "../../../../../../../../../../../../model/Port";
import {Modal} from "react-bootstrap";
import {SignalChart} from "./components/SignalChart";
import css from "./inputSignal.module.css";
import {ModalInputSignal} from "../../../modals/ModalInputSignal";

interface InputSignalProps {
    setShowModalSignal: Function,
    setPortSignal: Function,
    selectedPort: Port,
    availableSignals: Signal[],

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
            <div className={`mt-4 ${css.inputSignalBox}`}>
                <div className="row">
                    <h6>Input Signal</h6>
                    <div className="col-4">
                        <select className={`w-100 ${css.selectSignal}`}
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
                            className={`w-100 ${css.btnNewSignal}`}
                        >+New Signal
                        </button>
                    </div>
                    <div className="col-4">
                        <label className={css.loadSignal}>
                            <input type="file"/>
                            Load Signal
                        </label>
                    </div>
                    {selectedPort.associatedSignal &&
                    <div className="mt-3">
                        <h6>Selected Signal:</h6>
                        <span className={css.selectedSignal}
                              onClick={() => setShow(true)}>{selectedPort.associatedSignal.name}</span>
                    </div>
                    }

                </div>
                {selectedPort.associatedSignal &&
                    <ModalInputSignal show={show} setShow={setShow} selectedPort={selectedPort}/>
                }
            </div>
        </>

    )

}


