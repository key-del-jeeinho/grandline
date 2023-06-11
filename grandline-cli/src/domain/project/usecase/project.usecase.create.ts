import Project from "../domain/project.domain";

export interface CreateProjectCase {
    createProject(project: Project): Promise<Project>
}

export const CreateProjectCase = Symbol.for("CreateProjectCase")