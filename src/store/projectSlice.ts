import { importActionParamsObject } from '@Draco112358/cad-library';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Project} from "../model/Project";



export type ProjectState = {
    projects: Project[],
    selectedProject: Project | undefined
}

export const ProjectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        selectedProject: undefined
    } as ProjectState,
    reducers: {
        addProject(state: ProjectState, action: PayloadAction<Project>){
            state.projects.push(action.payload)
        },
        removeProject(state: ProjectState, action: PayloadAction<string>){
            state.projects = state.projects.filter(project => project.name !== action.payload)
        },
        selectProject(state: ProjectState, action: PayloadAction<string | undefined>){
            (action.payload !== undefined) ? state.selectedProject = findProjectByName(state.projects, action.payload)
                : state.selectedProject = undefined

        },
        importModel(state: ProjectState, action: PayloadAction<importActionParamsObject>){
            if(state.selectedProject && state.selectedProject.name === action.payload.id){
                state.selectedProject.model = action.payload.canvas
            }
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addProject, removeProject, importModel, selectProject
} = ProjectSlice.actions

export const projectsSelector = (state: { projects: ProjectState }) => state.projects.projects;
export const selectedProjectSelector = (state: { projects: ProjectState }) => state.projects.selectedProject;
export const findProjectByName = (projects: Project[], name: string) => {
    return projects.filter(project => project.name === name)[0]
}
