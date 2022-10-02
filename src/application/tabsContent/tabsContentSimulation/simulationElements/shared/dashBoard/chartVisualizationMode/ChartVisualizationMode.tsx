import React from 'react';
import {GoScreenFull} from "react-icons/go";
import {BsGrid3X3Gap} from "react-icons/bs";

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
        <div className="mt-8 justify-between w-[15%]">
            <div className={`box mb-3 flex flex-col items-center ${chartVisualizationMode === 'grid' ? 'border-2 border-[#0fb25b]' : ''}`}
                 onClick={() => setChartVisualizationMode('grid')}
            >
                <BsGrid3X3Gap size={25} color="#0fb25b"/>
                <span className="text-[12px]">Grid</span>
            </div>
            <div className={`box mb-3 flex flex-col items-center ${chartVisualizationMode === 'full' ? 'border-2 border-[#0fb25b]' : ''}`}
                 onClick={() => setChartVisualizationMode('full')}
            >
                <GoScreenFull size={25} color="#0fb25b"/>
                <span className="text-[12px]">Full</span>
            </div>
        </div>
    )

}