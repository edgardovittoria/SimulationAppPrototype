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
    addPorts,
    createSimulation,
    deletePort,
    importModel,
    selectComponent,
    selectedComponentSelector,
    selectedProjectSelector,
    selectPort,
    setAssociatedSignal,
    setPortType,
    setRLCParams, setScreenshot,
    simulationSelector,
    unselectComponent,
    updatePortPosition,
    updateSimulation
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
    setShowLoadFromDBModal: Function
}

export const TabsContentSimulationFactory: React.FC<TabsContentSimulationFactoryProps> = (
    {
        menuItem, setMenuItem, selectedSimulation, setSelectedSimulation, setShowLoadFromDBModal
    }
) => {
    const dispatch = useDispatch()
    const portSelection = (name: string) => dispatch(selectPort(name))
    const portDeletion = (name: string) => dispatch(deletePort(name))
    const portAdding = (port: Port) => dispatch(addPorts(port))
    const rlcParamsSetting = (rlcParams: RLCParams) => dispatch(setRLCParams(rlcParams))
    const portPositionUpdate = (obj: { type: 'first' | 'last', position: [number, number, number] }) => dispatch(updatePortPosition(obj))
    const portTypeSetting = (obj: { name: string, type: number }) => dispatch(setPortType(obj))
    const portSignalSetting = (signal: Signal) => dispatch(setAssociatedSignal(signal))
    const componentSelection = (component: ComponentEntity) => dispatch(selectComponent(component))
    const componentDeselection = (component: ComponentEntity) => dispatch(unselectComponent(component))
    const screenshotSetting = (imageBase64: string) => dispatch(setScreenshot(imageBase64))

    const selectedProject = useSelector(selectedProjectSelector)
    const selectedComponent = useSelector(selectedComponentSelector)

    const [showSimulationModel, setShowSimulationModel] = useState(false);

    const simulations = useSelector(simulationSelector);


    const {meshGenerated, setMeshGenerated} = useGenerateMesh(showSimulationModel);
    const {
        simulationStarted,
        meshApproved,
        setMeshApproved,
        newSimulation
    } = useRunSimulation(showSimulationModel, (newSimulation: Simulation) =>
        dispatch(createSimulation(newSimulation)), (simulation: Simulation) => dispatch(updateSimulation(simulation)), simulations as Simulation[], selectedProject?.name as string);

    let simulation = simulations?.filter(s => s.name === newSimulation.name)[0] as Simulation

    const [selectedTabLeftPanel, setSelectedTabLeftPanel] = useState("Modeler");

    const {availableSignals, setAvailableSignals} = useGetAvailableSignals()

    const [quantumDimensions, setQuantumDimensions] = useState<[number, number, number]>([0.00000, 0.000000, 0.000000]);

    switch (menuItem) {
        case 'Modeler':
            return (
                <>
                    <Modeler
                        selectedProject={selectedProject}
                        importModel={importModel}
                        selectComponent={componentSelection}
                        selectPort={portSelection}
                        updatePortPosition={portPositionUpdate}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                    />
                    <LeftPanel tabs={['Modeler', 'Materials']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={componentSelection}
                            unselectComponent={componentDeselection}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={portSelection}
                            deletePort={portDeletion}
                        />
                    </LeftPanel>
                    {selectedComponent.length > 0 &&
                        <RightPanelSimulation ports={selectedProject?.ports}>
                            <FactoryRightPanelContent
                                section="Modeler"
                                components={selectedProject?.model.components}
                                setShowSimulationModel={setShowSimulationModel}
                                ports={selectedProject?.ports}
                                setPortType={portTypeSetting}
                                updatePortPosition={portPositionUpdate}
                                setRLCParams={rlcParamsSetting}
                                setPortSignal={portSignalSetting}
                                availableSignals={availableSignals}
                                setAvailableSignals={setAvailableSignals}
                            />
                        </RightPanelSimulation>}
                </>
            )

        case 'Physics':
            return (
                <>
                    <Modeler
                        selectedProject={selectedProject}
                        importModel={importModel}
                        selectComponent={componentSelection}
                        selectPort={portSelection}
                        updatePortPosition={portPositionUpdate}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                    />
                    <LeftPanel tabs={['Modeler', 'Physics']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={componentSelection}
                            unselectComponent={componentDeselection}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={portSelection}
                            deletePort={portDeletion}
                        />
                    </LeftPanel>
                    {selectedProject?.model.components &&
                        <SelectPorts addPorts={portAdding} selectedProject={selectedProject}/>}
                    <RightPanelSimulation ports={selectedProject?.ports}>
                        <FactoryRightPanelContent
                            section="Physics"
                            components={selectedProject?.model.components}
                            setShowSimulationModel={setShowSimulationModel}
                            ports={selectedProject?.ports}
                            setPortType={portTypeSetting}
                            updatePortPosition={portPositionUpdate}
                            setRLCParams={rlcParamsSetting}
                            setPortSignal={portSignalSetting}
                            availableSignals={availableSignals}
                            setAvailableSignals={setAvailableSignals}
                        />
                    </RightPanelSimulation>
                </>
            )
        case 'Simulator':
            return (
                <>
                    <Modeler
                        selectedProject={selectedProject}
                        importModel={importModel}
                        selectComponent={componentSelection}
                        selectPort={portSelection}
                        updatePortPosition={portPositionUpdate}
                        setScreenshot={(imageBase64: string) => dispatch(setScreenshot(imageBase64))}
                        setShowLoadFromDBModal={setShowLoadFromDBModal}
                    />
                    <LeftPanel tabs={['Modeler', 'Simulator']} selectedTab={selectedTabLeftPanel}
                               setSelectedTab={setSelectedTabLeftPanel}>
                        <FactorySimulationDashboardContent
                            selectedTab={selectedTabLeftPanel}
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={componentSelection}
                            unselectComponent={componentDeselection}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={portSelection}
                            deletePort={portDeletion}
                        />
                    </LeftPanel>
                    <RightPanelSimulation ports={selectedProject?.ports}>
                        <FactoryRightPanelContent
                            section="Simulator"
                            components={selectedProject?.model.components}
                            setShowSimulationModel={setShowSimulationModel}
                            ports={selectedProject?.ports}
                            setPortType={portTypeSetting}
                            updatePortPosition={portPositionUpdate}
                            setRLCParams={rlcParamsSetting}
                            setPortSignal={portSignalSetting}
                            availableSignals={availableSignals}
                            setAvailableSignals={setAvailableSignals}
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
                                      setQuantumDimensions={setQuantumDimensions}
                                      quantumDimensions={quantumDimensions}
                        />
                        <PanelFooter simulationStarted={simulationStarted} meshGenerated={meshGenerated}
                                     meshApproved={meshApproved} setMeshGenerated={setMeshGenerated}
                                     setMeshApproved={setMeshApproved} setMenuItem={setMenuItem}
                                     setShowSimulationModel={setShowSimulationModel}
                                     quantumDimensions={quantumDimensions}
                                     components={selectedProject?.model.components}
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
                            selectedProject={selectedProject}
                            selectedComponent={selectedComponent}
                            selectComponent={componentSelection}
                            unselectComponent={componentDeselection}
                            setSelectedSimulation={setSelectedSimulation}
                            selectedSimulation={selectedSimulation}
                            selectPort={portSelection}
                            deletePort={portDeletion}
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