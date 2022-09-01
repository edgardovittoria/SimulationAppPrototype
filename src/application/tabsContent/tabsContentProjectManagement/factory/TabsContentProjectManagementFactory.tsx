import React from 'react';
import {Project} from "../../../../model/Project";
import RightPanel from "../projectsManagementElements/components/rightPanel/RightPanel";
import {Overview} from "../projectsManagementElements/components/overview/Overview";
import {Projects} from "../projectsManagementElements/components/projects/Projects";
import {Simulations} from "../projectsManagementElements/components/simulations/Simulations";


interface TabsContentProjectManagementFactoryProps {
    menuItem: string,
    setShowModal: Function,
    setShowNewFolderModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function,
    setSimulationCoreMenuItemSelected: Function,
    setSelectedSimulation: Function,
    setMenuItem: Function,
}

export const TabsContentProjectManagementFactory: React.FC<TabsContentProjectManagementFactoryProps> = (
    {
        menuItem, setShowModal, setShowNewFolderModal, projectsTab, setProjectsTab, selectTab,
        setSimulationCoreMenuItemSelected, setSelectedSimulation, setMenuItem
    }
) => {

    switch (menuItem) {
        case 'Overview' :
            return (
                <div className="container flex">
                    <div className="row w-4/5 mr-7 justify-between">
                        <Overview
                            setShowModal={setShowModal}
                            projectsTab={projectsTab}
                            setProjectsTab={setProjectsTab}
                            selectTab={selectTab}
                            setMenuItem={setMenuItem}
                            setSimulationCoreMenuItemSelected={setSimulationCoreMenuItemSelected}
                            setSelectedSimulation={setSelectedSimulation}
                        />
                    </div>
                    <RightPanel/>
                </div>
            )

        case 'Projects' :
            return (
                <div className="container flex">
                    <div className="row w-75 mr-7 justify-between">
                        <Projects
                            setShowModal={setShowModal}
                            setShowNewFolderModal={setShowNewFolderModal}
                            projectsTab={projectsTab}
                            setProjectsTab={setProjectsTab}
                            selectTab={selectTab}
                        />
                    </div>
                    <RightPanel/>
                </div>
            )
        case 'Simulations' :
            return (
                <div className="container d-flex">
                    <div className="row w-75 me-4 justify-content-between box">
                        <h4 className="">Simulations</h4>
                        <Simulations
                            selectTab={selectTab}
                            setSimulationCoreMenuItemSelected={setSimulationCoreMenuItemSelected}
                            setSelectedSimulation={setSelectedSimulation}
                            setProjectsTab={setProjectsTab}
                            projectsTab={projectsTab}
                        />
                    </div>
                    <RightPanel/>
                </div>
            )
        default :
            return <></>
    }


}