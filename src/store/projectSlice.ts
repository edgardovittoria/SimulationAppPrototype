import {ComponentEntity, ImportActionParamsObject} from '@Draco112358/cad-library';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Project} from "../model/Project";
import {Material} from "../model/Material";



export type ProjectState = {
    projects: Project[],
    selectedProject: Project | undefined,
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
        importModel(state: ProjectState, action: PayloadAction<ImportActionParamsObject>){
            if(state.selectedProject && state.selectedProject.name === action.payload.id){
                state.selectedProject.model = action.payload.canvas
            }
            state.projects.map(project => {
                if(project.name === action.payload.id){
                    project.model = action.payload.canvas
                }
                return 'model imported'
            })
        },
        selectComponent(state: ProjectState, action: PayloadAction<ComponentEntity>){
          if(state.selectedComponent.length === 0){
              state.selectedComponent.push(action.payload)
          }else{
              state.selectedComponent.forEach(component => {
                  if(component.keyComponent !== action.payload.keyComponent){
                      state.selectedComponent.push(action.payload)
                  }
              })
          }
        },
        resetSelectedComponents(state: ProjectState){
            state.selectedComponent = []
        },
        updateColorComponent(state: ProjectState, action: PayloadAction<{ keyComponent: number, color: string }>){
            state.selectedProject?.model.components.forEach(component => {
                if(component.keyComponent === action.payload.keyComponent){
                    component.color = action.payload.color
                }
            })
            state.projects.forEach(project => {
                if(project.name === state.selectedProject?.name){
                    project.model.components = state.selectedProject.model.components
                }
            })
        },
        assignMaterial(state: ProjectState, action: PayloadAction<Material>){
            if(state.selectedProject && state.selectedProject.materials.length > 0){

                let indexOfComponentToUpdate = state.selectedProject.materials
                    .findIndex((material) => material.associatedComponentKey === action.payload.associatedComponentKey)

                if(indexOfComponentToUpdate !== -1){
                    state.selectedProject.materials.splice(indexOfComponentToUpdate, 1, action.payload)
                }else{
                    state.selectedProject?.materials.push(action.payload)
                }
            }else {
                state.selectedProject?.materials.push(action.payload)
            }

            state.selectedProject?.materials.forEach(material => {
                state.selectedProject?.model.components.forEach(component => {
                    if(component.keyComponent === material.associatedComponentKey){
                        component.color = material.color
                    }
                })
            })

            state.projects.forEach(project => {
                if(project.name === state.selectedProject?.name){
                    project.materials = state.selectedProject.materials
                }
            })



        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
}
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addProject, removeProject, importModel, selectProject, assignMaterial, selectComponent, resetSelectedComponents,
    updateColorComponent
} = ProjectSlice.actions

export const projectsSelector = (state: { projects: ProjectState }) => state.projects.projects;
export const selectedProjectSelector = (state: { projects: ProjectState }) => state.projects.selectedProject;
export const selectedComponentSelector = (state: {projects: ProjectState}) => state.projects.selectedComponent;
export const findProjectByName = (projects: Project[], name: string) => {
    return projects.filter(project => project.name === name)[0]
}
