import React, {useEffect, useState} from 'react';
import {MenuBar} from "./menuBar/menuBar";
import './tabContent.css'
import {Overview} from "../../../projectsManagementCore/components/overview/overview";
import {Modeler} from "../../../simulationCore/components/modeler/modeler";
import "../../../projectsManagementCore/components/overview/overview.css"
import {Projects} from "../../../projectsManagementCore/components/projects/projects";
import {LeftPanel} from "../../../simulationCore/components/dashBoard/leftPanel";
import {RightPanel} from "../../../projectsManagementCore/components/rightPanel/rightPanel";
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
            <FactoryContent
                menuItem={menuItemSelected}
                setShowModal={setShowModal}
                projectsTab={projectsTab}
                setProjectsTab={setProjectsTab}
                selectTab={selectTab}
            />
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

export const FactoryContent: React.FC<FactoryContentProps> = ({
                                                                  menuItem,
                                                                  setShowModal,
                                                                  projectsTab,
                                                                  setProjectsTab,
                                                                  selectTab
                                                              }) => {

    const factoryContent = (menuItem: string): JSX.Element => {
        switch (menuItem) {
            case 'Overview' :
                return (
                    <RightPanel>
                        <Overview
                            setShowModal={setShowModal}
                            projectsTab={projectsTab}
                            setProjectsTab={setProjectsTab}
                            selectTab={selectTab}
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
                    />
                </RightPanel>
            case 'Simulations' :
                return <RightPanel>

                </RightPanel>
            case 'Modeler' :
                return <>
                    <Modeler/>
                    <LeftPanel secondTab="Materials"/>
                </>

            case 'Physics' :
                return <>
                    <Modeler/>
                    <LeftPanel secondTab="Physics"/>
                </>
            case 'Simulator' :
                return <>
                    <Modeler/>
                    <LeftPanel secondTab="Simulator"/>
                </>
            case 'Results' :
                return <>
                    <LeftPanel secondTab="Results"/>
                </>
            default :
                return <></>
        }
    }

    return (
        factoryContent(menuItem)
    )


}
