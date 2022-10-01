import React, {useState} from 'react';
import {ResultsContent} from "../simulationElements/components/resultsContent/ResultsContent";
import {Modeler} from "../simulationElements/shared/modeler/Modeler";
import {LeftPanel} from "../simulationElements/shared/dashBoard/leftPanel/LeftPanel";
import {RightPanelSimulation} from "../simulationElements/shared/dashBoard/rightPanelSimulation/RightPanelSimulation";
import {
    FactoryRightPanelContent
} from "../simulationElements/shared/dashBoard/rightPanelSimulation/factory/FactoryRightPanelContent";
import {LineChartRomega} from "../simulationElements/components/resultsContent/components/factory/components/LineChartRomega";
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

    const [chart, setChart] = useState("R(omega)");

    const selectedProject = useSelector(selectedProjectSelector)
    const selectedComponent = useSelector(selectedComponentSelector)
    let allMaterials = getMaterialListFrom(selectedProject?.model.components as ComponentEntity[])
    let materialsNames: string[] = []
    allMaterials.forEach(m => materialsNames.push(m.name))

    const [quantumDimensions, setQuantumDimensions] = useState<[number, number, number]>([0.00000, 0.000000, 0.000000]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>(materialsNames);

    useGenerateMesh(selectedProject?.model.components as ComponentEntity[], quantumDimensions);

    const {newSimulation} = useRunSimulation(selectedProject);
    let simulation: Simulation
    if(newSimulation.name){
        simulation = selectedProject?.simulations?.filter(s => s.name === newSimulation?.name)[0] as Simulation
    }else{
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
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            chart={chart}
                            setChart={setChart}
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
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            chart={chart}
                            setChart={setChart}
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
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            chart={chart}
                            setChart={setChart}
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
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectedMaterials={selectedMaterials}
                            setSelectedMaterials={setSelectedMaterials}
                            chart={chart}
                            setChart={setChart}
                        />
                    </LeftPanel>
                    {(selectedSimulation && selectedProject && selectedProject.simulations.length > 0) &&
                        <LineChartFactory chart={chart} simulation={simulation}/>
                    }
                </ResultsContent>
            )
        default:
            return <></>
    }

}