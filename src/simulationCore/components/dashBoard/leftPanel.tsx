import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectedProjectSelector} from "../../../store/projectSlice";
import {GiAtom, GiAtomicSlashes, GiCubeforce, GiPowerButton} from "react-icons/gi";
import {AiOutlineBarChart} from "react-icons/ai";
import {Tab, Tabs} from "react-bootstrap";
import {FactorySimulationDashboardContent} from "../../factory/factorySimulationDashboardContent";

import "./leftPanel.css"

interface DashBoardProps {
    secondTab: string,
}

export const LeftPanel: React.FC<DashBoardProps> = ({secondTab}) => {

    const [selectedTab, setSelectedTab] = useState("Modeler");
    const selectedProject = useSelector(selectedProjectSelector)


    useEffect(() => {
        setSelectedTab("Modeler")
    }, [secondTab]);


    let modelerTabTitle = <div className="row">
        <div className="col-3"><GiCubeforce color={'#00ae52'} style={{width: "25px", height: "25px"}}/></div>
        <div className="col-8">Modeler</div>
    </div>


    let materialTabTitle = <div className="row">
        <div className="col-3"><GiAtomicSlashes color={'#00ae52'} style={{width: "25px", height: "25px"}}/></div>
        <div className="col-8">Materials</div>
    </div>

    let physicsTabTitle = <div className="row">
        <div className="col-3"><GiAtom color={'#00ae52'} style={{width: "25px", height: "25px"}}/></div>
        <div className="col-8">Physics</div>
    </div>

    let simulatorTabTitle = <div className="row">
        <div className="col-3"><GiPowerButton color={'#00ae52'} style={{width: "25px", height: "25px"}}/></div>
        <div className="col-8">Simulator</div>
    </div>

    let resultsTabTitle = <div className="row">
        <div className="col-3"><AiOutlineBarChart color={'#00ae52'} style={{width: "25px", height: "25px"}}/></div>
        <div className="col-8">Results</div>
    </div>

    let tabTitles = [
        {
            key: 'Modeler',
            object: modelerTabTitle,
            icon: <GiCubeforce color={'#00ae52'} style={{width: "25px", height: "25px"}}/>
        },
        {
            key: 'Materials',
            object: materialTabTitle,
            icon: <GiAtomicSlashes color={'#00ae52'} style={{width: "25px", height: "25px"}}/>
        },
        {
            key: 'Physics',
            object: physicsTabTitle,
            icon: <GiAtom color={'#00ae52'} style={{width: "25px", height: "25px"}}/>
        },
        {
            key: 'Simulator',
            object: simulatorTabTitle,
            icon: <GiPowerButton color={'#00ae52'} style={{width: "25px", height: "25px"}}/>
        },
        {
            key: 'Results',
            object: resultsTabTitle,
            icon: <AiOutlineBarChart color={'#00ae52'} style={{width: "25px", height: "25px"}}/>
        },
    ]

    return (
        <>
            <Tabs
                activeKey={selectedTab}
                onSelect={(k) => (k) && setSelectedTab(k)}
                className="tabsContainer"
                defaultActiveKey="Modeler"
            >
                <Tab eventKey="Modeler"
                     tabClassName={(selectedTab === "Modeler") ? "" : "notActiveTab"}
                     title={
                         (selectedTab === "Modeler") ? tabTitles.filter(tabTitle => tabTitle.key === "Modeler")[0].object
                             : tabTitles.filter(tabTitle => tabTitle.key === "Modeler")[0].icon
                     }>
                    <FactorySimulationDashboardContent selectedTab={selectedTab} selectedProject={selectedProject}/>
                </Tab>
                <Tab eventKey={secondTab}
                     tabClassName={(selectedTab === secondTab) ? "" : "notActiveTab"}
                     title={
                         (selectedTab === secondTab) ? tabTitles.filter(tabTitle => tabTitle.key === secondTab)[0].object
                             : tabTitles.filter(tabTitle => tabTitle.key === secondTab)[0].icon
                     }
                >
                    <FactorySimulationDashboardContent selectedTab={selectedTab} selectedProject={selectedProject}/>
                </Tab>
            </Tabs>
        </>
    )

}