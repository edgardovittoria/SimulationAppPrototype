import React from 'react';
import {Port, RLCParams} from "../../../../../../../../../../../model/Project";

interface RLCParamsProps {
    selectedPort: Port,
    setRLCParams: Function
}

export const RLCParamsComponent: React.FC<RLCParamsProps> = ({selectedPort, setRLCParams}) => {
    return(
        <div className="mt-3 portPositionBox">
            <h6>RLC Params</h6>
            <div className="mt-2">
                <span>Resistance</span>
                <input className="w-100 inputPortManagement form-control" type="number"
                       onChange={(event) => setRLCParams({
                           ...selectedPort.rlcParams,
                           resistance: parseFloat(event.currentTarget.value)
                       } as RLCParams)}/>
            </div>
            <div className="mt-2">
                <span>Inductance</span>
                <input className="w-100 inputPortManagement form-control" type="number"
                       onChange={(event) => setRLCParams({
                           ...selectedPort.rlcParams,
                           inductance: parseFloat(event.currentTarget.value)
                       } as RLCParams)
                       }/>
            </div>
            <div className="mt-2">
                <span>Capacitance</span>
                <input className="w-100 inputPortManagement form-control" type="number"
                       onChange={(event) => setRLCParams({
                           ...selectedPort.rlcParams,
                           capacitance: parseFloat(event.currentTarget.value)
                       } as RLCParams)}/>
            </div>
        </div>
    )

}