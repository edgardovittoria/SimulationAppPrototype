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
        addProject(state: ProjectState, action: PayloadAction<Project>) {
            state.projects.push(action.payload)
        },
        removeProject(state: ProjectState, action: PayloadAction<string>) {
            state.projects = state.projects.filter(project => project.name !== action.payload)
        },
        selectProject(state: ProjectState, action: PayloadAction<string | undefined>) {
            (action.payload !== undefined) ? state.selectedProject = findProjectByName(state.projects, action.payload)
                : state.selectedProject = undefined

        },
        importModel(state: ProjectState, action: PayloadAction<ImportActionParamsObject>) {
            if (state.selectedProject && state.selectedProject.name === action.payload.id) {
                state.selectedProject.model = action.payload.canvas
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
        unselectComponent(state: ProjectState, action: PayloadAction<ComponentEntity>){
          if(state.selectedComponent.length !== 0){
              state.selectedComponent = state.selectedComponent.filter(component => component.keyComponent !== action.payload.keyComponent)
          }
        },
        resetSelectedComponents(state: ProjectState) {
            state.selectedComponent = []
        },
        updateColorComponent(state: ProjectState, action: PayloadAction<{ keyComponent: number, color: string }>) {
            state.selectedProject?.model.components.forEach(component => {
                if (component.keyComponent === action.payload.keyComponent) {
                    component.color = action.payload.color
                }
            })
            state.projects.forEach(project => {
                if (project.name === state.selectedProject?.name) {
                    project.model.components = state.selectedProject.model.components
                }
            })
        },
        assignMaterial(state: ProjectState, action: PayloadAction<{ material: Omit<Material, 'associatedComponentKey'>, keyComponent: number }>) {
            //case 1: the material's array already contain at least one element
            if (state.selectedProject && state.selectedProject.materials.length > 0) {
                state.selectedProject.materials.forEach(material => {
                    //case 1.1: material to add is already present but not contain the keyComponent of the request
                    if (material.name === action.payload.material.name) {
                        if (!material.associatedComponentKey.includes(action.payload.keyComponent)) {
                            material.associatedComponentKey.push(action.payload.keyComponent)
                        }
                        //case 1.2: material to add is not already present
                    } else if (material.name !== action.payload.material.name && material.associatedComponentKey.includes(action.payload.keyComponent)) {
                        /*
                        * One of the material already present contains the keyComponent of the request
                        * so it is deleted and insert in the correct material that is pushed in the material's array.
                        * If one of the material have an empty associatedComponentKey it is deleted
                        * */
                        let indexOfKeyToRemove = material.associatedComponentKey.findIndex(value => value === action.payload.keyComponent);
                        material.associatedComponentKey.splice(indexOfKeyToRemove, 1);
                        if (material.associatedComponentKey.length === 0 && state.selectedProject) {
                            state.selectedProject.materials = state.selectedProject?.materials.filter(m => m.name !== material.name)
                            if(state.selectedProject?.materials.filter(m => m.name === action.payload.material.name).length === 0){
                                state.selectedProject?.materials.push(
                                    {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
                                )
                            }
                        } else {
                            if(state.selectedProject?.materials.filter(m => m.name === action.payload.material.name).length === 0){
                                state.selectedProject?.materials.push(
                                    {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
                                )
                            }
                        }
                        //case 1.3: material to add is not already present
                    } else if (state.selectedProject?.materials.filter(m => m.name === action.payload.material.name).length === 0) {
                        /*
                        * One of the material already present not contains the keyComponent of the request.
                        * */
                        state.selectedProject?.materials.push(
                            {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
                        )

                    }
                })
                //case 2: the material's array is empty
            } else {
                state.selectedProject?.materials.push(
                    {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
                )
            }

            state.selectedProject?.materials.forEach(material => {
                state.selectedProject?.model.components.forEach(component => {
                    if (material.associatedComponentKey.includes(component.keyComponent)) {
                        component.color = material.color
                    }
                })
            })

            state.projects.forEach(project => {
                if (project.name === state.selectedProject?.name) {
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
    addProject, removeProject, importModel, selectProject, assignMaterial, selectComponent, unselectComponent,
    resetSelectedComponents, updateColorComponent
} = ProjectSlice.actions

export const projectsSelector = (state: { projects: ProjectState }) => state.projects.projects;
export const selectedProjectSelector = (state: { projects: ProjectState }) => state.projects.selectedProject;
export const selectedComponentSelector = (state: { projects: ProjectState }) => state.projects.selectedComponent;
export const findProjectByName = (projects: Project[], name: string) => {
    return projects.filter(project => project.name === name)[0]
}
