import React, {ReactNode} from 'react';
interface ResultsContentProps {

}

export const ResultsContent: React.FC<ResultsContentProps> = (
    {
        children
    }
) => {

    const [leftPanel, lineChart] = children as ReactNode[]

    return (
        <div className="row">
            <div className="col-2">
                {leftPanel}
            </div>
            <div className="col-10 p-5">
                {lineChart}
            </div>
        </div>
    )

}