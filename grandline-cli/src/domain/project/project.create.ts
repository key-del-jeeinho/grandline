import { save as saveProject } from "./project.repository.json";
import Project from "./Project";

export default async function createProject(
    project: Project
): Promise<Project> {
    return saveProject(project)
}