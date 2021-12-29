import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Project = {
    name: string,
    description: string,
    model: string, //TODO: replace string with the correct type of the model
    materials: string, //TODO: replace string with the correct type of the materials
    physics: string, //TODO: replace string with the correct type of the physics (ports)
    simulations: string, //TODO: replace string with the correct type of the simulation
}

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
        importModel(state: ProjectState, action: PayloadAction<{name: string, model: string}>){
            state.projects.map(project => {
                if(project.name === action.payload.name){
                    project.model = action.payload.model
                }
                return 'project updated'
            })
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
