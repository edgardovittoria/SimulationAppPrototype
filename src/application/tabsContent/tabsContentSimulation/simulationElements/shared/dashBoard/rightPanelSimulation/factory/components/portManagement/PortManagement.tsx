import React from 'react';

import "./portManagement.css"

interface PortManagementProps {}

export const PortManagement: React.FC<PortManagementProps> = (
    {
        children
    }
) => {
    return (
        <>
            {children}
        </>
    )

}