import React, {useState} from 'react';
import {ComponentEntity} from "@Draco112358/cad-library";
import {Port, Probe, Signal} from "../../../../../../../../model/Port";
import {PortManagement} from "./components/portManagement/PortManagement";
import {PortType} from "./components/portManagement/components/portType/PortType";
import {PortPosition} from "./components/portManagement/components/portPosition/PortPosition";
import {RLCParamsComponent} from "./components/portManagement/components/RLCParams/RLCParamsComponent";
import {InputSignal} from "./components/portManagement/components/inputSignal/InputSignal";
import {ModalSelectPortType} from "./components/modals/ModalSelectPortType";
import {ModalSignals} from "./components/modals/ModalSignals";
import {SimulatorLauncher} from "./components/simulatorLauncher/SimulatorLauncher";

interface FactoryRightPanelContentProps {
    section: string,
    components?: ComponentEntity[],
    setShowSimulationModel: Function,
    ports: (Port | Probe)[] | undefined,
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
                    {(selectedPort && (selectedPort?.category === 'port' || selectedPort?.category === 'lumped')) ?
                        <PortManagement selectedPort={selectedPort}>
                            <PortType setShow={setShowModalSelectPortType} selectedPort={selectedPort}/>
                            <PortPosition selectedPort={selectedPort}
                                          updatePortPosition={updatePortPosition}/>
                            <RLCParamsComponent selectedPort={selectedPort} setRLCParams={setRLCParams}/>
                            <InputSignal
                                setShowModalSignal={setShowModalSignal}
                                setPortSignal={setPortSignal}
                                selectedPort={selectedPort}
                                availableSignals={availableSignals}
                                setAvailableSignals={setAvailableSignals}
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
                        :
                        <PortManagement selectedPort={selectedPort}>
                            <PortPosition selectedPort={selectedPort ?? {} as Probe}
                                          updatePortPosition={updatePortPosition}/>
                        </PortManagement>
                    }
                </>
            )
        case 'Simulator':
            return (
                <SimulatorLauncher components={components} setShowSimulationModel={setShowSimulationModel}/>
            )
        case 'Results':
            return <></>
        default:
            return <></>
    }


}