import React from "react";
import {Project} from "../../../model/Project";
import {removeProject} from "../../../store/projectSlice";
import {Dispatch} from "@reduxjs/toolkit";
import {Popover} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";

export const popoverRight = (project: Project, dispatch: Dispatch, projectsTab: Project[], setProjectsTab: Function) => {
    return (
        <Popover id="popover-positioned-right">
            <div className="box">
                <div className="row p-2 projectsDeleteContainer">
                    <div className="col-8 projectsDeleteText" onClick={(e) => {
                        dispatch(removeProject(project.name))
                        setProjectsTab(projectsTab.filter(projectTab => projectTab.name !== project.name))
                        e.stopPropagation()
                    }}>
                        Delete
                    </div>
                    <div className="col-2">
                        <FaTrash className="projectsDeleteIcon"/>
                    </div>
                </div>
            </div>
        </Popover>
    )
}