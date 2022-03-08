import React from 'react';
import './rightPanelSimulation.css'
import {Port} from "../../../../../../../model/Port";
import {AiOutlineThunderbolt} from "react-icons/ai";

interface RightPanelSimulationProps {
    ports: Port[] | undefined
}

export const RightPanelSimulation: React.FC<RightPanelSimulationProps> = (
    {children, ports}
) => {
    let selectedPort = ports?.filter(port => port.isSelected)[0];
    return (
        <>
            < div className="rightPanelContainer">
                {selectedPort &&
                    <>
                        <div className="row">
                            <div className="col-2 pe-0 ps-0">
                                <AiOutlineThunderbolt color={'#00ae52'}
                                                      style={{width: "25px", height: "25px"}}/>
                            </div>
                            <div className="col-8 text-start ps-0">
                                <h5 className="fw-normal mb-0">{selectedPort.name}</h5>
                            </div>
                        </div>
                        <hr/>
                    </>
                }
                <div className="rightPanel">
                    {children}
                </div>
            </div>
        </>
    )

}