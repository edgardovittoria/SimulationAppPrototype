import React, {useEffect, useState} from 'react';
import {MenuBar} from "./components/menuBar";
import './style/tabContent.css'
import {Overview} from "./components/overview";
import {Modeler} from "./components/modeler";
import "./components/style/overview.css"
import {Projects} from "./components/projects";
import {Project} from "../../../store/projectSlice";

interface TabContentProps {
    name: string,
    setShowModal: Function,
    projectsTab: Project[],
    setProjectsTab: Function,
    selectTab: Function
}

export const TabContent: React.FC<TabContentProps> = ({name, setShowModal, projectsTab, setProjectsTab, selectTab}) => {
    const menuItems = factoryMenuItems(name)
    const [menuItemSelected, setMenuItemSelected] = useState(menuItems[0]);

    useEffect(() => {
        setMenuItemSelected(menuItems[0])
    }, [name])

    return (
        <>
            <MenuBar setMenuItem={setMenuItemSelected} menuItem={menuItemSelected} children={menuItems}/>
            <div>
                <FactoryContent
                    menuItem={menuItemSelected}
                    setShowModal={setShowModal}
                    projectsTab={projectsTab}
                    setProjectsTab={setProjectsTab}
                    selectTab={selectTab}
                />
            </div>
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
    selectTab: Function
}

export const FactoryContent: React.FC<FactoryContentProps> = ({menuItem, setShowModal, projectsTab, setProjectsTab, selectTab}) => {

    const factoryContent = (menuItem: string): JSX.Element => {
        switch (menuItem) {
            case 'Overview' :
                return (
                    <DashBoard>
                        <Overview setShowModal={setShowModal}/>
                    </DashBoard>
                )

            case 'Projects' :
                return <DashBoard>
                    <Projects
                        setShowModal={setShowModal}
                        projectsTab={projectsTab}
                        setProjectsTab={setProjectsTab}
                        selectTab={selectTab}
                    />
                </DashBoard>
            case 'Simulations' :
                return <DashBoard>

                </DashBoard>
            case 'Modeler' :
                return <Modeler/>
            case 'Physics' :
                return <></>
            case 'Simulator' :
                return <></>
            case 'Results' :
                return <></>
            default :
                return <></>
        }
    }

    return (
        factoryContent(menuItem)
    )


}


interface DashBoardProps {
}

export const DashBoard: React.FC<DashBoardProps> = ({children}) => {
    return (
        <div className="container">
            <div className="row rowOverview justify-content-between">
                {children}
            </div>
            <div className="box boxCoreHours">
                <h5>Core Hours</h5>
            </div>
        </div>
    )

}