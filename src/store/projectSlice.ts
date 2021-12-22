import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Project = {
    name: string,
    description: string
}

export type ProjectState = {
    projects: Project[]
}

export const ProjectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: []
    } as ProjectState,
    reducers: {
        addProject(state: ProjectState, action: PayloadAction<Project>){
            state.projects.push(action.payload)
        },
        removeProject(state: ProjectState, action: PayloadAction<string>){
            state.projects = state.projects.filter(project => project.name !== action.payload)
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addProject, removeProject
} = ProjectSlice.actions

export const projectsSelector = (state: { projects: ProjectState }) => state.projects.projects;
export const findProjectByName = (projects: Project[], name: string) => {
    return projects.filter(project => project.name === name)[0]
}
