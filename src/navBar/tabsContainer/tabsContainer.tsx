import React from 'react';
import {FaPlus, FaTimes} from "react-icons/fa";
import './tabsContainer.css'
import {Project} from "../../model/Project";

interface TabsContainerProps {
    selectTab: Function,
    selectedTab: string,
    projectsTab: Project[]
    setProjectsTab: Function,
    setShowModal: Function,
    selectProject: Function
}

export const TabsContainer: React.FC<TabsContainerProps> = (
    {selectTab, selectedTab, projectsTab, setProjectsTab, setShowModal, selectProject}
) => {

    const closeProjectTab = (projectLabel: string) => {
        setProjectsTab(projectsTab.filter(projectTab => projectTab.name !== projectLabel))
        selectTab("DASHBOARD")
    }

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item navItemTabs" onClick={() => {
                    selectTab("DASHBOARD")
                    //dispatch(selectProject(undefined))
                    selectProject(undefined)
                }}>
                    <div className={(selectedTab === 'DASHBOARD') ? 'nav-link active projectTab' : 'nav-link projectTabNotActive'} aria-current="page"
                      >Dashboard</div>
                </li>
                {projectsTab.map(projectTab => {
                    return <li key={projectTab.name} className="nav-item navItemTabs">
                        <div className={(selectedTab === projectTab.name) ? 'nav-link active' : 'nav-link'}>
                            <div className={(selectedTab === projectTab.name)? 'projectTab' : 'projectTabNotActive'}
                               aria-current="page" onClick={() => {
                                   selectTab(projectTab.name)
                                //dispatch(selectProject(projectTab.name))
                                selectProject(projectTab.name)
                            }}>{projectTab.name}
                            </div>
                            <div className="closeIconContainer" onClick={() => {
                                closeProjectTab(projectTab.name)
                                //dispatch(selectProject(undefined))
                                selectProject(undefined)
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
        </>

    )

}