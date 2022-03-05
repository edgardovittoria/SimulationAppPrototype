import React from 'react';
import {Port} from "../../../../../../../../../../../model/Project";

interface PortTypeProps {
    setShow: Function,
    selectedPort: Port
}

export const PortType: React.FC<PortTypeProps> = ({setShow, selectedPort}) => {
    return(
        <div className="choosePortTypeContainer">
            <div className="w-100 text-start">
                <h6>Port Type</h6>
            </div>
            <button
                className="btn button-primary mb-2 w-100"
                onClick={() => setShow(true)}
            >Choose the port type
            </button>
            {selectedPort.type === 1 && <img src="portType1.png" alt="port type 1"/>}
            {selectedPort.type === 2 && <img src="portType2.png" alt="port type 2"/>}
            {selectedPort.type === 3 && <img src="portType3.png" alt="port type 3"/>}
            {selectedPort.type === 4 && <img src="portType4.png" alt="port type 4"/>}
            {selectedPort.type === 5 && <img src="portType5.png" alt="port type 5"/>}

        </div>
    )

}