import { Project } from "../model/Project";

export const exportSimulationProject = (project: Project) => {
    const link = document.createElement('a');
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(project)
    )}`
    link.download = project.name + ".json"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}