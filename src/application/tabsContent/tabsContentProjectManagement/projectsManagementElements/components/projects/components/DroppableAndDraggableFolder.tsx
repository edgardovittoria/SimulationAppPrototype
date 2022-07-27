import React, {useEffect, useState} from 'react';
import css from "../projects.module.css";
import iconCss from "../../../shared/projectManagementIcon.module.css";

import {IoMdFolder} from "react-icons/io";
import {Folder} from "../../../../../../../model/Folder";
import {useDrag, useDragDropManager, useDrop} from "react-dnd";
import {Project} from "../../../../../../../model/Project";
import {updateFolderOrProject} from "../../../../../../../faunadb/api/projectsFolderAPIs";
import {store} from "../../../../../../../store/store";
import {Menu, Item, Separator, useContextMenu, TriggerEvent} from 'react-contexify';
import {BiTrash} from "react-icons/bi";

interface DroppableAndDraggableFolderProps {
    selectFolder: Function,
    selectedFolder: Folder,
    folder: Folder,
    moveObject: Function,
    execQuery: Function,
    removeFolder: Function,
    path: string[],
    setPath: Function
}

export const DroppableAndDraggableFolder: React.FC<DroppableAndDraggableFolderProps> = (
    {
        selectFolder, selectedFolder, folder, moveObject, execQuery, removeFolder, path, setPath
    }
) => {

    const [dragDone, setDragDone] = useState(false);
    const [dropTargetFolder, setDropTargetFolder] = useState("");

    const [{isOver}, drop] = useDrop(() => ({
        accept: ['PROJECT', 'FOLDER'],
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        drop() {
            setDropTargetFolder(folder.name)
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
            let projectToMove: Project | Folder = dragAndDropManager.getMonitor().getItem()
            moveObject({
                projectToMove: projectToMove,
                targetFolder: dropTargetFolder
            })
            execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {
            })
        }
        setDragDone(false)
    }, [dragDone]);

    const { show } = useContextMenu({
        id: folder.name,
    });

    function handleContextMenu(event: any){
        event.preventDefault();
        show(event)
    }

    const handleItemClick = ({ event, props } : any) => console.log(event,props);

    return (
        <>
                <div className={`${css.folderBox} col-3`}
                     ref={ref => {
                         drag(drop(ref))
                     }}
                     onContextMenu={handleContextMenu}
                     key={folder.name}
                     role='Dustbin'
                     style={{backgroundColor: isOver ? '#e6e6e6' : 'white', opacity: isDragging ? 0.5 : 1}}
                     onDoubleClick={() => {
                         setPath([...path, folder.name])
                         selectFolder(folder.name)
                     }}>
                    <IoMdFolder className="me-2"
                                style={{width: "35px", height: "35px"}}
                                color={"#7a7b7d"}
                    />
                    <span className="fw-bold fs-6 text-black-50">{folder.name}</span>

                    <Menu id={folder.name}>

                        <Item data={folder} onClick={(data) => {
                            removeFolder(data.data)
                            execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {})
                        }}>
                            <BiTrash
                                className={`${iconCss.deleteIcon} me-3`}
                                color="red"
                                size="20px"
                            />
                            Delete
                        </Item>
                        {/*<Item data={folder} onClick={(data) => {
                            removeFolder(data.data)
                            execQuery(updateFolderOrProject, store.getState().projects.projects).then(() => {})
                        }}>
                            <BiTrash
                                className={`${iconCss.deleteIcon} me-3`}
                                color="red"
                                size="20px"
                            />
                            Move
                        </Item>*/}
                    </Menu>

                </div>


        </>

    )

}