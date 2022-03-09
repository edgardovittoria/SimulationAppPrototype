import React from "react";
import css from "../overview/overview.module.css";

interface RightPanelProps {
}

const RightPanel: React.FC<RightPanelProps> = ({}) => {
    return (
        <div className={`box ${css.boxCoreHours}`}>
            <h5>Right Panel</h5>
        </div>
    )
}

export default React.memo(RightPanel)