import React from 'react';
import {ComponentEntity} from "@Draco112358/cad-library";
import {Port} from "../../../../../../../../model/Project";
import {PortManagement} from "./components/PortManagement";

interface FactoryRightPanelContentProps {
    section: string,
    components?: ComponentEntity[],
    setShowSimulationModel: Function,
    ports: Port[] | undefined,
    setPortType: Function,
    updatePortPosition: Function
}

export const FactoryRightPanelContent: React.FC<FactoryRightPanelContentProps> = (
    {
        section, components, setShowSimulationModel, ports,
        setPortType, updatePortPosition
    }
) => {

    let selectedPort = ports?.filter(port => port.isSelected)[0];

    switch (section) {
        case 'Modeler':
            return <></>

        case 'Physics':
            return (
                <>
                    {
                        selectedPort ? <PortManagement
                                selectedPort={selectedPort}
                                setPortType={setPortType}
                                updatePortPosition={updatePortPosition}
                            />
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
                            className="btn button-primary flex-column"
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