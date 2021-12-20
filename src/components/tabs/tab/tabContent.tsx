import React, {useState} from 'react';
import {MenuBar} from "./components/menuBar";

interface TabContentProps {
    name: string
}

export const TabContent: React.FC<TabContentProps> = ({name}) => {

    const [menuItemSelected, setMenuItemSelected] = useState("Overview");

    return(
        <>
            <MenuBar setMenuItem={setMenuItemSelected} menuItem={menuItemSelected} children={factoryMenuItems(name)}/>
            <div>
                <FactoryContent menuItem={menuItemSelected}/>
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
    menuItem: string
}

export const FactoryContent: React.FC<FactoryContentProps> = ({menuItem}) => {

    const factoryContent = (menuItem: string) => {
        switch (menuItem) {
            case 'Overview' :
                return 'Overview'
            case 'Projects' :
                return 'Projects'
            case 'Simulations' :
                return 'Simulations'
            case 'Modeler' :
                return 'Modeler'
            case 'Physics' :
                return 'Physics'
            case 'Simulator' :
                return 'Simulator'
            case 'Results' :
                return 'Results'
        }
    }

    return(
        <div className="card" style={{width: '18rem', margin: 'auto'}}>
            <div className="card-body">
                <h5 className="card-title">{factoryContent(menuItem)}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    )



}