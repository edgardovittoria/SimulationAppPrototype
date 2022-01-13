import React from 'react';
import {FaBell, FaPlus, FaTimes, FaUser} from "react-icons/fa";
import './tabsContainer.css'
import {Project} from "../../model/Project";

interface TabsContainerProps {
    selectTab: Function,
    selectedTab: string,
    projectsTab: Project[]
    setProjectsTab: Function,
    setShowModal: Function,
    selectProject: Function,
    resetSelectedComponentsArray: Function
}

export const TabsContainer: React.FC<TabsContainerProps> = (
    {selectTab, selectedTab, projectsTab, setProjectsTab, setShowModal, selectProject, resetSelectedComponentsArray}
) => {

    const closeProjectTab = (projectLabel: string) => {
        setProjectsTab(projectsTab.filter(projectTab => projectTab.name !== projectLabel))
        selectTab("DASHBOARD")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">SimulationApp</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav nav-tabs">
                            <li className="nav-item navItemTabs" onClick={() => {
                                selectTab("DASHBOARD")
                                selectProject(undefined)
                                resetSelectedComponentsArray()
                            }}>
                                <div
                                    className={(selectedTab === 'DASHBOARD') ? 'nav-link active projectTab' : 'nav-link projectTabNotActive'}
                                    aria-current="page"
                                >Dashboard
                                </div>
                            </li>
                            {projectsTab.map(projectTab => {
                                return <li key={projectTab.name} className="nav-item navItemTabs">
                                    <div className={(selectedTab === projectTab.name) ? 'nav-link active' : 'nav-link'}>
                                        <div
                                            className={(selectedTab === projectTab.name) ? 'projectTab' : 'projectTabNotActive'}
                                            aria-current="page" onClick={() => {
                                            selectTab(projectTab.name)
                                            selectProject(projectTab.name)
                                            resetSelectedComponentsArray()
                                        }}>{projectTab.name}
                                        </div>
                                        <div className="closeIconContainer" onClick={() => {
                                            closeProjectTab(projectTab.name)
                                            selectProject(undefined)
                                            resetSelectedComponentsArray()
                                        }}>
                                            <FaTimes className="closeIcon"/>
                                        </div>
                                    </div>

                                </li>
                            })}
                            <li className="nav-item addNewProject">
                                <FaPlus onClick={() => setShowModal(true)} className="addNewProjectIcon"/>
                            </li>
                        </ul>
                    </div>
                    <div className="mr-auto notificationContainer">
                        <FaBell className="notificationIcon"/>
                        <FaUser className="userIcon"/>
                    </div>
                </div>
            </nav>
        </>

    )

}