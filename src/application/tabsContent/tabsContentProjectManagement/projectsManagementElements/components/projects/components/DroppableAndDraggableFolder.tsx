import React, {useEffect, useState} from 'react';
import css from "../projects.module.css";
import iconCss from "../../../shared/projectManagementIcon.module.css";

import {IoMdFolder} from "react-icons/io";
import {Folder} from "../../../../../../../model/Folder";
import {useDrag, useDragDropManager, useDrop} from "react-dnd";
import {Project} from "../../../../../../../model/Project";
import {addIDInFolderProjectsList, addIDInSubFoldersList, deleteFolderFromFauna, deleteSimulationProjectFromFauna, getAllProjectsWithinThisFolder, getAllSubFoldersOfThisOne, removeIDInFolderProjectsList, removeIDInSubFoldersList} from "../../../../../../../faunadb/api/projectsFolderAPIs";
import {Menu, Item, Separator, useContextMenu, Submenu} from 'react-contexify';
import {BiRename, BiShareAlt, BiTrash} from "react-icons/bi";
import {BsFillFolderSymlinkFill} from "react-icons/bs"
import {useDispatch, useSelector} from "react-redux";
import {
    allProjectFoldersSelector,
    moveObject, removeFolder,
    SelectedFolderSelector,
    selectFolder
} from "../../../../../../../store/projectSlice";
import {useFaunaQuery} from "cad-library";

interface DroppableAndDraggableFolderProps {
    folder: Folder,
    path: Folder[],
    setPath: Function,
}

export const DroppableAndDraggableFolder: React.FC<DroppableAndDraggableFolderProps> = (
    {
        folder, path, setPath
    }
) => {

    const dispatch = useDispatch()
    const {execQuery} = useFaunaQuery()
    const selectedFolder = useSelector(SelectedFolderSelector)
    const allProjectFolders = useSelector(allProjectFoldersSelector)

    const [dragDone, setDragDone] = useState(false);
    const [dropTargetFolder, setDropTargetFolder] = useState({} as Folder);

    const [{isOver}, drop] = useDrop(() => ({
        accept: ['PROJECT', 'FOLDER'],
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop() {
            setDropTargetFolder(folder)
            setDragDone(true)
        }
    }), [selectedFolder.name, selectedFolder.projectList])

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'FOLDER',
        item: folder,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [selectedFolder.name, selectedFolder.projectList.length])

    let dragAndDropManager = useDragDropManager()

    useEffect(() => {

        if (dragDone) {
            let objectToMove: Project | Folder = dragAndDropManager.getMonitor().getItem()
            dispatch(moveObject({
                objectToMove: objectToMove,
                targetFolder: dropTargetFolder.faunaDocumentId as string
            }))
            if("model" in objectToMove){
                execQuery(removeIDInFolderProjectsList, objectToMove.faunaDocumentId, selectedFolder)
                execQuery(addIDInFolderProjectsList, objectToMove.faunaDocumentId, dropTargetFolder)
            }else{
                execQuery(removeIDInSubFoldersList, objectToMove.faunaDocumentId, selectedFolder)
                execQuery(addIDInSubFoldersList, objectToMove.faunaDocumentId, dropTargetFolder)
            }
        }
        setDragDone(false)
    }, [dragDone]);

    const {show} = useContextMenu({
        id: folder.name,
    });

    function handleContextMenu(event: any) {
        event.preventDefault();
        show(event)
    }


    return (
            <div className={`${css.folderBox} col-3`}
                 ref={ref => {
                     drag(drop(ref))
                 }}
                 onContextMenu={handleContextMenu}
                 key={folder.name}
                 role='Dustbin'
                 style={{backgroundColor: isOver ? '#e6e6e6' : 'white', opacity: isDragging ? 0.5 : 1}}
                 onDoubleClick={() => {
                     setPath([...path, folder])
                     dispatch(selectFolder(folder.faunaDocumentId as string))
                 }}>
                <IoMdFolder className="me-2"
                            style={{width: "35px", height: "35px"}}
                            color={"#7a7b7d"}
                />
                <span className="fw-bold fs-6 text-black-50">{folder.name}</span>

                <Menu id={folder.name}>
                    <Submenu label={
                        <>
                            <BsFillFolderSymlinkFill
                                className={`${iconCss.deleteIcon} me-3`}
                                color={'#29686EFF'}
                                size="20px"
                            />
                            Move
                        </>
                    }>
                        {allProjectFolders.filter(n => n.faunaDocumentId !== folder.parent && n.faunaDocumentId !== folder.faunaDocumentId).map(f => {
                            return (
                                <div key={f.faunaDocumentId}>
                                    <Item onClick={() => {
                                        dispatch(moveObject({
                                            objectToMove: folder,
                                            targetFolder: f.faunaDocumentId as string
                                        }))
                                        execQuery(removeIDInSubFoldersList, folder.faunaDocumentId, selectedFolder)
                                        execQuery(addIDInSubFoldersList, folder.faunaDocumentId, f)
                                    }}>{f.name}</Item>
                                </div>
                            )
                        })}
                    </Submenu>
                    <Item onClick={() => {
                    }} disabled>
                        <BiRename
                            className="me-3"
                            color={'#29686EFF'}
                            size="20px"
                        />
                        Rename
                    </Item>
                    <Separator/>
                    <Item onClick={() => {
                    }} disabled>
                        <BiShareAlt
                            className="me-3"
                            color={'#29686EFF'}
                            size="20px"
                        />
                        Share
                    </Item>
                    <Separator/>
                    <Item onClick={() => {
                        let folderIDsToDelete = [folder.faunaDocumentId, ...getAllSubFoldersOfThisOne(folder)]
                        let projectsIDsToDelete = getAllProjectsWithinThisFolder(folder)
                        folderIDsToDelete.forEach(f => execQuery(deleteFolderFromFauna, f))
                        projectsIDsToDelete.forEach(p => execQuery(deleteSimulationProjectFromFauna, p))
                        execQuery(removeIDInSubFoldersList, folder.faunaDocumentId, selectedFolder)
                        dispatch(removeFolder(folder))
                    }}>
                        <BiTrash
                            className={`${iconCss.deleteIcon} me-3`}
                            color={'#29686EFF'}
                            size="20px"
                        />
                        Delete
                    </Item>
                </Menu>
            </div>
    )

}