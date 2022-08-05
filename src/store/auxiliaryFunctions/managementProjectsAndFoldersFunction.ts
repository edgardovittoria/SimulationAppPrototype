import {Folder} from "../../model/Folder";
import {Project} from "../../model/Project";
import {ProjectState} from "../projectSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export const recursiveFindFoldersName = (folder: Folder, allFoldersName: string[]): string[] => {
    allFoldersName.push(folder.name)
    folder.subFolders.forEach(sb => recursiveFindFoldersName(sb, allFoldersName))
    return allFoldersName
}

export const takeAllProjectsIn = (folder: Folder): Project[] => {
    return folder.subFolders.reduce((projects, subF) => projects.concat(takeAllProjectsIn(subF)), folder.projectList)
}

export const projectAlreadyExists = (projects: Project[], newProject: Project) => {
    return projects.filter(project => project.name === newProject.name).length > 0
}

export const recursiveSubFoldersUpdate = (subFolders: Folder[], parent: string, folderToAdd: Folder) => {
    subFolders.forEach(sf => {
        if (sf.name === parent) {
            sf.subFolders.push(folderToAdd)
        } else {
            recursiveSubFoldersUpdate(sf.subFolders, parent, folderToAdd)
        }
    })

}

export const recursiveFolderRemove = (subFolders: Folder[], parent: string, folderToRemove: Folder) => {
    subFolders.forEach(sf => {
        if (sf.name === parent) {
            sf.subFolders = sf.subFolders.filter(f => f.name !== folderToRemove.name)
        } else {
            recursiveFolderRemove(sf.subFolders, parent, folderToRemove)
        }
    })
}

export const recursiveProjectAdd = (subFolders: Folder[], parent: string, projectToAdd: Project) => {
    subFolders.forEach(sf => {
        if (sf.name === parent && (!projectAlreadyExists(sf.projectList, projectToAdd))) {
            sf.projectList.push(projectToAdd)
        } else {
            recursiveProjectAdd(sf.subFolders, parent, projectToAdd)
        }
    })
}

export const recursiveProjectRemove = (subFolders: Folder[], parent: string, projectToRemove: string) => {
    subFolders.forEach(sf => {
        if (sf.name === parent) {
            sf.projectList = sf.projectList.filter(p => p.name !== projectToRemove)
        } else {
            recursiveProjectRemove(sf.subFolders, parent, projectToRemove)
        }
    })
}

export const recursiveSelectFolder = (state: ProjectState, folders: Folder[], folderToSelect: string) => {
    if (state.projects.name === folderToSelect) {
        state.selectedFolder = state.projects
    }
    folders.forEach(f => {
        if (f.name === folderToSelect) {
            state.selectedFolder = f
        } else {
            recursiveSelectFolder(state, f.subFolders, folderToSelect)
        }
    })
}

export const moveProject = (state: ProjectState, projectToMove: Project, targetFolder: string) => {
    if (state.selectedFolder.name === "My Files") {
        state.projects.projectList = state.projects.projectList.filter(p => p.name !== projectToMove.name)
    } else {
        recursiveProjectRemove(state.projects.subFolders, state.selectedFolder.name, projectToMove.name)
    }
    state.selectedFolder.projectList = state.selectedFolder.projectList.filter(p => p.name !== projectToMove.name)
    if(targetFolder === "My Files"){
        state.projects.projectList.push(projectToMove)
    }else{
        recursiveProjectAdd(state.projects.subFolders, targetFolder, projectToMove)
    }
}

export const moveFolder = (state: ProjectState, folderToMove: Folder, targetFolder: string) => {
    if (state.selectedFolder.name === "My Files") {
        state.projects.subFolders = state.projects.subFolders.filter(sf => sf.name !== folderToMove.name)
    } else {
        recursiveFolderRemove(state.projects.subFolders, state.selectedFolder.name, folderToMove)
    }
    state.selectedFolder.subFolders = state.selectedFolder.subFolders.filter(sf => sf.name !== folderToMove.name)
    let updatedFolder = {...folderToMove, parent: targetFolder}
    if(targetFolder === "My Files"){
        state.projects.subFolders.push(updatedFolder)
    }else{
        recursiveSubFoldersUpdate(state.projects.subFolders, targetFolder, updatedFolder)
    }
}