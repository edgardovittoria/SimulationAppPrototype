import { ComponentEntity, ImportActionParamsObject, UsersState } from 'cad-library';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from "../model/Project";
import { Port, Probe, RLCParams } from "../model/Port";
import { Simulation } from "../model/Simulation";
import { Signal } from "../model/Port";
import { Folder } from "../model/Folder";


export type ProjectState = {
    projects: Folder,
    selectedProject: string | undefined,
    selectedFolder: Folder,
    selectedComponent: ComponentEntity[]
}

export const ProjectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: {
            name: "My Files",
            owner: {} as UsersState,
            sharedWith: [],
            subFolders: [],
            projectList: [],
            parent: "root"
        },
        selectedProject: undefined,
        selectedFolder: {
            name: "My Files",
            owner: {} as UsersState,
            sharedWith: [],
            subFolders: [],
            projectList: [],
            parent: "root"
        },
        selectedComponent: []
    } as ProjectState,
    reducers: {
        addProject(state: ProjectState, action: PayloadAction<Project>) {
            if (state.selectedFolder.name === "My Files" && (!projectAlreadyExists(state.projects.projectList, action.payload))) {
                state.projects.projectList.push(action.payload)
            } else {
                state.selectedFolder.projectList.push(action.payload)
                recursiveProjectAdd(state.projects.subFolders, state.selectedFolder?.name, action.payload)
            }
        },
        setFaunaDocumentId(state: ProjectState, action: PayloadAction<number>) {
            state.projects.faunaDocumentId = action.payload
        },
        setProjectsFolderToUser(state: ProjectState, action: PayloadAction<Folder>) {
            state.projects = action.payload
        },
        removeProject(state: ProjectState, action: PayloadAction<string>) {
            if (state.selectedFolder.name === "My Files") {
                state.projects.projectList = state.projects.projectList.filter(p => p.name !== action.payload)
            } else {
                state.selectedFolder.projectList = state.selectedFolder.projectList.filter(p => p.name !== action.payload)
                recursiveProjectRemove(state.projects.subFolders, state.selectedFolder.name, action.payload)
            }
        },
        selectProject(state: ProjectState, action: PayloadAction<string | undefined>) {
            if (action.payload !== undefined) {
                state.selectedProject = action.payload
            }

        },
        addFolder(state: ProjectState, action: PayloadAction<Folder>) {
            if (state.selectedFolder.name === "My Files") {
                state.projects.subFolders.push(action.payload)
            } else {
                state.selectedFolder.subFolders.push(action.payload)
                recursiveSubFoldersUpdate(state.projects.subFolders, state.selectedFolder?.name, action.payload)
            }
        },
        selectFolder(state: ProjectState, action: PayloadAction<Folder | string>) {
            if (typeof action.payload === 'string') {
                recursiveSelectFolder(state, state.projects.subFolders, action.payload)
            } else {
                state.selectedFolder = action.payload
            }

        },
        importModel(state: ProjectState, action: PayloadAction<ImportActionParamsObject>) {
            let selectedProject = findProjectByName(takeAllProjectsIn(state.projects), state.selectedProject)
            if (selectedProject) {
                selectedProject.model = action.payload.canvas
            }
        },
        selectComponent(state: ProjectState, action: PayloadAction<ComponentEntity>) {
            if (state.selectedComponent.length === 0) {
                state.selectedComponent.push(action.payload)
            } else {
                state.selectedComponent.forEach(component => {
                    if (component.keyComponent !== action.payload.keyComponent) {
                        state.selectedComponent.push(action.payload)
                    }
                })
            }
        },
        unselectComponent(state: ProjectState, action: PayloadAction<ComponentEntity>) {
            if (state.selectedComponent.length !== 0) {
                state.selectedComponent = state.selectedComponent.filter(component => component.keyComponent !== action.payload.keyComponent)
            }
        },
        resetSelectedComponents(state: ProjectState) {
            state.selectedComponent = []
        },
        createSimulation(state: ProjectState, action: PayloadAction<Simulation>) {
            let selectedProject = findProjectByName(state.projects.projectList, state.selectedProject)
            selectedProject?.simulations.push(action.payload);
            state.projects.projectList.forEach(project => {
                if (project.name === selectedProject?.name) {
                    project.simulations.push(action.payload)
                }
            })
        },
        updateSimulation(state: ProjectState, action: PayloadAction<Simulation>) {
            let selectedProject = findProjectByName(state.projects.projectList, state.selectedProject)
            if (selectedProject?.simulations) {
                selectedProject.simulations = selectedProject.simulations.filter(s => s.name !== action.payload.name)
                selectedProject.simulations.push(action.payload)
            }
            state.projects.projectList.forEach(project => {
                if (project.name === selectedProject?.name) {
                    project.simulations = selectedProject.simulations
                }
            })
        },
        addPorts(state: ProjectState, action: PayloadAction<Port | Probe>) {
            let selectedProject = findProjectByName(state.projects.projectList, state.selectedProject)
            selectedProject?.ports.push(action.payload)
        },
        selectPort(state: ProjectState, action: PayloadAction<string>) {
            let selectedProject = findProjectByName(state.projects.projectList, state.selectedProject)
            selectedProject?.ports.forEach(port => {
                port.isSelected = port.name === action.payload;
            })
        },
        deletePort(state: ProjectState, action: PayloadAction<string>) {
            let selectedProject = findProjectByName(state.projects.projectList, state.selectedProject)
            let updatedPortsArray = selectedProject?.ports.filter(port => port.name !== action.payload)
            if (selectedProject && updatedPortsArray) {
                selectedProject.ports = updatedPortsArray
            }
        },
        setPortType(state: ProjectState, action: PayloadAction<{ name: string, type: number }>) {
            let selectedProject = findProjectByName(state.projects.projectList, state.selectedProject)
            selectedProject?.ports.forEach(port => {
                if (port.category === 'port' || port.category === 'lumped') {
                    if (port.name === action.payload.name) {
                        port.type = action.payload.type
                    }
                }
            })
        },
        updatePortPosition(state: ProjectState, action: PayloadAction<{ type: 'first' | 'last' | 'probe', position: [number, number, number] }>) {
            let selectedPort = findSelectedPort(findProjectByName(state.projects.projectList, state.selectedProject))
            if (selectedPort) {
                if (selectedPort.category === 'port' || selectedPort.category === 'lumped') {
                    (action.payload.type === 'first') ? selectedPort.inputElement.transformationParams.position = action.payload.position : selectedPort.outputElement.transformationParams.position = action.payload.position
                } else if (action.payload.type === 'probe') {
                    (selectedPort as Probe).groupPosition = action.payload.position
                }
            }
        },
        setRLCParams(state: ProjectState, action: PayloadAction<RLCParams>) {
            let selectedPort = findSelectedPort(findProjectByName(state.projects.projectList, state.selectedProject));
            if (selectedPort) {
                if (selectedPort.category === 'port' || selectedPort.category === 'lumped') {
                    selectedPort.rlcParams = action.payload
                }
            }
        },
        setAssociatedSignal(state: ProjectState, action: PayloadAction<Signal>) {
            let selectedPort = findSelectedPort(findProjectByName(state.projects.projectList, state.selectedProject));
            if (selectedPort) {
                if (selectedPort.category === 'port' || selectedPort.category === 'lumped') {
                    selectedPort.associatedSignal = action.payload
                }
            }
        },
        setScreenshot(state: ProjectState, action: PayloadAction<string>) {
            let selectedProject = findProjectByName(state.projects.projectList, state.selectedProject);
            if (selectedProject) {
                selectedProject.screenshot = action.payload
            }
        }
    },
    extraReducers:
    {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
    }
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addProject, removeProject, importModel, selectProject, selectComponent, unselectComponent,
    resetSelectedComponents, createSimulation, updateSimulation, addPorts, selectPort, deletePort,
    setPortType, updatePortPosition, setRLCParams, setAssociatedSignal, setScreenshot, addFolder, selectFolder,
    setProjectsFolderToUser, setFaunaDocumentId
} = ProjectSlice.actions


export const projectsSelector = (state: { projects: ProjectState }) => state.projects.projects.projectList;
export const projectsFolderSelector = (state: { projects: ProjectState }) => state.projects.projects;
export const FolderStateSelector = (state: { projects: ProjectState }) => state.projects.projects.subFolders;
export const SelectedFolderSelector = (state: { projects: ProjectState }) => state.projects.selectedFolder;
export const selectedProjectSelector = (state: { projects: ProjectState }) => findProjectByName(state.projects.projects.projectList, state.projects.selectedProject);
export const selectedComponentSelector = (state: { projects: ProjectState }) => state.projects.selectedComponent;
export const simulationSelector = (state: { projects: ProjectState }) => findProjectByName(state.projects.projects.projectList, state.projects.selectedProject)?.simulations;
export const findProjectByName = (projects: Project[], name: string | undefined) => {
    return (name !== undefined) ? projects.filter(project => project.name === name)[0] : undefined
}

const takeAllProjectsIn = (folder: Folder): Project[] => {
    return folder.subFolders.reduce((projects, subF) => projects.concat(takeAllProjectsIn(subF)), folder.projectList)
}

export const findSelectedPort = (project: Project | undefined) => (project) ? project.ports.filter(port => port.isSelected)[0] : undefined
const projectAlreadyExists = (projects: Project[], newProject: Project) => {
    return projects.filter(project => project.name === newProject.name).length > 0 ? true : false
}

const recursiveSubFoldersUpdate = (subFolders: Folder[], parent: string, folderToAdd: Folder) => {
    subFolders.forEach(sf => {
        if (sf.name === parent) {
            sf.subFolders.push(folderToAdd)
        } else {
            recursiveSubFoldersUpdate(sf.subFolders, parent, folderToAdd)
        }
    })
}

const recursiveProjectAdd = (subFolders: Folder[], parent: string, projectToAdd: Project) => {
    subFolders.forEach(sf => {
        if (sf.name === parent && (!projectAlreadyExists(sf.projectList, projectToAdd))) {
            sf.projectList.push(projectToAdd)
        } else {
            recursiveProjectAdd(sf.subFolders, parent, projectToAdd)
        }
    })
}

const recursiveProjectRemove = (subFolders: Folder[], parent: string, projectToRemove: string) => {
    subFolders.forEach(sf => {
        if (sf.name === parent) {
            sf.projectList = sf.projectList.filter(p => p.name !== projectToRemove)
        } else {
            recursiveProjectRemove(sf.subFolders, parent, projectToRemove)
        }
    })
}

const recursiveSelectFolder = (state: ProjectState, folders: Folder[], folderToSelect: string) => {
    if (state.projects.name === folderToSelect) {
        state.selectedFolder = state.projects //add recursion
    }
    folders.forEach(f => {
        if (f.name === folderToSelect) {
            state.selectedFolder = f
        } else {
            recursiveSelectFolder(state, f.subFolders, folderToSelect)
        }
    })
}
