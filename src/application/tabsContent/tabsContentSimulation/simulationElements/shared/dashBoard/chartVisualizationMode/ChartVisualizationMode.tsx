import React from 'react';
import {BsGrid3X3Gap} from "react-icons/bs";
import {GiHamburgerMenu} from "react-icons/gi";

interface ChartVisualizationModeProps {
    chartVisualizationMode: 'grid' | 'full',
    setChartVisualizationMode: Function
}

export const ChartVisualizationMode: React.FC<ChartVisualizationModeProps> = (
    {
        chartVisualizationMode, setChartVisualizationMode
    }
) => {

    return(
        <div className="mt-11 flex justify-end">
            <div className={`box p-[5px] mb-3 flex flex-col items-center ${chartVisualizationMode === 'grid' ? 'border-2 border-[#0fb25b]' : ''}`}
                 onClick={() => setChartVisualizationMode('grid')}
            >
                <BsGrid3X3Gap size={20} color="#0fb25b"/>
            </div>
            <div className={`box p-[5px] ml-2 mb-3 flex flex-col items-center ${chartVisualizationMode === 'full' ? 'border-2 border-[#0fb25b]' : ''}`}
                 onClick={() => setChartVisualizationMode('full')}
            >
                <GiHamburgerMenu size={20} color="#0fb25b"/>
            </div>
        </div>
    )

}