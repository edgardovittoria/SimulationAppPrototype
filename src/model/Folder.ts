import {UsersState} from "cad-library";
import {Project} from "./Project";

export type Folder = {
    name: string,
    owner: UsersState
    sharedWidth: UsersState[]
    projectList: Project[]
    subFolders: Folder[]
    parent: string
}