import React from "react";
import {Project} from "../../../../../../model/Project";
import {Popover} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import css from "../../components/projects/projects.module.css";

export const popoverRight = (project: Project, removeProject: Function, projectsTab: Project[], setProjectsTab: Function) => {
    return (
        <Popover id="popover-positioned-right">
            <div className="box">
                <div className={`row p-2 ${css.projectsDeleteContainer}`}>
                    <div className={`col-8 ${css.projectsDeleteText}`} onClick={(e) => {
                        removeProject(project.name)
                        setProjectsTab(projectsTab.filter(projectTab => projectTab.name !== project.name))
                        e.stopPropagation()
                    }}>
                        Delete
                    </div>
                    <div className="col-2">
                        <FaTrash className={css.projectsDeleteIcon}/>
                    </div>
                </div>
            </div>
        </Popover>
    )
}