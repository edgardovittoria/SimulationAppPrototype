import React, {useMemo, useState} from 'react';
import {TabsContentProjectManagementFactory} from "./factory/TabsContentProjectManagementFactory";
import {Project} from "../../../model/Project";
import {useDispatch, useSelector} from "react-redux";
import {projectsSelector, removeProject, selectProject} from "../../../store/projectSlice";
import {MenuBar} from "../menuBar/MenuBar";

interface TabsContentProjectManagementProps {
    menuItemSelected: string,
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    setSimulationCoreMenuItemSelected: Function,
    setSelectedSimulation: Function,
    setMenuItem: Function
}

export const TabsContentProjectManagement: React.FC<TabsContentProjectManagementProps> = (
    {
        setShowModal, projectsTab, setProjectsTab, selectTab, setSimulationCoreMenuItemSelected,
        setSelectedSimulation, menuItemSelected, setMenuItem
    }
) => {

    const dispatch = useDispatch()
    let projects = useSelector(projectsSelector)

    // const menuItems = ['Overview', 'Projects', 'Simulations']
    // const [menuItemSelected, setMenuItemSelected] = useState(menuItems[0]);

    return (
        <>

            {/* <MenuBar setMenuItem={setMenuItemSelected} activeMenuItem={menuItemSelected} menuItems={menuItems}/> */}
            <TabsContentProjectManagementFactory
                menuItem={menuItemSelected}
                setShowModal={setShowModal}
                projectsTab={projectsTab}
                setProjectsTab={setProjectsTab}
                selectTab={selectTab}
                projects={projects}
                selectProject={(projectName: string | undefined) => dispatch(selectProject(projectName))}
                removeProject={(projectName: string) => dispatch(removeProject(projectName))}
                setSimulationCoreMenuItemSelected={setSimulationCoreMenuItemSelected}
                setSelectedSimulation={setSelectedSimulation}
                setMenuItem={setMenuItem}
            />
        </>
    )

}