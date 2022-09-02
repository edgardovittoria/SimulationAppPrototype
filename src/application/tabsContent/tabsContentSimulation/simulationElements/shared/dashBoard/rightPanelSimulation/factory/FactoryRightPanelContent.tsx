import React, {useState} from 'react';
import {ComponentEntity} from "cad-library";
import {Port, Probe, Signal} from "../../../../../../../../model/Port";
import {PortManagement} from "./components/portManagement/PortManagement";
import {PortType} from "./components/portManagement/components/portType/PortType";
import {PortPosition} from "./components/portManagement/components/portPosition/PortPosition";
import {RLCParamsComponent} from "./components/portManagement/components/RLCParams/RLCParamsComponent";
import {InputSignal} from "./components/inputSignalManagement/components/inputSignal/InputSignal";
import {ModalSelectPortType} from "./components/modals/ModalSelectPortType";
import {ModalSignals} from "./components/modals/ModalSignals";
import {SimulatorLauncher} from "./components/simulatorLauncher/SimulatorLauncher";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../../../../../../store/projectSlice";
import {Project} from "../../../../../../../../model/Project";
import {InputSignalManagement} from "./components/inputSignalManagement/InputSignalManagement";

interface FactoryRightPanelContentProps {
    section: string,
    components?: ComponentEntity[],
    setShowSimulationModel: Function,
    setMeshGenerated: Function
}

export const FactoryRightPanelContent: React.FC<FactoryRightPanelContentProps> = (
    {
        section, components, setShowSimulationModel, setMeshGenerated
    }
) => {

    const selectedProject = useSelector(selectedProjectSelector)
    let selectedPort = selectedProject?.ports.filter(port => port.isSelected)[0];
    const [showModalSelectPortType, setShowModalSelectPortType] = useState(false);
    const [showModalSignal, setShowModalSignal] = useState(false);

    switch (section) {
        case 'Modeler':
            return <></>

        case 'Physics':
            return (
                <>
                    {(selectedPort && (selectedPort?.category === 'port' || selectedPort?.category === 'lumped')) ?
                        <>
                            <PortManagement selectedPort={selectedPort}>
                                <PortType setShow={setShowModalSelectPortType} selectedPort={selectedPort}/>
                                <PortPosition selectedPort={selectedPort}/>
                                <RLCParamsComponent selectedPort={selectedPort}/>
                                <ModalSelectPortType show={showModalSelectPortType} setShow={setShowModalSelectPortType}
                                                     selectedPort={selectedPort}/>
                            </PortManagement>
                            <InputSignalManagement>
                                <InputSignal setShowModalSignal={setShowModalSignal} selectedProject={selectedProject as Project}/>
                                <ModalSignals showModalSignal={showModalSignal} setShowModalSignal={setShowModalSignal}/>
                            </InputSignalManagement>
                        </>
                        :
                        <PortManagement selectedPort={selectedPort}>
                            <PortPosition selectedPort={selectedPort ?? {} as Probe}/>
                        </PortManagement>
                    }
                </>
            )
        case 'Simulator':
            return (
                <SimulatorLauncher components={components}
                                   setShowSimulationModel={setShowSimulationModel}
                                   setMeshGenerated={setMeshGenerated}
                />
            )
        case 'Results':
            return <></>
        default:
            return <></>
    }


}