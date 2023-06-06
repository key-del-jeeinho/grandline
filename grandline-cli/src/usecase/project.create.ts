import { save as saveProject } from "../file_system/project.repository.json";
import Project from "../interface/Project";

export default async function createProject(
    project: Project
): Promise<Project> {
    return saveProject(project)
}