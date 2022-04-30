import { useEffect, useMemo, useState } from 'react';
import './App.css';
import './GlobalColors.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { TabsContainer } from "./application/tabsContainer/TabsContainer";
import {
    addProject,
    projectsSelector,
    removeProject,
    resetSelectedComponents, selectProject, setScreenshot
} from "./store/projectSlice";
import { Project } from "./model/Project";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewProjectModal } from "./application/modals/createNewProjectModal/CreateNewProjectModal";
import { Simulation } from "./model/Simulation";
import { MenuBar } from './application/tabsContent/menuBar/MenuBar';
import { TabsContentProjectManagementFactory } from './application/tabsContent/tabsContentProjectManagement/factory/TabsContentProjectManagementFactory';
import { TabsContentSimulationFactory } from './application/tabsContent/tabsContentSimulation/factory/TabsContentSimulationFactory';
import faunadb from "faunadb";
import {client} from "./faunadb/client";
import {Signal} from "./model/Port";
import {FaunaResSignals, FaunaResSimulation} from "./faunadb/responseModels";



function App() {


    /*const q = faunadb.query

    useEffect(() => {
        client.query(
            q.Get(q.Match(q.Index('simulation_by_name'), 'simulation1'))
        )
            .then((res) => console.log((res as FaunaResSimulation).data))
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ));
    }, []);*/


    const projects = useSelector(projectsSelector)
    const dispatch = useDispatch()
    const [tabSelected, setTabSelected] = useState("DASHBOARD");
    const [projectsTab, setProjectsTab] = useState<Project[]>(projects);
    const [showCreateNewProjectModal, setShowCreateNewProjectModal] = useState(false);

    const menuItems = getMenuItemsArrayBasedOnTabType(tabSelected)
    const [menuItemSelected, setMenuItemSelected] = useState(menuItems[0]);

    const [selectedSimulation, setSelectedSimulation] = useState<Simulation | undefined>(undefined);

    const memoizedTabsContainer = useMemo(() => <TabsContainer
        selectTab={setTabSelected}
        selectedTab={tabSelected}
        projectsTab={projectsTab}
        setProjectsTab={setProjectsTab}
        setShowModal={setShowCreateNewProjectModal}
        selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
        resetSelectedComponentsArray={() => dispatch(resetSelectedComponents())}
    />, [tabSelected, projectsTab]);


    useEffect(() => {
        if(menuItemSelected !== "Results"){
            setMenuItemSelected(menuItems[0])
        }
    }, [tabSelected])

    return (
        <>
            {memoizedTabsContainer}
            <MenuBar setMenuItem={setMenuItemSelected} activeMenuItem={menuItemSelected} menuItems={menuItems} />
            {(tabSelected === 'DASHBOARD')
                ?
                <TabsContentProjectManagementFactory
                    menuItem={menuItemSelected}
                    setShowModal={setShowCreateNewProjectModal}
                    projectsTab={projectsTab}
                    setProjectsTab={setProjectsTab}
                    selectTab={setTabSelected}
                    projects={projects}
                    selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
                    removeProject={(projectName: string) => dispatch(removeProject(projectName))}
                    setSimulationCoreMenuItemSelected={setMenuItemSelected}
                    setSelectedSimulation={setSelectedSimulation}
                    setMenuItem={setMenuItemSelected}
                />
                :
                <TabsContentSimulationFactory
                    menuItem={menuItemSelected}
                    setMenuItem={setMenuItemSelected}
                    selectedSimulation={selectedSimulation}
                    setSelectedSimulation={setSelectedSimulation}
                />
            }
            <CreateNewProjectModal
                show={showCreateNewProjectModal}
                setShow={setShowCreateNewProjectModal}
                projectsTab={projectsTab}
                setProjectsTab={setProjectsTab}
                selectTab={setTabSelected}
                addNewProject={(project: Project) => dispatch(addProject(project))}
                selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
            />
        </>


    );
}

const getMenuItemsArrayBasedOnTabType = (tabType: string) => {
    switch (tabType) {
        case "DASHBOARD":
            return ['Overview', 'Projects', 'Simulations']
        default:
            return ['Modeler', 'Physics', 'Simulator', 'Results']
    }
}

export default App;
