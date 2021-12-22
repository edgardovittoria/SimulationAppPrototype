import React, {useEffect, useState} from 'react';
import {MenuBar} from "./components/menuBar";
import './style/tabContent.css'
import {Overview} from "./components/overview";

interface TabContentProps {
    name: string,
    setShowModal: Function
}

export const TabContent: React.FC<TabContentProps> = ({name, setShowModal}) => {
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
    setShowModal: Function
}

export const FactoryContent: React.FC<FactoryContentProps> = ({menuItem, setShowModal}) => {

    const factoryContent = (menuItem: string): JSX.Element => {
        switch (menuItem) {
            case 'Overview' :
                return <Overview
                    setShowModal={setShowModal}
                />
            case 'Projects' :
                return <></>
            case 'Simulations' :
                return <></>
            case 'Modeler' :
                return <></>
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