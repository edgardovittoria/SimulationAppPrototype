import { UsersState } from "cad-library";
import faunadb from "faunadb";
import {Folder} from "../../model/Folder";
import { Project } from "../../model/Project";

export const getProjectsFolderByOwner = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, owner: string) => {
    const response = await faunaClient.query(
        faunaQuery.Get(faunaQuery.Match(faunaQuery.Index('projectsFolder_by_owner'), owner))
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response as Folder

}

export const updateFolderOrProject = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, newFolder: Folder) => {
    const response = await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('ProjectsFolder'), newFolder.faunaDocumentId), {
            data: {
                ...newFolder
            }
        })
    )

    return response
}


export const getFoldersByOwner = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, owner: string) => {
    const response = await faunaClient.query(
        faunaQuery.Select("data",
            faunaQuery.Map(
                faunaQuery.Paginate(faunaQuery.Match(faunaQuery.Index("folders_by_owner"), owner)),
                faunaQuery.Lambda("folder", {
                    id: faunaQuery.Select(["ref", "id"], faunaQuery.Get(faunaQuery.Var("folder"))),
                    folder: faunaQuery.Select(["data"], faunaQuery.Get(faunaQuery.Var("folder")))
                })
            )
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response as FaunaFolder[]
}

type FaunaFolder = {
    id: string,
    folder: {
        name: string,
        owner: UsersState,
        sharedWith: UsersState[],
        projectList: Project[],
        subFolders: string[],
        parent: string,
    }
}

export const constructFolderStructure = (folders: FaunaFolder[]) => {
    let rootFolder = folders.filter(faunaFolder => faunaFolder.folder.parent === 'root')[0]
    let remainingFolders = folders.filter(faunaFolder => faunaFolder.folder.parent !== 'root')
    let root = {
        ...rootFolder.folder, 
        faunaDocumentId: rootFolder.id,
        subFolders: recursiveSubFoldersRetrieving(rootFolder.folder.subFolders, remainingFolders)
    } as Folder
    return root
}

const recursiveSubFoldersRetrieving = (subFolders: string[], all_folders: FaunaFolder[]) => {
    let sfs: Folder[] = []
    if (subFolders.length > 0) {
        sfs = subFolders.reduce((subFs, sfRef) => {
            let sb = all_folders.filter(ff => ff.id === sfRef)[0].folder
            let remainingFolders = all_folders.filter(ff => ff.id !== sfRef)
            let sbFolder = {
                ...sb,
                faunaDocumentId: sfRef,
                subFolders: recursiveSubFoldersRetrieving(sb.subFolders, remainingFolders)
            } as Folder
            subFs.push(sbFolder)
            return subFs
        }, [] as Folder[])
    }
    return sfs
}


export const createFolderInFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, folderToSave: Folder) => {
    const response = await faunaClient.query(
        faunaQuery.Create(faunaQuery.Collection("Folders"), {data: {...folderToSave}}
        )
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response

}

export const deleteFolderFromFauna = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, folderToDelete: string) => {
    const response = await faunaClient.query(
        faunaQuery.Delete(faunaQuery.Ref(faunaQuery.Collection('Folders'), folderToDelete))
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response

}

export const addIDInSubFoldersList = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, folderFaunaID: string, selectedFolder: Folder) => {
    const response = await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('Folders'), selectedFolder.faunaDocumentId), {
            data: {
                    ...selectedFolder,
                    subFolders: [...selectedFolder.subFolders.reduce((subIDs, sb) => {
                        subIDs.push(sb.faunaDocumentId as string)
                        return subIDs
                    }, [] as string[]) , folderFaunaID]
                
                }
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response

}

export const removeIDInSubFoldersList = async (faunaClient: faunadb.Client, faunaQuery: typeof faunadb.query, folderFaunaID: string, selectedFolder: Folder) => {
    const response = await faunaClient.query(
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('Folders'), selectedFolder.faunaDocumentId), {
            data: {
                    ...selectedFolder,
                    subFolders: [...selectedFolder.subFolders.reduce((subIDs, sb) => {
                        subIDs.push(sb.faunaDocumentId as string)
                        return subIDs
                    }, [] as string[]).filter(id => id !== folderFaunaID)]
                
                }
        })
    )
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ));
    return response

}