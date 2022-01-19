import React from 'react';
import {Project} from "../../../../../../model/Project";
import {ComponentEntity, ImportActionParamsObject} from "@Draco112358/cad-library";
import {Modeler} from "../modeler/Modeler";
import {LeftPanel} from "../dashBoard/leftPanel/LeftPanel";
import {RightPanelSimulation} from "../dashBoard/rightPanelSimulation/RightPanelSimulation";
import {SimulationPanel} from "./components/simulationPanel/SimulationPanel";
import {Material} from "../../../../../../model/Material";

interface SimulationProps {
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    unselectComponent: Function,
    assignMaterial: Function,
    resetSelectedComponentsArray: Function,
    updateComponentColor: Function,
    showSimulationModel: boolean,
    setShowSimulationModel: Function,
    materials: Material[],
}

export const Simulation: React.FC<SimulationProps> = (
    {
        selectedProject, importModel, assignMaterial, selectComponent,
        unselectComponent, selectedComponent, resetSelectedComponentsArray, updateComponentColor,
        showSimulationModel, setShowSimulationModel, materials
    }
) => {
    return (
        <>
            <Modeler
                selectedProject={selectedProject}
                importModel={importModel}
                selectComponent={selectComponent}
                unselectComponent={unselectComponent}
                selectedComponent={selectedComponent}
                updateComponentColor={updateComponentColor}
            />
            <LeftPanel
                secondTab="Simulator"
                selectedComponent={selectedComponent}
                selectComponent={selectComponent}
                unselectComponent={unselectComponent}
                updateComponentColor={updateComponentColor}
            />
            <RightPanelSimulation
                section="Simulator"
                assignMaterial={assignMaterial}
                selectedComponent={selectedComponent}
                resetSelectedComponentsArray={resetSelectedComponentsArray}
                setShowSimulationModel={setShowSimulationModel}
                materials={materials}
            />
            <SimulationPanel
                materials={[...materials]}
                physics={['physic1']}
                showSimulationModel={showSimulationModel}
                setShowSimulationModel={setShowSimulationModel}/>
        </>
    )

}