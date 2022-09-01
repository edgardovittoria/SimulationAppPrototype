import React, {useState} from 'react';
import {Port, RLCParams, Signal} from "../../../../model/Port";
import {ResultsContent} from "../simulationElements/components/resultsContent/ResultsContent";
import {Modeler} from "../simulationElements/shared/modeler/Modeler";
import {LeftPanel} from "../simulationElements/shared/dashBoard/leftPanel/LeftPanel";
import {RightPanelSimulation} from "../simulationElements/shared/dashBoard/rightPanelSimulation/RightPanelSimulation";
import {
    FactoryRightPanelContent
} from "../simulationElements/shared/dashBoard/rightPanelSimulation/factory/FactoryRightPanelContent";
import {SimulationPanel} from "../simulationElements/components/simulationPanel/SimulationPanel";
import {LeftMenu} from "../simulationElements/components/simulationPanel/components/leftMenu/LeftMenu";
import {PanelContent} from "../simulationElements/components/simulationPanel/components/panelContent/PanelContent";
import {PanelFooter} from "../simulationElements/components/simulationPanel/components/panelFooter/PanelFooter";
import {LineChart} from "../simulationElements/components/resultsContent/components/LineChart";
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
import {useGetAvailableSignals} from "../hooks/useGetAvailableSignals";

interface TabsContentSimulationFactoryProps {
    menuItem: string,
    setMenuItem: Function
    selectedSimulation: Simulation | undefined,
    setSelectedSimulation: Function,
    setShowLoadFromDBModal: Function,
}

export const TabsContentSimulationFactory: React.FC<TabsContentSimulationFactoryProps> = (
    {
        menuItem, setMenuItem, selectedSimulation, setSelectedSimulation, setShowLoadFromDBModal,
    }
) => {

    const dispatch = useDispatch()

    const selectedProject = useSelector(selectedProjectSelector)
    const selectedComponent = useSelector(selectedComponentSelector)

    const [showSimulationModel, setShowSimulationModel] = useState(false);

    const simulations = useSelector(simulationSelector);

    const [quantumDimensions, setQuantumDimensions] = useState<[number, number, number]>([0.00000, 0.000000, 0.000000]);


    const {
        meshGenerated,
        setMeshGenerated,
        mesherOutput
    } = useGenerateMesh(showSimulationModel, selectedProject?.model.components as ComponentEntity[], quantumDimensions);

    const {
        simulationStarted,
        meshApproved,
        setMeshApproved,
        newSimulation
    } = useRunSimulation(showSimulationModel, selectedProject, mesherOutput);

    let simulation = simulations?.filter(s => s.name === newSimulation.name)[0] as Simulation

    const [selectedTabLeftPanel, setSelectedTabLeftPanel] = useState("Modeler");



    switch (menuItem) {
        case 'Modeler':
            return (
                <>
                    <Modeler
                        importModel={importModel}
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                        selectPort={(name: string) => dispatch(selectPort(name))}
                        selectedProject={selectedProject}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        updatePortPosition={(obj: { type: 'first' | 'last', position: [number, number, number] }) => dispatch(updatePortPosition(obj))}
                    />
                    <LeftPanel tabs={['Modeler', 'Materials']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                        />
                    </LeftPanel>
                    {selectedComponent.length > 0 &&
                        <RightPanelSimulation>
                            <FactoryRightPanelContent
                                section="Modeler"
                                components={selectedProject?.model.components}
                                setShowSimulationModel={setShowSimulationModel}
                                setMeshGenerated={setMeshGenerated}
                            />
                        </RightPanelSimulation>}
                </>
            )

        case 'Physics':
            return (
                <>
                    <Modeler
                        importModel={importModel}
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                        selectPort={(name: string) => dispatch(selectPort(name))}
                        selectedProject={selectedProject}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        updatePortPosition={(obj: { type: 'first' | 'last', position: [number, number, number] }) => dispatch(updatePortPosition(obj))}
                    />
                    <LeftPanel tabs={['Modeler', 'Physics']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                        />
                    </LeftPanel>
                    {selectedProject?.model.components &&
                        <SelectPorts selectedProject={selectedProject}/>}
                    <RightPanelSimulation>
                        <FactoryRightPanelContent
                            section="Physics"
                            components={selectedProject?.model.components}
                            setShowSimulationModel={setShowSimulationModel}
                            setMeshGenerated={setMeshGenerated}
                        />
                    </RightPanelSimulation>
                </>
            )
        case 'Simulator':
            return (
                <>
                    <Modeler
                        importModel={importModel}
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                        selectPort={(name: string) => dispatch(selectPort(name))}
                        selectedProject={selectedProject}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        updatePortPosition={(obj: { type: 'first' | 'last', position: [number, number, number] }) => dispatch(updatePortPosition(obj))}
                    />
                    <LeftPanel tabs={['Modeler', 'Simulator']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                        />
                    </LeftPanel>
                    <RightPanelSimulation>
                        <FactoryRightPanelContent
                            section="Simulator"
                            components={selectedProject?.model.components}
                            setShowSimulationModel={setShowSimulationModel}
                            setMeshGenerated={setMeshGenerated}
                        />
                    </RightPanelSimulation>
                    <SimulationPanel
                        showSimulationModel={showSimulationModel}
                        setShowSimulationModel={setShowSimulationModel}
                    >
                        <LeftMenu physics={['physic1']}/>
                        <PanelContent simulationStarted={simulationStarted} meshGenerated={meshGenerated}
                                      simulation={simulation}
                                      setQuantumDimensions={setQuantumDimensions}
                                      quantumDimensions={quantumDimensions}
                                      mesherOutput={mesherOutput}
                        />
                        <PanelFooter simulationStarted={simulationStarted} meshGenerated={meshGenerated}
                                     meshApproved={meshApproved} setMeshGenerated={setMeshGenerated}
                                     setMeshApproved={setMeshApproved} setMenuItem={setMenuItem}
                                     setShowSimulationModel={setShowSimulationModel}
                                     quantumDimensions={quantumDimensions}
                        />
                    </SimulationPanel>
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
                        />
                    </LeftPanel>
                    {(selectedSimulation && selectedProject && selectedProject.simulations.length > 0) &&
                        <LineChart simulation={selectedSimulation}/>
                    }
                </ResultsContent>
            )
        default:
            return <></>
    }

}