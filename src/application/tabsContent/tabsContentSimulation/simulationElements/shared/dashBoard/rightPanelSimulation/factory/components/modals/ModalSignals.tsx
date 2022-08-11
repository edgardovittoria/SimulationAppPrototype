import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import css from './style/modalSignals.module.css';
import {Signal, SignalValues} from "../../../../../../../../../../model/Port";
import {saveSignal} from "../../../../../../../../../../faunadb/api/signalsAPIs";
import { useFaunaQuery } from 'cad-library';
import {useGetAvailableSignals} from "../../../../../../../hooks/useGetAvailableSignals";

interface ModalSignalsProps {
    showModalSignal: boolean,
    setShowModalSignal: Function,
}

export const ModalSignals: React.FC<ModalSignalsProps> = (
    {
        showModalSignal, setShowModalSignal
    }
) => {

    const [signalName, setSignalName] = useState('');
    const [signalType, setSignalType] = useState('current');

    const [frequency, setFrequency] = useState<number | string>('');
    const [signalRe, setSignalRe] = useState<number | string>('');
    const [signalIm, setSignalIm] = useState<number | string>('');
    const [signalValuesArray, setSignalValuesArray] = useState<SignalValues[]>([]);
    const {availableSignals, setAvailableSignals} = useGetAvailableSignals()
    const {execQuery} = useFaunaQuery()

    function onModalClose() {
        setSignalValuesArray([])
        setFrequency('')
        setSignalRe('')
        setSignalIm('')
        setSignalName('')
        setSignalType('current')
        setShowModalSignal(false)
    }


    return (
        <Modal show={showModalSignal} onHide={onModalClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>DEFINE NEW SIGNAL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <h5>Insert signal's name and type</h5>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label className="mb-2">Name</label>
                        <input type="text"
                               className={css.inputNumber + " form-control"}
                               value={signalName}
                               onChange={(event) => {
                                   setSignalName(event.currentTarget.value)
                               }}
                        />
                    </div>
                    <div className="col-6">
                        <label className="mb-2">Type</label>
                        <select className={css.selectSignalType} onChange={(event) => {
                            setSignalType(event.currentTarget.value)
                        }}>
                            <option value="current">Current</option>
                            <option value="voltage">Voltage</option>
                        </select>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h5>Insert frequency and signal values</h5>
                </div>
                <div className="row mt-4">
                    <div className="col-4">
                        <label className="mb-2">Frequency(float)</label>
                        <input type="number"
                               className={css.inputNumber + " form-control"}
                               value={frequency}
                               onChange={(event) => {
                                   setFrequency(parseFloat(event.currentTarget.value))
                               }}
                        />
                    </div>
                    <div className="col-8">
                        <label className="mb-2">Signal(complex)</label>
                        <div className="row">
                            <div className="col-4">
                                <input type="number"
                                       className={css.inputNumber + " form-control"}
                                       placeholder="Re"
                                       value={signalRe}
                                       onChange={(event) => {
                                           setSignalRe(parseFloat(event.currentTarget.value))
                                       }}
                                />
                            </div>
                            <div className="col-4">
                                <input type="number"
                                       className={css.inputNumber + " form-control"}
                                       placeholder="Im"
                                       value={signalIm}
                                       onChange={(event) => {
                                           setSignalIm(parseFloat(event.currentTarget.value))
                                       }}
                                />
                            </div>
                            <div className="col-4">
                                <button className={css.btnAddValues}
                                        onClick={() => {
                                            let tableRow: SignalValues = {
                                                freq: frequency as number,
                                                signal: {
                                                    Re: signalRe as number,
                                                    Im: signalIm as number
                                                }
                                            }
                                            setSignalValuesArray([...signalValuesArray, tableRow]);
                                            setFrequency('')
                                            setSignalRe('')
                                            setSignalIm('')
                                        }}
                                >ADD VALUES
                                </button>
                            </div>
                        </div>
                    </div>
                    {signalValuesArray.length > 0 &&
                    <>
                        <hr className="mt-4"/>
                        <div className={`row ${css.signalsTableRow}`}>
                            <table className="w-50 mt-1 ms-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Frequency</th>
                                        <th>Signal(Re+Im)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {signalValuesArray.map((row, index) => {
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
                        <div className="row m-auto">
                            <button className={css.btnAddSignal}
                                    onClick={async () => {
                                        let newSignal: Signal = {
                                            id: signalName,
                                            name: signalName,
                                            type: signalType,
                                            signalValues: signalValuesArray
                                        }
                                        let confirm = window.confirm('Are you sure to save the signal?');
                                        if(confirm){
                                            setAvailableSignals([...availableSignals, newSignal])
                                            await execQuery(saveSignal, newSignal)
                                            onModalClose()
                                        }

                                    }}
                            >ADD SIGNAL
                            </button>
                        </div>
                    </>
                    }

                </div>
            </Modal.Body>
        </Modal>
    )

}