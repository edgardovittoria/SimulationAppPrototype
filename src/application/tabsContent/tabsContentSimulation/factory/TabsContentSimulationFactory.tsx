import React from 'react';
import {Project} from "../../../../model/Project";
import {ComponentEntity, ImportActionParamsObject} from "@Draco112358/cad-library";
import {RightPanel} from "../../tabsContentProjectManagement/projectsManagementElements/components/rightPanel/RightPanel";
import {Overview} from "../../tabsContentProjectManagement/projectsManagementElements/components/overview/Overview";
import {Projects} from "../../tabsContentProjectManagement/projectsManagementElements/components/projects/Projects";
import {Simulations} from "../../tabsContentProjectManagement/projectsManagementElements/components/simulations/Simulations";
import {Modeler} from "../simulationElements/components/modeler/Modeler";
import {LeftPanel} from "../simulationElements/components/dashBoard/leftPanel/LeftPanel";
import {RightPanelSimulation} from "../simulationElements/components/dashBoard/RightPanelSimulation";

interface TabsContentSimulationFactoryProps {
    menuItem: string,
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    unselectComponent: Function,
    assignMaterial: Function,
    resetSelectedComponentsArray: Function,
    updateComponentColor: Function
}

export const TabsContentSimulationFactory: React.FC<TabsContentSimulationFactoryProps> = (
    {
        menuItem, selectedProject,importModel, assignMaterial, selectComponent,
        unselectComponent, selectedComponent, resetSelectedComponentsArray, updateComponentColor
    }
) => {
    switch (menuItem) {
        case 'Modeler' :
            return <>
                <Modeler
                    selectedProject={selectedProject}
                    importModel={importModel}
                    selectComponent={selectComponent}
                    unselectComponent={unselectComponent}
                    selectedComponent={selectedComponent}
                    updateComponentColor={updateComponentColor}
                />
                <LeftPanel
                    secondTab="Materials"
                    selectedComponent={selectedComponent}
                    selectComponent={selectComponent}
                    unselectComponent={unselectComponent}
                    updateComponentColor={updateComponentColor}
                   />
                <RightPanelSimulation
                    section="Modeler"
                    assignMaterial={assignMaterial}
                    selectedComponent={selectedComponent}
                    resetSelectedComponentsArray={resetSelectedComponentsArray}
                />
            </>

        case 'Physics' :
            return <>
                <Modeler
                    selectedProject={selectedProject}
                    importModel={importModel}
                    selectComponent={selectComponent}
                    unselectComponent={unselectComponent}
                    selectedComponent={selectedComponent}
                    updateComponentColor={updateComponentColor}
                />
                <LeftPanel
                    secondTab="Physics"
                    selectedComponent={selectedComponent}
                    selectComponent={selectComponent}
                    unselectComponent={unselectComponent}
                    updateComponentColor={updateComponentColor}
                />
                <RightPanelSimulation
                    section="Physics"
                    assignMaterial={assignMaterial}
                    selectedComponent={selectedComponent}
                    resetSelectedComponentsArray={resetSelectedComponentsArray}
                />
            </>
        case 'Simulator' :
            return <>
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
                />
            </>
        case 'Results' :
            return <>
                <Modeler
                    selectedProject={selectedProject}
                    importModel={importModel}
                    selectComponent={selectComponent}
                    unselectComponent={unselectComponent}
                    selectedComponent={selectedComponent}
                    updateComponentColor={updateComponentColor}
                />
                <LeftPanel
                    secondTab="Results"
                    selectedComponent={selectedComponent}
                    selectComponent={selectComponent}
                    unselectComponent={unselectComponent}
                    updateComponentColor={updateComponentColor}
                />
                <RightPanelSimulation
                    section="Results"
                    assignMaterial={assignMaterial}
                    selectedComponent={selectedComponent}
                    resetSelectedComponentsArray={resetSelectedComponentsArray}
                />
            </>
        default :
            return <></>
    }

}