import React, {useMemo} from 'react';
import {Project} from "../../../../model/Project";
import RightPanel from "../projectsManagementElements/components/rightPanel/RightPanel";
import {Overview} from "../projectsManagementElements/components/overview/Overview";
import {Projects} from "../projectsManagementElements/components/projects/Projects";
import {Simulations} from "../projectsManagementElements/components/simulations/Simulations";
import {Folder} from "../../../../model/Folder";

interface TabsContentProjectManagementFactoryProps {
    menuItem: string,
    setShowModal: Function,
    setShowNewFolderModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    projects: Project[],
    folders: Folder[],
    selectedFolder: Folder,
    selectFolder: Function,
    selectProject: Function,
    removeProject: Function,
    setSimulationCoreMenuItemSelected: Function,
    setSelectedSimulation: Function,
    setMenuItem: Function,
    execQuery: Function,
    moveObject: Function,
    removeFolder: Function
}

export const TabsContentProjectManagementFactory: React.FC<TabsContentProjectManagementFactoryProps> = (
    {
        menuItem, setShowModal, setShowNewFolderModal, projectsTab, setProjectsTab, selectTab,
        projects, folders, selectedFolder, selectFolder, selectProject,
        removeProject, setSimulationCoreMenuItemSelected, setSelectedSimulation, setMenuItem, execQuery,
        moveObject, removeFolder
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
        setMenuItem={setMenuItem}
        execQuery={execQuery}
    />, [projects]);

    switch (menuItem) {
        case 'Overview' :
            return (
                <div className="container d-flex">
                    <div className="row w-75 me-4 justify-content-between">
                        {memoizedOverview}
                    </div>
                    <RightPanel/>
                </div>
            )

        case 'Projects' :
            return (
                <div className="container d-flex">
                    <div className="row w-75 me-4 justify-content-between">
                        <Projects
                            setShowModal={setShowModal}
                            setShowNewFolderModal={setShowNewFolderModal}
                            projectsTab={projectsTab}
                            setProjectsTab={setProjectsTab}
                            selectTab={selectTab}
                            projects={projects}
                            folders={folders}
                            selectedFolder={selectedFolder}
                            selectFolder={selectFolder}
                            selectProject={selectProject}
                            removeProject={removeProject}
                            execQuery={execQuery}
                            moveObject={moveObject}
                            removeFolder={removeFolder}
                        />
                    </div>
                    <RightPanel/>
                </div>
            )
        case 'Simulations' :
            return (
                <div className="container d-flex">
                    <div className="row w-75 me-4 justify-content-between">
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