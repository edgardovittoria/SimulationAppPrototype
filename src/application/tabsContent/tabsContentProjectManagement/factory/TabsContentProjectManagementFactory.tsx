import React from 'react';
import {Project} from "../../../../model/Project";
import {RightPanel} from "../projectsManagementElements/components/rightPanel/RightPanel";
import {Overview} from "../projectsManagementElements/components/overview/Overview";
import {Projects} from "../projectsManagementElements/components/projects/Projects";
import {Simulations} from "../projectsManagementElements/components/simulations/Simulations";

interface TabsContentProjectManagementFactoryProps {
    menuItem: string,
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectProject: Function,
    removeProject: Function,
    setSimulationCoreMenuItemSelected: Function,
    setSelectedSimulation: Function
}

export const TabsContentProjectManagementFactory: React.FC<TabsContentProjectManagementFactoryProps> = (
    {
        menuItem, setShowModal, projectsTab, setProjectsTab, selectTab,
        projects, selectProject, removeProject, setSimulationCoreMenuItemSelected,
        setSelectedSimulation
    }
) => {
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
                    selectTab={selectTab}
                    setSimulationCoreMenuItemSelected={setSimulationCoreMenuItemSelected}
                    selectProject={selectProject}
                    setSelectedSimulation={setSelectedSimulation}
                />
            </RightPanel>
        default :
            return <></>
    }


}