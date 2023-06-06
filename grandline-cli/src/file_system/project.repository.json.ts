import Project from "../interface/Project";
import { exists as existsJson, read as readJson, write as writeJson } from "./_json";
import { version } from "../../package.json";
import { Grandline_Json, getGrandlinePathFromCwd, jsonToProject, projectToJson } from "./grandline.json";

export async function exists(path?: string): Promise<boolean> {
    if(!path) path = getGrandlinePathFromCwd()
    
    const isDataBaseExists = existsJson(path)
    if(!isDataBaseExists) return false

    const grandline: Grandline_Json = await readJson(path)
    const project = grandline.project
    
    const isProjectExists = project !== undefined && project._id !== undefined
    return isProjectExists
}

export async function save(project: Project, path?: string): Promise<Project> {
    if(!path) path = getGrandlinePathFromCwd()
    const isDataBaseExists = await existsJson(path)
    if(isDataBaseExists) return update(project, path)
    else return create(project, path)
}

export async function update(project: Project, path?: string): Promise<Project> {
    if(!path) path = getGrandlinePathFromCwd()
    const grandline: Grandline_Json = await readJson(path)
    const newGrandline: Grandline_Json = {
        ...grandline,
        project: projectToJson(project),
    }
    await writeJson(path, newGrandline)
    return project
}

export async function create(project: Project, path?: string): Promise<Project> {
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

export async function find(path?: string): Promise<Project | null> {
    if(!path) path = getGrandlinePathFromCwd()

    const isExists = await existsJson(path)
    if(!isExists) return null

    const grandline: Grandline_Json = await readJson(path)
    if(!grandline.project) return null

    return jsonToProject(grandline.project)
}
