import React from "react";

interface RightPanelProps {
}

export const RightPanel: React.FC<RightPanelProps> = ({children}) => {
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