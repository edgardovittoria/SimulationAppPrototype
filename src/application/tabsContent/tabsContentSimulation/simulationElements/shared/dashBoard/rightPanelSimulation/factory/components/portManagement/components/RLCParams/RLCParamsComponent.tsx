import React from 'react';
import {Port, RLCParams} from "../../../../../../../../../../../../model/Port";

import css from "./RLCParamas.module.css";
import {useDispatch} from "react-redux";
import {setRLCParams} from "../../../../../../../../../../../../store/projectSlice";

interface RLCParamsProps {
    selectedPort: Port
}

export const RLCParamsComponent: React.FC<RLCParamsProps> = ({selectedPort}) => {

    const dispatch = useDispatch()

    return(
        <div className={`mt-3 ${css.RLCParamsBox}`}>
            <h6>RLC Params</h6>
            <div className="mt-2">
                <span>Resistance</span>
                <input className={`w-100 ${css.inputPortManagement} form-control`} type="number"
                       value={(selectedPort.rlcParams.resistance) ? selectedPort.rlcParams.resistance.toString() : ""}
                       onChange={(event) => dispatch(setRLCParams({
                           ...selectedPort.rlcParams,
                           resistance: parseFloat(event.currentTarget.value)
                       }) as RLCParams)}/>
            </div>
            <div className="mt-2">
                <span>Inductance</span>
                <input className={`w-100 ${css.inputPortManagement} form-control`} type="number"
                       value={(selectedPort.rlcParams.inductance) ? selectedPort.rlcParams.inductance.toString() : ""}
                       onChange={(event) => dispatch(setRLCParams({
                           ...selectedPort.rlcParams,
                           inductance: parseFloat(event.currentTarget.value)
                       }) as RLCParams)
                       }/>
            </div>
            <div className="mt-2">
                <span>Capacitance</span>
                <input className={`w-100 ${css.inputPortManagement} form-control`} type="number"
                       value={(selectedPort.rlcParams.capacitance) ? selectedPort.rlcParams.capacitance.toString() : ""}
                       onChange={(event) => dispatch(setRLCParams({
                           ...selectedPort.rlcParams,
                           capacitance: parseFloat(event.currentTarget.value)
                       }) as RLCParams)}/>
            </div>
        </div>
    )

}