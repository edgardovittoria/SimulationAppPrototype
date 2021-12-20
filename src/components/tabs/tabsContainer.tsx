import React, {useState} from 'react';
import {FaPlus, FaTimes} from "react-icons/fa";

interface TabsContainerProps {
    selectTab: Function,
    selectedTab: string
}

export const TabsContainer: React.FC<TabsContainerProps> = ({selectTab, selectedTab}) => {

    const [projectsTab, setProjectsTab] = useState<string[]>([]);

    const addNewProjectTab = () => {
        let projectLabel = 'PROJECT_'+(projectsTab.length + 1).toString()
        setProjectsTab(projectsTab.concat(projectLabel))
    }

    const closeProjectTab = (projectLabel: string) => {
        setProjectsTab(projectsTab.filter(projectTab => projectTab !== projectLabel))
    }

    return(
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={() => selectTab("DASHBOARD")}>
                    <a className={(selectedTab === 'DASHBOARD') ? 'nav-link active' : 'nav-link'} aria-current="page" href="#">Dashboard</a>
                </li>
                {projectsTab.map(projectTab => {
                    return <li className="nav-item" onClick={() => selectTab(projectTab)}>
                        <a className={(selectedTab === projectTab) ? 'nav-link active' : 'nav-link'} aria-current="page" href="#">{projectTab}</a>
                        <div className="mr-auto">
                            <FaTimes onClick={() => closeProjectTab(projectTab)}/>
                        </div>
                    </li>
                })}
                <li className="nav-item">
                    <FaPlus onClick={addNewProjectTab}/>
                </li>


            </ul>
        </>

    )

}