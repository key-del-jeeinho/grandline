import Project from "../domain/project.domain";
import { exists as existsJson, read as readJson, write as writeJson } from "../../../global/file/_json";
import { version } from "../../../../package.json";
import { Grandline_Json, getGrandlinePathFromCwd, jsonToProject, projectToJson } from "../../grandline/grandline.json";
import { injectable } from "inversify";
import { ProjectRepository } from "./project.repository";

@injectable()
export class ProjectRepositoryJsonImpl implements ProjectRepository {
    async exists(path?: string): Promise<boolean> {
        if(!path) path = getGrandlinePathFromCwd()
        
        const isDataBaseExists = existsJson(path)
        if(!isDataBaseExists) return false

        const grandline: Grandline_Json = await readJson(path)
        const project = grandline.project
        
        const isProjectExists = project !== undefined && project._id !== undefined
        return isProjectExists
    }

    async save(project: Project, path?: string): Promise<Project> {
        if(!path) path = getGrandlinePathFromCwd()
        const isDataBaseExists = await existsJson(path)
        if(isDataBaseExists) return this.update(project, path)
        else return this.create(project, path)
    }

    async update(project: Project, path?: string): Promise<Project> {
        if(!path) path = getGrandlinePathFromCwd()
        const grandline: Grandline_Json = await readJson(path)
        const newGrandline: Grandline_Json = {
            ...grandline,
            project: projectToJson(project),
        }
        await writeJson(path, newGrandline)
        return project
    }

    async create(project: Project, path?: string): Promise<Project> {
        if(!path) path = getGrandlinePathFromCwd()
        const newGrandline: Grandline_Json = {
            _grandline_version: version,
            _grandline_active: true,
            project: projectToJson(project),
            contributors: [],
        }
        await writeJson(path, newGrandline)
        return project
    }

    async find(path?: string): Promise<Project | null> {
        if(!path) path = getGrandlinePathFromCwd()

        const isExists = await existsJson(path)
        if(!isExists) return null

        const grandline: Grandline_Json = await readJson(path)
        if(!grandline.project) return null

        return jsonToProject(grandline.project)
    }
}