import React, {useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {FactorySimulationDashboardContent} from "./factory/FactorySimulationDashboardContent";

import "./leftPanel.css"
import {tabTitles} from "./components/modelerTabTitlesAndIcons";

interface DashBoardProps {
    tabs: string[],
    selectedTab: string
    setSelectedTab: Function
}

export const LeftPanel: React.FC<DashBoardProps> = (
    {
        tabs, children, selectedTab, setSelectedTab
    }
) => {


    useEffect(() => {
        setSelectedTab("Modeler")
        if (tabs[1] === 'Results') {
            setSelectedTab("Results")
        }
        console.log(selectedTab)
    }, [tabs[1]]);

    return (
        <>
            <Tabs
                activeKey={selectedTab}
                onSelect={(k) => (k) && setSelectedTab(k)}
                className="tabsContainer"
                defaultActiveKey="Modeler"
            >
                {tabs.map((tab, index) => {
                    return (
                        <Tab
                            key={index}
                            eventKey={tab}
                            tabClassName={(selectedTab === tab) ? "" : "notActiveTab"}
                            disabled={selectedTab === 'Results'}
                            title={
                                (selectedTab === tab) ? tabTitles.filter(tabTitle => tabTitle.key === tab)[0].object
                                    : tabTitles.filter(tabTitle => tabTitle.key === tab)[0].icon
                            }
                        >
                            {children}
                        </Tab>
                    )
                })}
            </Tabs>
        </>
    )

}