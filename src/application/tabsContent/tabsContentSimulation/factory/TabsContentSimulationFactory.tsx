import React, {useState} from 'react';
import {ResultsContent} from "../simulationElements/components/resultsContent/ResultsContent";
import {Modeler} from "../simulationElements/shared/modeler/Modeler";
import {LeftPanel} from "../simulationElements/shared/dashBoard/leftPanel/LeftPanel";
import {RightPanelSimulation} from "../simulationElements/shared/dashBoard/rightPanelSimulation/RightPanelSimulation";
import {
    FactoryRightPanelContent
} from "../simulationElements/shared/dashBoard/rightPanelSimulation/factory/FactoryRightPanelContent";
import {
    LineChartRomega
} from "../simulationElements/components/resultsContent/components/factory/components/LineChartRomega";
import {Simulation} from "../../../../model/Simulation";
import {
    FactorySimulationDashboardContent
} from "../simulationElements/shared/dashBoard/leftPanel/factory/FactorySimulationDashboardContent";
import {SelectPorts} from "../simulationElements/shared/dashBoard/selectPorts/SelectPorts";
import {useDispatch, useSelector} from 'react-redux';
import {
    importModel,
    selectedComponentSelector,
    selectedProjectSelector, selectPort, setScreenshot,
    simulationSelector, updatePortPosition
} from '../../../../store/projectSlice';
import {useGenerateMesh} from '../hooks/useGenerateMesh';
import {useRunSimulation} from '../hooks/useRunSimulation';
import {ComponentEntity} from 'cad-library';
import {getMaterialListFrom} from "../hooks/auxiliaryFunctions/auxiliaryFunctions";
import {LineChartFactory} from "../simulationElements/components/resultsContent/components/factory/LineChartFactory";
import {LineChartLH} from "../simulationElements/components/resultsContent/components/factory/components/LineChartLH";
import {
    ChartVisualizationMode
} from "../simulationElements/shared/dashBoard/chartVisualizationMode/ChartVisualizationMode";
import {LineChartGS} from "../simulationElements/components/resultsContent/components/factory/components/LineChartGS";
import {LineChartCF} from "../simulationElements/components/resultsContent/components/factory/components/LineChartCF";
import {
    LineChartZModule
} from "../simulationElements/components/resultsContent/components/factory/components/LineChartZModule";
import {
    LineChartZPhase
} from "../simulationElements/components/resultsContent/components/factory/components/LineChartZPhase";
import {
    LineChartSModule
} from "../simulationElements/components/resultsContent/components/factory/components/LineChartSModule";
import {
    LineChartSPhase
} from "../simulationElements/components/resultsContent/components/factory/components/LineChartSPhase";
import {LineChartSdB} from "../simulationElements/components/resultsContent/components/factory/components/LineChartSdB";
import {
    LineChartYModule
} from "../simulationElements/components/resultsContent/components/factory/components/LineChartYModule";
import {
    LineChartYPhase
} from "../simulationElements/components/resultsContent/components/factory/components/LineChartYPhase";

interface TabsContentSimulationFactoryProps {
    menuItem: string,
    setMenuItem: Function
    selectedSimulation: Simulation | undefined,
    setSelectedSimulation: Function,
    setShowLoadFromDBModal: Function,
}

export const TabsContentSimulationFactory: React.FC<TabsContentSimulationFactoryProps> = (
    {
        menuItem, setMenuItem, selectedSimulation, setSelectedSimulation, setShowLoadFromDBModal
    }
) => {

    const dispatch = useDispatch()

    const [chartVisualizationMode, setChartVisualizationMode] = useState<'grid' | 'full'>("full");

    const selectedProject = useSelector(selectedProjectSelector)
    const selectedComponent = useSelector(selectedComponentSelector)
    let allMaterials = getMaterialListFrom(selectedProject?.model.components as ComponentEntity[])
    let materialsNames: string[] = []
    allMaterials.forEach(m => materialsNames.push(m.name))
    const [selectedPort, setSelectedPort] = useState(selectedProject?.ports[0].name as string);
    const [quantumDimensions, setQuantumDimensions] = useState<[number, number, number]>([0.00000, 0.000000, 0.000000]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>(materialsNames);

    useGenerateMesh(selectedProject?.model.components as ComponentEntity[], quantumDimensions);

    const {newSimulation} = useRunSimulation(selectedProject);
    let simulation: Simulation
    if (newSimulation.name) {
        simulation = selectedProject?.simulations?.filter(s => s.name === newSimulation?.name)[0] as Simulation
    } else {
        simulation = selectedProject?.simulations?.filter(s => s.name === selectedSimulation?.name)[0] as Simulation
    }

    const [selectedTabLeftPanel, setSelectedTabLeftPanel] = useState("Modeler");


    switch (menuItem) {
        case 'Modeler':
            return (
                <>
                    <Modeler
                        importModel={importModel}
                        section="Modeler"
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                        selectPort={(name: string) => dispatch(selectPort(name))}
                        selectedProject={selectedProject}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        updatePortPosition={(obj: { type: 'first' | 'last', position: [number, number, number] }) => dispatch(updatePortPosition(obj))}
                        selectedMaterials={selectedMaterials}
                    />
                    <LeftPanel tabs={['Modeler', 'Materials']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel} chartVisualizationMode={chartVisualizationMode}
                               setChartVisualizationMode={setChartVisualizationMode}
                    >
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            selectedPort={selectedPort}
                            setSelectedPort={setSelectedPort}
                        />
                    </LeftPanel>
                    {selectedComponent.length > 0 &&
                        <RightPanelSimulation>
                            <FactoryRightPanelContent
                                section="Modeler"
                                components={selectedProject?.model.components}
                                setMenuItem={setMenuItem}
                                quantumDimensions={quantumDimensions}
                                setQuantumDimensions={setQuantumDimensions}
                            />
                        </RightPanelSimulation>}
                </>
            )

        case 'Physics':
            return (
                <>
                    <Modeler
                        importModel={importModel}
                        section="Physics"
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                        selectPort={(name: string) => dispatch(selectPort(name))}
                        selectedProject={selectedProject}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        updatePortPosition={(obj: { type: 'first' | 'last', position: [number, number, number] }) => dispatch(updatePortPosition(obj))}
                        selectedMaterials={selectedMaterials}
                    />
                    <LeftPanel tabs={['Modeler', 'Physics']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel} chartVisualizationMode={chartVisualizationMode}
                               setChartVisualizationMode={setChartVisualizationMode}
                    >
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            selectedPort={selectedPort}
                            setSelectedPort={setSelectedPort}
                        />
                    </LeftPanel>
                    {selectedProject?.model.components &&
                        <SelectPorts selectedProject={selectedProject}/>}
                    <RightPanelSimulation>
                        <FactoryRightPanelContent
                            section="Physics"
                            components={selectedProject?.model.components}
                            setMenuItem={setMenuItem}
                            quantumDimensions={quantumDimensions}
                            setQuantumDimensions={setQuantumDimensions}
                        />
                    </RightPanelSimulation>
                </>
            )
        case 'Simulator':
            return (
                <>
                    <Modeler
                        importModel={importModel}
                        section="Simulator"
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                        selectPort={(name: string) => dispatch(selectPort(name))}
                        selectedProject={selectedProject}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        updatePortPosition={(obj: { type: 'first' | 'last', position: [number, number, number] }) => dispatch(updatePortPosition(obj))}
                        selectedMaterials={selectedMaterials}
                    />
                    <LeftPanel tabs={['Modeler', 'Simulator']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel} chartVisualizationMode={chartVisualizationMode}
                               setChartVisualizationMode={setChartVisualizationMode}
                    >
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            selectedPort={selectedPort}
                            setSelectedPort={setSelectedPort}
                        />
                    </LeftPanel>
                    <RightPanelSimulation>
                        <FactoryRightPanelContent
                            section="Simulator"
                            components={selectedProject?.model.components}
                            setMenuItem={setMenuItem}
                            quantumDimensions={quantumDimensions}
                            setQuantumDimensions={setQuantumDimensions}
                        />
                    </RightPanelSimulation>
                </>
            )
        case 'Results':
            return (
                <ResultsContent>
                    <LeftPanel tabs={['Modeler', 'Results']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel} chartVisualizationMode={chartVisualizationMode}
                               setChartVisualizationMode={setChartVisualizationMode}
                    >
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            selectedPort={selectedPort}
                            setSelectedPort={setSelectedPort}
                        />
                    </LeftPanel>
                    {/*{(selectedProject && chartVisualizationMode === 'grid' && selectedProject.simulations.length > 0) &&

                    }*/}
                    {(selectedProject && chartVisualizationMode === 'full' && selectedProject.simulations.length > 0) ?
                        <div className="overflow-scroll max-h-[800px]">
                            <LineChartRomega simulation={simulation}/>
                            <LineChartLH simulation={simulation}/>
                            <LineChartZModule simulation={simulation}/>
                            <LineChartZPhase simulation={simulation}/>
                            <LineChartGS simulation={simulation}/>
                            <LineChartCF simulation={simulation}/>
                            <LineChartYModule simulation={simulation}/>
                            <LineChartYPhase simulation={simulation}/>
                            <LineChartSModule simulation={simulation}/>
                            <LineChartSPhase simulation={simulation}/>
                            <LineChartSdB simulation={simulation}/>
                        </div> :
                        <div className="grid grid-cols-2 gap-4 overflow-scroll max-h-[800px]">
                            <LineChartRomega simulation={simulation}/>
                            <LineChartLH simulation={simulation}/>
                            <LineChartZModule simulation={simulation}/>
                            <LineChartZPhase simulation={simulation}/>
                            <LineChartGS simulation={simulation}/>
                            <LineChartCF simulation={simulation}/>
                            <LineChartYModule simulation={simulation}/>
                            <LineChartYPhase simulation={simulation}/>
                            <LineChartSModule simulation={simulation}/>
                            <LineChartSPhase simulation={simulation}/>
                            <LineChartSdB simulation={simulation}/>
                        </div>
                    }
                </ResultsContent>
            )
        default:
            return <></>
    }

}