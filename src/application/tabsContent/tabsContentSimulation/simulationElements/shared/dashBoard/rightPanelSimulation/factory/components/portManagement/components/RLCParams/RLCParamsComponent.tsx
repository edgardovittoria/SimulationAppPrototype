import React from 'react';
import {Port, Probe, RLCParams} from "../../../../../../../../../../../../model/Port";

import css from "./RLCParamas.module.css";

interface RLCParamsProps {
    selectedPort: Port,
    setRLCParams: Function
}

export const RLCParamsComponent: React.FC<RLCParamsProps> = ({selectedPort, setRLCParams}) => {
    return(
        <div className={`mt-3 ${css.RLCParamsBox}`}>
            <h6>RLC Params</h6>
            <div className="mt-2">
                <span>Resistance</span>
                <input className={`w-100 ${css.inputPortManagement} form-control`} type="number"
                       value={(selectedPort.rlcParams.resistance) ? selectedPort.rlcParams.resistance.toString() : ""}
                       onChange={(event) => setRLCParams({
                           ...selectedPort.rlcParams,
                           resistance: parseFloat(event.currentTarget.value)
                       } as RLCParams)}/>
            </div>
            <div className="mt-2">
                <span>Inductance</span>
                <input className={`w-100 ${css.inputPortManagement} form-control`} type="number"
                       value={(selectedPort.rlcParams.inductance) ? selectedPort.rlcParams.inductance.toString() : ""}
                       onChange={(event) => setRLCParams({
                           ...selectedPort.rlcParams,
                           inductance: parseFloat(event.currentTarget.value)
                       } as RLCParams)
                       }/>
            </div>
            <div className="mt-2">
                <span>Capacitance</span>
                <input className={`w-100 ${css.inputPortManagement} form-control`} type="number"
                       value={(selectedPort.rlcParams.capacitance) ? selectedPort.rlcParams.capacitance.toString() : ""}
                       onChange={(event) => setRLCParams({
                           ...selectedPort.rlcParams,
                           capacitance: parseFloat(event.currentTarget.value)
                       } as RLCParams)}/>
            </div>
        </div>
    )

}