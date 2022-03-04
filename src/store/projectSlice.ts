import { ComponentEntity, ImportActionParamsObject } from '@Draco112358/cad-library';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Port, Project, RLCParams } from "../model/Project";
import { Simulation } from "../model/Simulation";


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
            state.projects.push(action.payload)
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
        // assignMaterial(state: ProjectState, action: PayloadAction<{ material: Omit<Material, 'associatedComponentKey'>, keyComponent: number }>) {
        //     //case 1: the material's array already contain at least one element
        //     if (state.selectedProject && state.selectedProject.materials.length > 0) {
        //         state.selectedProject.materials.forEach(material => {
        //             //case 1.1: material to add is already present but not contain the keyComponent of the request
        //             if (material.name === action.payload.material.name) {
        //                 if (!material.associatedComponentKey.includes(action.payload.keyComponent)) {
        //                     material.associatedComponentKey.push(action.payload.keyComponent)
        //                 }
        //                 //case 1.2: material to add is not already present
        //             } else if (material.name !== action.payload.material.name && material.associatedComponentKey.includes(action.payload.keyComponent)) {
        //                 /*
        //                 * One of the material already present contains the keyComponent of the request
        //                 * so it is deleted and insert in the correct material that is pushed in the material's array.
        //                 * If one of the material have an empty associatedComponentKey it is deleted
        //                 * */
        //                 let indexOfKeyToRemove = material.associatedComponentKey.findIndex(value => value === action.payload.keyComponent);
        //                 material.associatedComponentKey.splice(indexOfKeyToRemove, 1);
        //                 if (material.associatedComponentKey.length === 0 && state.selectedProject) {
        //                     state.selectedProject.materials = state.selectedProject?.materials.filter(m => m.name !== material.name)
        //                     if(state.selectedProject?.materials.filter(m => m.name === action.payload.material.name).length === 0){
        //                         state.selectedProject?.materials.push(
        //                             {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
        //                         )
        //                     }
        //                 } else {
        //                     if(state.selectedProject?.materials.filter(m => m.name === action.payload.material.name).length === 0){
        //                         state.selectedProject?.materials.push(
        //                             {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
        //                         )
        //                     }
        //                 }
        //                 //case 1.3: material to add is not already present
        //             } else if (state.selectedProject?.materials.filter(m => m.name === action.payload.material.name).length === 0) {
        //                 /*
        //                 * One of the material already present not contains the keyComponent of the request.
        //                 * */
        //                 state.selectedProject?.materials.push(
        //                     {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
        //                 )

        //             }
        //         })
        //         //case 2: the material's array is empty
        //     } else {
        //         state.selectedProject?.materials.push(
        //             {...action.payload.material, associatedComponentKey: [action.payload.keyComponent]}
        //         )
        //     }

        //     state.selectedProject?.materials.forEach(material => {
        //         state.selectedProject?.model.components.forEach(component => {
        //             if (material.associatedComponentKey.includes(component.keyComponent)) {
        //                 component.material = material
        //             }
        //         })
        //     })

        //     state.projects.forEach(project => {
        //         if (project.name === state.selectedProject?.name) {
        //             project.materials = state.selectedProject.materials
        //         }
        //     })
        // },
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
        }
    },
    extraReducers: {
        //qui inseriamo i metodi : PENDING, FULLFILLED, REJECT utili per la gestione delle richieste asincrone
    }
})


export const {
    //qui vanno inserite tutte le azioni che vogliamo esporatare
    addProject, removeProject, importModel, selectProject, selectComponent, unselectComponent,
    resetSelectedComponents, createSimulation, updateSimulation, addPorts, selectPort, deletePort,
    setPortType, updatePortPosition, setRLCParams
} = ProjectSlice.actions


export const projectsSelector = (state: { projects: ProjectState }) => state.projects.projects;
export const selectedProjectSelector = (state: { projects: ProjectState }) => findProjectByName(state.projects.projects, state.projects.selectedProject);
export const selectedComponentSelector = (state: { projects: ProjectState }) => state.projects.selectedComponent;
export const simulationSelector = (state: { projects: ProjectState }) => findProjectByName(state.projects.projects, state.projects.selectedProject)?.simulations;
export const findProjectByName = (projects: Project[], name: string | undefined) => {
    return (name !== undefined) ? projects.filter(project => project.name === name)[0] : undefined
}

export const findSelectedPort = (project: Project | undefined) => (project) ? project.ports.filter(port => port.isSelected)[0] : undefined
