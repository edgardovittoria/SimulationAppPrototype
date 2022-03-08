import React, {useState} from 'react';
import {ComponentEntity} from "@Draco112358/cad-library";
import {Port, Signal} from "../../../../../../../../model/Port";
import {PortManagement} from "./components/portManagement/PortManagement";
import {PortType} from "./components/portManagement/components/PortType";
import {PortPosition} from "./components/portManagement/components/PortPosition";
import {RLCParamsComponent} from "./components/portManagement/components/RLCParamsComponent";
import {InputSignal} from "./components/portManagement/components/inputSignal/InputSignal";
import {ModalSelectPortType} from "./components/modals/ModalSelectPortType";
import {ModalSignals} from "./components/modals/ModalSignals";

interface FactoryRightPanelContentProps {
    section: string,
    components?: ComponentEntity[],
    setShowSimulationModel: Function,
    ports: Port[] | undefined,
    setPortType: Function,
    updatePortPosition: Function,
    setRLCParams: Function,
    setPortSignal: Function,
    availableSignals: Signal[],
    setAvailableSignals: Function
}

export const FactoryRightPanelContent: React.FC<FactoryRightPanelContentProps> = (
    {
        section, components, setShowSimulationModel, ports,
        setPortType, updatePortPosition, setRLCParams, setPortSignal, availableSignals, setAvailableSignals
    }
) => {

    let selectedPort = ports?.filter(port => port.isSelected)[0];
    const [showModalSelectPortType, setShowModalSelectPortType] = useState(false);
    const [showModalSignal, setShowModalSignal] = useState(false);

    switch (section) {
        case 'Modeler':
            return <></>

        case 'Physics':
            return (
                <>
                    {
                        selectedPort ?
                            <PortManagement>
                                <PortType setShow={setShowModalSelectPortType} selectedPort={selectedPort}/>
                                <PortPosition selectedPort={selectedPort} updatePortPosition={updatePortPosition}/>
                                <RLCParamsComponent selectedPort={selectedPort} setRLCParams={setRLCParams}/>
                                <InputSignal
                                    setShowModalSignal={setShowModalSignal}
                                    setPortSignal={setPortSignal}
                                    selectedPort={selectedPort}
                                    availableSignals={availableSignals}
                                />

                                <ModalSelectPortType show={showModalSelectPortType} setShow={setShowModalSelectPortType}
                                                     selectedPort={selectedPort} setPortType={setPortType}
                                />
                                <ModalSignals
                                    showModalSignal={showModalSignal}
                                    setShowModalSignal={setShowModalSignal}
                                    setAvailableSignals={setAvailableSignals}
                                    availableSignals={availableSignals}
                                />
                            </PortManagement>
                            : <span className="py-1">No Port Selected</span>
                    }
                </>
            )
        case 'Simulator':
            return (
                <>
                    <span className="py-1">Case Study</span>
                    <hr/>
                    {((components !== undefined) && (components.filter(component => component.material === undefined).length === 0)) ?
                        <button
                            className="btn button-primary flex-column w-100"
                            onClick={() => setShowSimulationModel(true)}
                        >
                            <div className="fa fa-power-off me-3" style={{color: '#fff'}}/>
                            Launcher
                        </button>
                        : <h6>Add materials and physics <br/> and start the simulation</h6>
                    }
                </>
            )
        case 'Results':
            return <></>
        default:
            return <></>
    }


}