import React from 'react';
import {Project} from "../../../../../../../../model/Project";

interface ResultsProps {
    selectedProject: Project | undefined
}

export const Results: React.FC<ResultsProps> = ({selectedProject}) => {
    return(
        <>
            {(selectedProject && selectedProject.simulations.length > 0)
                ? <div className="leftPanel modelContainer">
                    Results
                </div>
                : <div className="leftPanel modelContainer">
                    <img src="/noResultsIcon.png" style={{marginTop: "100px"}}/>
                    <h5>No results to view</h5>
                    <p style={{marginTop: "50px"}}>Complete a study setup with CAD, materials, and physics, then Estimate and Run to generate results.</p>
                </div>
            }
        </>
    )

}