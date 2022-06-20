import faunadb from "faunadb";
import {Folder} from "../../model/Folder";

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
        faunaQuery.Update(faunaQuery.Ref(faunaQuery.Collection('ProjectsFolder'), (newFolder.faunaDocumentId as number).toString()), {
            data: {
                ...newFolder
            }
        })
    )

    return response
}