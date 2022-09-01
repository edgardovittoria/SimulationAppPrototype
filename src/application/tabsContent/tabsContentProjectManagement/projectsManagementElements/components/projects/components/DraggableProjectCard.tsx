import React from 'react';
import {useDrag} from "react-dnd";
import css from "../projects.module.css";
import {ProjectManagementIcons} from "../../../shared/ProjectManagementIcons";
import {Project} from "../../../../../../../model/Project";
import {Folder} from "../../../../../../../model/Folder";
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";
import {
    addIDInFolderProjectsList,
    deleteSimulationProjectFromFauna,
    removeIDInFolderProjectsList
} from "../../../../../../../faunadb/api/projectsFolderAPIs";
import {store} from "../../../../../../../store/store";
import {BiExport, BiRename, BiShareAlt, BiTrash} from "react-icons/bi";
import iconCss from "../../../shared/projectManagementIcon.module.css";
import {BsFillFolderSymlinkFill} from "react-icons/bs";
import {exportSimulationProject} from "../../../../../../../importExport/exportFunctions";
import {useDispatch, useSelector} from "react-redux";
import {
    allProjectFoldersSelector,
    moveObject,
    removeProject,
    SelectedFolderSelector
} from "../../../../../../../store/projectSlice";
import {useFaunaQuery} from "cad-library";

interface DraggableProjectCardProps {
    project: Project,
    projectsTab: Project[],
    setProjectsTab: Function,
    handleCardClick: Function,
}

export const DraggableProjectCard: React.FC<DraggableProjectCardProps> = (
    {
        project, setProjectsTab, projectsTab, handleCardClick
    }
) => {

    const dispatch = useDispatch()
    const {execQuery} = useFaunaQuery()
    const selectedFolder = useSelector(SelectedFolderSelector)
    const allProjectFolders = useSelector(allProjectFoldersSelector)

    const [{isDragging}, drag, dragPreview] = useDrag(() => ({
        // "type" is required. It is used by the "accept" specification of drop targets.
        type: 'PROJECT',
        item: project,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [selectedFolder.name, selectedFolder.projectList.length])

    const {show} = useContextMenu({
        id: project.name,
    });

    function handleContextMenu(event: any) {
        event.preventDefault();
        show(event)
    }

    return (
        <>
            <div
                className="box w-[25%] p-[15px] border-2 border-green-200 mr-6 mt-4 rounded-lg hover:cursor-pointer hover:border-secondaryColor"
                key={project.name} ref={dragPreview}
                onClick={() => handleCardClick(project)}
                style={{opacity: isDragging ? 0.5 : 1}} onContextMenu={handleContextMenu}>
                <div className="font-[500] text-center" role="Handle" ref={drag}>
                    {(project.name.length > 11) ? project.name.substr(0, 11) + '...' : project.name}
                </div>
                <div>
                    <img className="w-[100%] scale-150" alt="project_screenshot"
                         src={(project.screenshot) ? project.screenshot : "/noResultsIconForProject.png"}
                    />
                </div>
                <hr className="mt-0"/>
                <div>
                    {(project.description.length > 20) ? project.description.substr(0, 20) + '...' : project.description}
                </div>
                <Menu id={project.name}>
                    <Submenu label={
                        <>
                            <BsFillFolderSymlinkFill
                                className="mr-4 text-primaryColor w-[20px] h-[20px]"
                            />
                            Move
                        </>
                    }>
                        {allProjectFolders.filter(n => n.faunaDocumentId !== selectedFolder.faunaDocumentId).map(f => {
                            return (
                                <div key={f.faunaDocumentId}>
                                    <Item onClick={() => {
                                        dispatch(moveObject({
                                            objectToMove: project,
                                            targetFolder: f.faunaDocumentId as string
                                        }))
                                        execQuery(removeIDInFolderProjectsList, project.faunaDocumentId, selectedFolder)
                                        execQuery(addIDInFolderProjectsList, project.faunaDocumentId, f)
                                    }}>{f.name}</Item>
                                </div>

                            )
                        })}
                    </Submenu>
                    <Item onClick={() => {
                    }} disabled>
                        <BiRename
                            className="mr-4 text-primaryColor w-[20px] h-[20px]"
                        />
                        Rename
                    </Item>
                    <Separator/>
                    <Item onClick={() => exportSimulationProject(project)}>
                        <BiExport
                            className="mr-4 text-primaryColor w-[20px] h-[20px]"
                        />
                        Export
                    </Item>
                    <Item onClick={() => {
                    }} disabled>
                        <BiShareAlt
                            className="mr-4 text-primaryColor w-[20px] h-[20px]"
                        />
                        Share
                    </Item>
                    <Separator/>
                    <Item onClick={() => {
                        dispatch(removeProject(project.faunaDocumentId as string))
                        setProjectsTab(projectsTab.filter(p => p.name !== project.name))
                        execQuery(deleteSimulationProjectFromFauna, project.faunaDocumentId)
                        execQuery(removeIDInFolderProjectsList, project.faunaDocumentId, selectedFolder)
                    }}>
                        <BiTrash
                            className="mr-4 text-primaryColor w-[20px] h-[20px]"
                        />
                        Delete
                    </Item>
                </Menu>
            </div>
        </>
    )

}