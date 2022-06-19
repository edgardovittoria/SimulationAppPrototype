import React, {useEffect} from "react";
import {Tab, Tabs} from "react-bootstrap";

import css from "./leftPanel.module.css";
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
    }, [tabs[1]]);

    return (
        <>
            <Tabs
                activeKey={selectedTab}
                onSelect={(k) => (k) && setSelectedTab(k)}
                className={css.tabsContainer}
                defaultActiveKey="Modeler"
            >
                {tabs.map((tab, index) => {
                    return (
                        <Tab
                            key={index}
                            eventKey={tab}
                            tabClassName={(selectedTab === tab) ? "" : css.notActiveTab}
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