import Project from "../domain/project.domain"

export interface ProjectRepository {
    exists(path?: string): Promise<boolean>
    save(project: Project, path?: string): Promise<Project>
    update(project: Project, path?: string): Promise<Project>
    create(project: Project, path?: string): Promise<Project>
    find(path?: string): Promise<Project | null>
}

export const ProjectRepository = Symbol.for("ProjectRepository")