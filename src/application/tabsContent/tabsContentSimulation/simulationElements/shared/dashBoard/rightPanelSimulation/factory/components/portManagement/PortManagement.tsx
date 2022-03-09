import React from 'react';
import {AiOutlineThunderbolt} from "react-icons/ai";
import {Port} from "../../../../../../../../../../model/Port";
import css from "./portManagementContainer.module.css";


interface PortManagementProps {
    selectedPort: Port | undefined
}

export const PortManagement: React.FC<PortManagementProps> = (
    {
        children, selectedPort
    }
) => {
    return (
        <>
            {
                selectedPort ?
                    <>
                        <div className={`d-flex ${css.portManagementContainerTitle}`}>
                            <div className="col-1 pe-0 ps-0">
                                <AiOutlineThunderbolt color={'#00ae52'}
                                                      style={{width: "25px", height: "25px"}}/>
                            </div>
                            <div className="col-6 text-start ps-0">
                                <h5 className="mb-0">{selectedPort.name}</h5>
                            </div>
                        </div>
                        < div className={css.portManagementContainer}>
                            {children}
                        </div>
                    </>
                    : <div className={`d-flex ${css.portManagementContainerTitle}`}>
                        <span>No Port Selected</span>
                    </div>


            }

        </>
    )

}