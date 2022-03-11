import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Port, Signal, SignalValues} from "../../../../../../../../../../../../model/Port";
import css from "./inputSignal.module.css";
import {ModalInputSignal} from "../../../modals/ModalInputSignal";

interface InputSignalProps {
    setShowModalSignal: Function,
    setPortSignal: Function,
    selectedPort: Port,
    availableSignals: Signal[],
    setAvailableSignals: Function

}

export const InputSignal: React.FC<InputSignalProps> = (
    {
        setShowModalSignal, setPortSignal, selectedPort, availableSignals, setAvailableSignals
    }
) => {

    const [show, setShow] = useState(false);

    function getSignalByName(name: string) {
        return availableSignals.filter(signal => signal.name === name)[0]
    }

    function setAssociatedSignal(event: ChangeEvent<HTMLSelectElement>){
        if (event.currentTarget.value === 'undefined') {
            setPortSignal(undefined)
        } else {
            setPortSignal(getSignalByName(event.currentTarget.value))
        }
    }

    function loadSignal(e: FormEvent<HTMLInputElement>){
        let file = e.currentTarget.files?.item(0)
        let signalName = file?.name.split(".")[0];
        let signalValues: SignalValues[] = [];
        let fileError = false;
        (file as File).text().then(value => {
            let rows = value.split(/\r?\n/);
            rows.splice(rows.length - 1, 1)
            rows.forEach(row => {
                if(row.split(" ").length === 3){
                    signalValues.push({
                        freq: parseFloat(row.split(/\s+/)[0]),
                        signal: {
                            Re: parseFloat(row.split(/\s+/)[1]),
                            Im: parseFloat(row.split(/\s+/)[2])
                        }
                    })
                }else{
                    fileError = true;
                    rows.length = 0; //break the forEach loop
                }
            })
            if(!fileError) {
                let signal: Signal = {
                    id: signalName ?? "",
                    name: signalName ?? "",
                    type: "current",
                    signalValues: signalValues,
                }
                setAvailableSignals([...availableSignals, signal])
            }else {
                alert("The imported file is not in the correct format. Please upload a correct file!")
                fileError = false
            }
        })
    }

    return (
        <>
            <div className={`mt-4 ${css.inputSignalBox}`}>
                <div className="row">
                    <h6>Input Signal</h6>
                    <div className="col-4">
                        <select className={`w-100 ${css.selectSignal}`}
                                value={selectedPort.associatedSignal?.name}
                                onChange={event => setAssociatedSignal(event)}>
                            <option value="undefined">UNDEFINED</option>
                            {availableSignals.map((signal, index) => {
                                return <option key={index} value={signal.name}>{signal.name}</option>
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
                            <input type="file" accept="text/plain"
                                   onInput={event => loadSignal(event)}
                            />
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


