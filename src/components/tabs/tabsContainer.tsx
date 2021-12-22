import React from 'react';
import {FaPlus, FaTimes} from "react-icons/fa";
import './style/tabsContainer.css'
import {Project} from "../../store/projectSlice";

interface TabsContainerProps {
    selectTab: Function,
    selectedTab: string,
    projectsTab: Project[]
    setProjectsTab: Function,
    setShowModal: Function
}

export const TabsContainer: React.FC<TabsContainerProps> = (
    {selectTab, selectedTab, projectsTab, setProjectsTab, setShowModal}
) => {

    const closeProjectTab = (projectLabel: string) => {
        setProjectsTab(projectsTab.filter(projectTab => projectTab.name !== projectLabel))
        selectTab("DASHBOARD")
    }

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item navItemTabs" onClick={() => selectTab("DASHBOARD")}>
                    <div className={(selectedTab === 'DASHBOARD') ? 'nav-link active projectTab' : 'nav-link projectTabNotActive'} aria-current="page"
                      >Dashboard</div>
                </li>
                {projectsTab.map(projectTab => {
                    return <li key={projectTab.name} className="nav-item navItemTabs">
                        <div className={(selectedTab === projectTab.name) ? 'nav-link active' : 'nav-link'}>
                            <div className={(selectedTab === projectTab.name)? 'projectTab' : 'projectTabNotActive'}
                               aria-current="page" onClick={() => selectTab(projectTab.name)}>{projectTab.name}
                            </div>
                            <div className="closeIconContainer" onClick={() => closeProjectTab(projectTab.name)}>
                                <FaTimes className="closeIcon"/>
                            </div>
                        </div>

                    </li>
                })}
                <li className="nav-item addNewProject">
                    <FaPlus onClick={() => setShowModal(true)} className="addNewProjectIcon"/>
                </li>
            </ul>
        </>

    )

}