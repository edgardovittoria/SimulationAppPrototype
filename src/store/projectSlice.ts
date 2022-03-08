import { ComponentEntity, ImportActionParamsObject } from '@Draco112358/cad-library';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from "../model/Project";
import { Port, RLCParams } from "../model/Port";
import { Simulation } from "../model/Simulation";
import {Signal} from "../model/Port";


export type ProjectState = {
    projects: Project[],
    selectedProject: string | undefined,
    selectedComponent: ComponentEntity[]
}

export const ProjectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        selectedProject: undefined,
        selectedComponent: []
    } as ProjectState,
    reducers: {
        addProject(state: ProjectState, action: PayloadAction<Project>) {
            (!projectAlreadyExists(state.projects, action.payload)) && state.projects.push(action.payload)
        },
        removeProject(state: ProjectState, action: PayloadAction<string>) {
            state.projects = state.projects.filter(project => project.name !== action.payload)
        },
        selectProject(state: ProjectState, action: PayloadAction<string | undefined>) {
            if (action.payload !== undefined) { state.selectedProject = action.payload }

        },
        importModel(state: ProjectState, action: PayloadAction<ImportActionParamsObject>) {
            let selectedProject = findProjectByName(state.projects, state.selectedProject)
            if (selectedProject && selectedProject.name === action.payload.id) {
                selectedProject.model = action.payload.canvas
            }
            state.projects.map(project => {
                if (project.name === action.payload.id) {
                    project.model = action.payload.canvas
                }
                return 'model imported'
            })
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
            let selectedProject = findProjectByName(state.projects, state.selectedProject)
            selectedProject?.simulations.push(action.payload);
            state.projects.forEach(project => {
                if (project.name === selectedProject?.name) {
                    project.simulations.push(action.payload)
                }
            })
        },
        updateSimulation(state: ProjectState, action: PayloadAction<Simulation>) {
            let selectedProject = findProjectByName(state.projects, state.selectedProject)
            if (selectedProject?.simulations) {
                selectedProject.simulations = selectedProject.simulations.filter(s => s.name !== action.payload.name)
                selectedProject.simulations.push(action.payload)
            }
            state.projects.forEach(project => {
                if (project.name === selectedProject?.name) {
                    project.simulations = selectedProject.simulations
                }
            })
        },
        addPorts(state: ProjectState, action: PayloadAction<Port>) {
            let selectedProject = findProjectByName(state.projects, state.selectedProject)
            selectedProject?.ports.push(action.payload)
        },
        selectPort(state: ProjectState, action: PayloadAction<string>) {
            let selectedProject = findProjectByName(state.projects, state.selectedProject)
            selectedProject?.ports.forEach(port => {
                if (port.name === action.payload) {
                    port.isSelected = true
                } else {
                    port.isSelected = false
                }
            })
        },
        deletePort(state: ProjectState, action: PayloadAction<string>) {
            let selectedProject = findProjectByName(state.projects, state.selectedProject)
            let updatedPortsArray = selectedProject?.ports.filter(port => port.name !== action.payload)
            if (selectedProject && updatedPortsArray) {
                selectedProject.ports = updatedPortsArray
            }
        },
        setPortType(state: ProjectState, action: PayloadAction<{ name: string, type: number }>) {
            let selectedProject = findProjectByName(state.projects, state.selectedProject)
            selectedProject?.ports.forEach(port => {
                if (port.name === action.payload.name) {
                    port.type = action.payload.type
                }
            })
        },
        updatePortPosition(state: ProjectState, action: PayloadAction<{ type: 'first' | 'last', position: [number, number, number] }>) {
            let selectedPort = findSelectedPort(findProjectByName(state.projects, state.selectedProject))
            if (selectedPort) {
                (action.payload.type === 'first') ? selectedPort.inputElement.transformationParams.position = action.payload.position : selectedPort.outputElement.transformationParams.position = action.payload.position
            }
        },
        setRLCParams(state: ProjectState, action: PayloadAction<RLCParams>) { 
            let selectedPort = findSelectedPort(findProjectByName(state.projects, state.selectedProject));
            if(selectedPort){
                selectedPort.rlcParams = action.payload
            }
        },
        setAssociatedSignal(state: ProjectState, action: PayloadAction<Signal>){
            let selectedPort = findSelectedPort(findProjectByName(state.projects, state.selectedProject));
            if(selectedPort){
                selectedPort.associatedSignal = action.payload
            }
        },
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
    }
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addProject, removeProject, importModel, selectProject, selectComponent, unselectComponent,
    resetSelectedComponents, createSimulation, updateSimulation, addPorts, selectPort, deletePort,
    setPortType, updatePortPosition, setRLCParams, setAssociatedSignal
} = ProjectSlice.actions


export const projectsSelector = (state: { projects: ProjectState }) => state.projects.projects;
export const selectedProjectSelector = (state: { projects: ProjectState }) => findProjectByName(state.projects.projects, state.projects.selectedProject);
export const selectedComponentSelector = (state: { projects: ProjectState }) => state.projects.selectedComponent;
export const simulationSelector = (state: { projects: ProjectState }) => findProjectByName(state.projects.projects, state.projects.selectedProject)?.simulations;
export const findProjectByName = (projects: Project[], name: string | undefined) => {
    return (name !== undefined) ? projects.filter(project => project.name === name)[0] : undefined
}

export const findSelectedPort = (project: Project | undefined) => (project) ? project.ports.filter(port => port.isSelected)[0] : undefined
const projectAlreadyExists = (projects: Project[], newProject: Project) => { return projects.filter(project => project.name === newProject.name).length > 0 ? true : false}
