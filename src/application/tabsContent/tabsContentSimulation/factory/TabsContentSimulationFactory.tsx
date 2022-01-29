import React from 'react';
import {Project} from "../../../../model/Project";
import {ComponentEntity, ImportActionParamsObject} from "@Draco112358/cad-library";
import {SimulationContent} from "../simulationElements/components/simulationContent/SimulationContent";
import {Material} from "../../../../model/Material";
import {ModelerContent} from "../simulationElements/components/modelerContent/ModelerContent";
import {PhysicsContent} from "../simulationElements/components/physycsContent/PhysicsContent";
import {ResultsContent} from "../simulationElements/components/resultsContent/ResultsContent";
import {Modeler} from "../simulationElements/shared/modeler/Modeler";
import {LeftPanel} from "../simulationElements/shared/dashBoard/leftPanel/LeftPanel";
import {RightPanelSimulation} from "../simulationElements/shared/dashBoard/rightPanelSimulation/RightPanelSimulation";
import {FactoryRightPanelContent} from "../simulationElements/shared/dashBoard/rightPanelSimulation/factory/FactoryRightPanelContent";
import {SimulationPanel} from "../simulationElements/components/simulationContent/components/simulationPanel/SimulationPanel";
import {LeftMenu} from "../simulationElements/components/simulationContent/components/simulationPanel/components/LeftMenu";
import {PanelContent} from "../simulationElements/components/simulationContent/components/simulationPanel/components/PanelContent";
import {PanelFooter} from "../simulationElements/components/simulationContent/components/simulationPanel/components/PanelFooter";
import {LineChart} from "../simulationElements/components/resultsContent/components/LineChart";
import {Simulation} from "../../../../model/Simulation";

interface TabsContentSimulationFactoryProps {
    menuItem: string,
    setMenuItem: Function
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
    availableMaterials: Material[],
    meshGenerated: boolean,
    setMeshGenerated: Function,
    simulationStarted: "notStarted" | "started" | "Completed",
    meshApproved: boolean,
    setMeshApproved: Function,
    selectedSimulation: Simulation | undefined,
    setSelectedSimulation: Function,
    simulation: Simulation
}

export const TabsContentSimulationFactory: React.FC<TabsContentSimulationFactoryProps> = (
    {
        menuItem, selectedProject, importModel, assignMaterial, selectComponent,
        unselectComponent, selectedComponent, resetSelectedComponentsArray, updateComponentColor,
        showSimulationModel, setShowSimulationModel, availableMaterials, setMenuItem, meshGenerated,
        setMeshGenerated, simulationStarted, meshApproved, setMeshApproved,
        selectedSimulation, setSelectedSimulation, simulation
    }
) => {
    switch (menuItem) {
        case 'Modeler' :
            return (
                <ModelerContent>
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
                        setSelectedSimulation={setSelectedSimulation}
                        selectedSimulation={selectedSimulation}
                    />
                    {selectedComponent.length > 0 &&
                    <RightPanelSimulation>
                        <FactoryRightPanelContent
                            section="Modeler"
                            selectedComponent={selectedComponent}
                            assignMaterial={assignMaterial}
                            resetSelectedComponentsArray={resetSelectedComponentsArray}
                            setShowSimulationModel={setShowSimulationModel}
                            availableMaterials={availableMaterials}
                            assignedMaterials={(selectedProject) ? selectedProject.materials : []}
                        />
                    </RightPanelSimulation>}

                </ModelerContent>
            )

        case 'Physics' :
            return (
                <PhysicsContent>
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
                        setSelectedSimulation={setSelectedSimulation}
                        selectedSimulation={selectedSimulation}
                    />
                    <RightPanelSimulation>
                        <FactoryRightPanelContent
                            section="Physics"
                            selectedComponent={selectedComponent}
                            assignMaterial={assignMaterial}
                            resetSelectedComponentsArray={resetSelectedComponentsArray}
                            setShowSimulationModel={setShowSimulationModel}
                            availableMaterials={availableMaterials}
                            assignedMaterials={(selectedProject) ? selectedProject.materials : []}
                        />
                    </RightPanelSimulation>
                </PhysicsContent>
            )
        case 'Simulator' :
            return (
                <SimulationContent>
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
                        setSelectedSimulation={setSelectedSimulation}
                        selectedSimulation={selectedSimulation}
                    />
                    <RightPanelSimulation>
                        <FactoryRightPanelContent
                            section="Simulator"
                            selectedComponent={selectedComponent}
                            assignMaterial={assignMaterial}
                            resetSelectedComponentsArray={resetSelectedComponentsArray}
                            setShowSimulationModel={setShowSimulationModel}
                            availableMaterials={availableMaterials}
                            assignedMaterials={(selectedProject) ? selectedProject.materials : []}
                        />
                    </RightPanelSimulation>
                    <SimulationPanel
                        showSimulationModel={showSimulationModel}
                        setShowSimulationModel={setShowSimulationModel}
                    >
                        <LeftMenu assignedMaterials={(selectedProject) ? selectedProject.materials : []}
                                  physics={['physic1']}/>
                        <PanelContent simulationStarted={simulationStarted} meshGenerated={meshGenerated}
                                      simulation={simulation} selectedProject={selectedProject}
                        />
                        <PanelFooter simulationStarted={simulationStarted} meshGenerated={meshGenerated}
                                     meshApproved={meshApproved} setMeshGenerated={setMeshGenerated}
                                     setMeshApproved={setMeshApproved} setMenuItem={setMenuItem}
                                     setShowSimulationModel={setShowSimulationModel}/>
                    </SimulationPanel>
                </SimulationContent>
            )
        case 'Results' :
            return (
                <ResultsContent>
                    <LeftPanel
                        secondTab="Results"
                        selectedComponent={selectedComponent}
                        selectComponent={selectComponent}
                        unselectComponent={unselectComponent}
                        updateComponentColor={updateComponentColor}
                        setSelectedSimulation={setSelectedSimulation}
                        selectedSimulation={selectedSimulation}
                    />
                    {(selectedSimulation && selectedProject && selectedProject.simulations.length > 0) &&
                        <LineChart simulation={selectedSimulation}/>
                    }
                </ResultsContent>
            )
        default :
            return <></>
    }

}