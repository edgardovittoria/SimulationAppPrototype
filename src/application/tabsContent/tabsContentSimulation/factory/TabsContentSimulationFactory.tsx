import React from 'react';
import {Project} from "../../../../model/Project";
import {ComponentEntity, ImportActionParamsObject, Material} from "@Draco112358/cad-library";
import {ResultsContent} from "../simulationElements/components/resultsContent/ResultsContent";
import {Modeler} from "../simulationElements/shared/modeler/Modeler";
import {LeftPanel} from "../simulationElements/shared/dashBoard/leftPanel/LeftPanel";
import {RightPanelSimulation} from "../simulationElements/shared/dashBoard/rightPanelSimulation/RightPanelSimulation";
import {FactoryRightPanelContent} from "../simulationElements/shared/dashBoard/rightPanelSimulation/factory/FactoryRightPanelContent";
import {SimulationPanel} from "../simulationElements/components/simulationPanel/SimulationPanel";
import {LeftMenu} from "../simulationElements/components/simulationPanel/components/LeftMenu";
import {PanelContent} from "../simulationElements/components/simulationPanel/components/PanelContent";
import {PanelFooter} from "../simulationElements/components/simulationPanel/components/PanelFooter";
import {LineChart} from "../simulationElements/components/resultsContent/components/LineChart";
import {Simulation} from "../../../../model/Simulation";
import {FactorySimulationDashboardContent} from "../simulationElements/shared/dashBoard/leftPanel/factory/FactorySimulationDashboardContent";
import {SelectPorts} from "../simulationElements/shared/dashBoard/selectPorts/SelectPorts";

interface TabsContentSimulationFactoryProps {
    menuItem: string,
    setMenuItem: Function
    selectedProject: Project | undefined,
    importModel: (params: ImportActionParamsObject) => any,
    selectedComponent: ComponentEntity[],
    selectComponent: Function,
    unselectComponent: Function,
    showSimulationModel: boolean,
    setShowSimulationModel: Function,
    meshGenerated: boolean,
    setMeshGenerated: Function,
    simulationStarted: "notStarted" | "started" | "Completed",
    meshApproved: boolean,
    setMeshApproved: Function,
    selectedSimulation: Simulation | undefined,
    setSelectedSimulation: Function,
    simulation: Simulation,
    selectedTabLeftPanel: string,
    setSelectedTabLeftPanel: Function,
    addPorts: Function,
    selectPort: Function,
    deletePort: Function,
    setPortType: Function,
    updatePortPosition: Function,
    setRLCParams: Function
}

export const TabsContentSimulationFactory: React.FC<TabsContentSimulationFactoryProps> = (
    {
        menuItem, selectedProject, importModel, selectComponent,
        unselectComponent, selectedComponent,        showSimulationModel, setShowSimulationModel, setMenuItem, meshGenerated,
        setMeshGenerated, simulationStarted, meshApproved, setMeshApproved,
        selectedSimulation, setSelectedSimulation, simulation, selectedTabLeftPanel,
        setSelectedTabLeftPanel, addPorts, selectPort, deletePort, setPortType, updatePortPosition, setRLCParams
    }
) => {

    switch (menuItem) {
        case 'Modeler' :
            return (
                <>
                    <Modeler
                        selectedProject={selectedProject}
                        importModel={importModel}
                        selectComponent={selectComponent}
                        selectPort={selectPort}
                        updatePortPosition={updatePortPosition}
                    />
                    <LeftPanel tabs={['Modeler', 'Materials']} selectedTab={selectedTabLeftPanel} setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={selectComponent}
                            unselectComponent={unselectComponent}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={selectPort}
                            deletePort={deletePort}
                        />
                    </LeftPanel>
                    {selectedComponent.length > 0 &&
                    <RightPanelSimulation ports={selectedProject?.ports}>
                        <FactoryRightPanelContent
                            section="Modeler"
                            components={selectedProject?.model.components}
                            setShowSimulationModel={setShowSimulationModel}
                            ports={selectedProject?.ports}
                            setPortType={setPortType}
                            updatePortPosition={updatePortPosition}
                            setRLCParams={setRLCParams}
                        />
                    </RightPanelSimulation>}
                </>
            )

        case 'Physics' :
            return (
                <>
                    <Modeler
                        selectedProject={selectedProject}
                        importModel={importModel}
                        selectComponent={selectComponent}
                        selectPort={selectPort}
                        updatePortPosition={updatePortPosition}
                    />
                    <LeftPanel tabs={['Modeler', 'Physics']} selectedTab={selectedTabLeftPanel} setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={selectComponent}
                            unselectComponent={unselectComponent}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={selectPort}
                            deletePort={deletePort}
                        />
                    </LeftPanel>
                    {selectedProject?.model.components && <SelectPorts addPorts={addPorts} selectedProject={selectedProject}/>}
                    <RightPanelSimulation ports={selectedProject?.ports}>
                        <FactoryRightPanelContent
                            section="Physics"
                            components={selectedProject?.model.components}
                            setShowSimulationModel={setShowSimulationModel}
                            ports={selectedProject?.ports}
                            setPortType={setPortType}
                            updatePortPosition={updatePortPosition}
                            setRLCParams={setRLCParams}
                        />
                    </RightPanelSimulation>
                </>
            )
        case 'Simulator' :
            return (
                <>
                    <Modeler
                        selectedProject={selectedProject}
                        importModel={importModel}
                        selectComponent={selectComponent}
                        selectPort={selectPort}
                        updatePortPosition={updatePortPosition}
                    />
                    <LeftPanel tabs={['Modeler', 'Simulator']} selectedTab={selectedTabLeftPanel} setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={selectComponent}
                            unselectComponent={unselectComponent}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={selectPort}
                            deletePort={deletePort}
                        />
                    </LeftPanel>
                    <RightPanelSimulation ports={selectedProject?.ports}>
                        <FactoryRightPanelContent
                            section="Simulator"
                            components={selectedProject?.model.components}
                            setShowSimulationModel={setShowSimulationModel}
                            ports={selectedProject?.ports}
                            setPortType={setPortType}
                            updatePortPosition={updatePortPosition}
                            setRLCParams={setRLCParams}
                        />
                    </RightPanelSimulation>
                    <SimulationPanel
                        showSimulationModel={showSimulationModel}
                        setShowSimulationModel={setShowSimulationModel}
                    >
                        <LeftMenu components={selectedProject?.model.components}
                                  physics={['physic1']}/>
                        <PanelContent simulationStarted={simulationStarted} meshGenerated={meshGenerated}
                                      simulation={simulation} selectedProject={selectedProject}
                        />
                        <PanelFooter simulationStarted={simulationStarted} meshGenerated={meshGenerated}
                                     meshApproved={meshApproved} setMeshGenerated={setMeshGenerated}
                                     setMeshApproved={setMeshApproved} setMenuItem={setMenuItem}
                                     setShowSimulationModel={setShowSimulationModel}/>
                    </SimulationPanel>
                </>
            )
        case 'Results' :
            return (
                <ResultsContent>
                    <LeftPanel tabs={['Modeler', 'Results']} selectedTab={selectedTabLeftPanel} setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={selectComponent}
                            unselectComponent={unselectComponent}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={selectPort}
                            deletePort={deletePort}
                        />
                    </LeftPanel>
                    {(selectedSimulation && selectedProject && selectedProject.simulations.length > 0) &&
                        <LineChart simulation={selectedSimulation}/>
                    }
                </ResultsContent>
            )
        default :
            return <></>
    }

}