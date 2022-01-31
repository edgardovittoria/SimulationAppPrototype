import React from "react";

interface RightPanelProps {
}

const RightPanel: React.FC<RightPanelProps> = ({}) => {
    return (
        <div className="box boxCoreHours">
            <h5>Right Panel</h5>
        </div>
    )
}

export default React.memo(RightPanel)