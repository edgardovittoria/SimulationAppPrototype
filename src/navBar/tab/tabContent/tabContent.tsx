import React, {useEffect, useState} from 'react';
import {MenuBar} from "./menuBar/menuBar";
import './tabContent.css'
import {Overview} from "../../../projectsManagementCore/components/overview/overview";
import {Modeler} from "../../../simulationCore/components/modeler/modeler";
import "../../../projectsManagementCore/components/overview/overview.css"
import {Projects} from "../../../projectsManagementCore/components/projects/projects";
import {LeftPanel} from "../../../simulationCore/components/dashBoard/leftPanel";
import {RightPanel} from "../../../projectsManagementCore/components/rightPanel/rightPanel";
import {Project} from "../../../model/Project";
import {Simulations} from "../../../projectsManagementCore/components/simulations/simulations";


interface TabContentProps {
    name: string,
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectedProject: Project | undefined,
    selectProject: Function,
    removeProject: Function,
    importModel: Function
}

export const TabContent: React.FC<TabContentProps> = (
    {name, setShowModal, projectsTab, setProjectsTab, selectTab, projects, selectedProject, selectProject, removeProject, importModel}
) => {
    const menuItems = factoryMenuItems(name)
    const [menuItemSelected, setMenuItemSelected] = useState(menuItems[0]);

    useEffect(() => {
        setMenuItemSelected(menuItems[0])
    }, [name])

    return (
        <>
            <MenuBar setMenuItem={setMenuItemSelected} menuItem={menuItemSelected} children={menuItems}/>
            <FactoryContent
                menuItem={menuItemSelected}
                setShowModal={setShowModal}
                projectsTab={projectsTab}
                setProjectsTab={setProjectsTab}
                selectTab={selectTab}
                projects={projects}
                selectedProject={selectedProject}
                removeProject={removeProject}
                selectProject={selectProject}
                importModel={importModel}
            />
        </>
    )

}

const factoryMenuItems = (tabType: string) => {
    switch (tabType) {
        case 'DASHBOARD' :
            return ['Overview', 'Projects', 'Simulations']
        default :
            return ['Modeler', 'Physics', 'Simulator', 'Results']
    }
}


interface FactoryContentProps {
    menuItem: string,
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectedProject: Project | undefined,
    selectProject: Function,
    removeProject: Function,
    importModel: Function
}

export const FactoryContent: React.FC<FactoryContentProps> = (
    {menuItem, setShowModal, projectsTab, setProjectsTab, selectTab, projects, selectedProject, selectProject, removeProject, importModel}
) => {
    const factoryContent = (menuItem: string): JSX.Element => {
        switch (menuItem) {
            case 'Overview' :
                return (
                    <RightPanel>
                        <Overview
                            setShowModal={setShowModal}
                            projectsTab={projectsTab}
                            setProjectsTab={setProjectsTab}
                            selectTab={selectTab}
                            projects={projects}
                            selectProject={selectProject}
                            removeProject={removeProject}
                        />
                    </RightPanel>
                )

            case 'Projects' :
                return <RightPanel>
                    <Projects
                        setShowModal={setShowModal}
                        projectsTab={projectsTab}
                        setProjectsTab={setProjectsTab}
                        selectTab={selectTab}
                        projects={projects}
                        selectProject={selectProject}
                        removeProject={removeProject}
                    />
                </RightPanel>
            case 'Simulations' :
                return <RightPanel>
                    <Simulations
                        projects={projects}
                    />
                </RightPanel>
            case 'Modeler' :
                return <>
                    <Modeler
                        selectedProject={selectedProject}
                        selectProject={selectProject}
                        importModel={importModel}
                    />
                    <LeftPanel secondTab="Materials"/>
                </>

            case 'Physics' :
                return <>
                    <Modeler
                        selectedProject={selectedProject}
                        selectProject={selectProject}
                        importModel={importModel}
                    />
                    <LeftPanel secondTab="Physics"/>
                </>
            case 'Simulator' :
                return <>
                    <Modeler
                        selectedProject={selectedProject}
                        selectProject={selectProject}
                        importModel={importModel}
                    />
                    <LeftPanel secondTab="Simulator"/>
                </>
            case 'Results' :
                return <>
                    <LeftPanel secondTab="Results"/>
                </>
            default :
                return <></>
        }
    }

    return (
        factoryContent(menuItem)
    )


}
