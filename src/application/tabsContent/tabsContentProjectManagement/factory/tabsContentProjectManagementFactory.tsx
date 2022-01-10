import React from 'react';
import {Project} from "../../../../model/Project";
import {RightPanel} from "../projectsManagementElements/components/rightPanel/rightPanel";
import {Overview} from "../projectsManagementElements/components/overview/overview";
import {Projects} from "../projectsManagementElements/components/projects/projects";
import {Simulations} from "../projectsManagementElements/components/simulations/simulations";

interface TabsContentProjectManagementFactoryProps {
    menuItem: string,
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    selectProject: Function,
    removeProject: Function,
}

export const TabsContentProjectManagementFactory: React.FC<TabsContentProjectManagementFactoryProps> = (
    {
        menuItem, setShowModal, projectsTab, setProjectsTab, selectTab,
        projects, selectProject, removeProject,
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
                />
            </RightPanel>
        default :
            return <></>
    }


}