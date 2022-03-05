import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './GlobalColors.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { TabsContainer } from "./application/tabsContainer/TabsContainer";
import {
    addProject,
    projectsSelector,
    resetSelectedComponents, selectProject
} from "./store/projectSlice";
import { Project } from "./model/Project";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewProjectModal } from "./application/modals/createNewProjectModal/CreateNewProjectModal";
import { TabsContentProjectManagement } from "./application/tabsContent/tabsContentProjectManagement/TabsContentProjectManagement";
import { TabContentSimulation } from "./application/tabsContent/tabsContentSimulation/TabContentSimulation";
import { Simulation } from "./model/Simulation";
import { MenuBar } from './application/tabsContent/menuBar/MenuBar';


function App() {

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
        setMenuItemSelected(menuItems[0])
    }, [tabSelected])

    return (
        <>
            {memoizedTabsContainer}
            <MenuBar setMenuItem={setMenuItemSelected} activeMenuItem={menuItemSelected} menuItems={menuItems} />
            {(tabSelected === 'DASHBOARD')
                ?
                <TabsContentProjectManagement
                    setMenuItem={setMenuItemSelected}
                    setShowModal={setShowCreateNewProjectModal}
                    projectsTab={projectsTab}
                    setProjectsTab={setProjectsTab}
                    selectTab={setTabSelected}
                    setSimulationCoreMenuItemSelected={setMenuItemSelected}
                    setSelectedSimulation={setSelectedSimulation}
                    menuItemSelected={menuItemSelected}
                />
                : <TabContentSimulation
                    menuItems={menuItems}
                    menuItemSelected={menuItemSelected}
                    setMenuItemSelected={setMenuItemSelected}
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
