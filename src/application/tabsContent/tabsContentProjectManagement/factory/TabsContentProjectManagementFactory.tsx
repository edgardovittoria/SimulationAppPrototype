import React, {useMemo} from 'react';
import {Project} from "../../../../model/Project";
import RightPanel from "../projectsManagementElements/components/rightPanel/RightPanel";
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

    const memoizedOverview: JSX.Element = useMemo(() => <Overview
        setShowModal={setShowModal}
        projectsTab={projectsTab}
        setProjectsTab={setProjectsTab}
        selectTab={selectTab}
        projects={projects}
        selectProject={selectProject}
        removeProject={removeProject}
    />, []);

    switch (menuItem) {
        case 'Overview' :
            return (
                <div className="container">
                    <div className="row rowOverview justify-content-between">
                        {memoizedOverview}
                    </div>
                    <RightPanel/>
                </div>
            )

        case 'Projects' :
            return (
                <div className="container">
                    <div className="row rowOverview justify-content-between">
                        <Projects
                            setShowModal={setShowModal}
                            projectsTab={projectsTab}
                            setProjectsTab={setProjectsTab}
                            selectTab={selectTab}
                            projects={projects}
                            selectProject={selectProject}
                            removeProject={removeProject}
                        />
                    </div>
                    <RightPanel/>
                </div>
            )
        case 'Simulations' :
            return (
                <div className="container">
                    <div className="row rowOverview justify-content-between">
                        <Simulations
                            projects={projects}
                            selectTab={selectTab}
                            setSimulationCoreMenuItemSelected={setSimulationCoreMenuItemSelected}
                            selectProject={selectProject}
                            setSelectedSimulation={setSelectedSimulation}
                        />
                    </div>
                    <RightPanel/>
                </div>
            )
        default :
            return <></>
    }


}