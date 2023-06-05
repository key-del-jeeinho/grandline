import Project from "../interface/Project";
import { exists as existsJson, read as readJson, write as writeJson } from "./_json";
import { version } from "../../package.json";
import { Grandline_Json, getGrandlinePathFromCwd } from "./grandline.json";
import { START_AT_FORMAT, startAtFormat } from "./moment.json";

export async function exists(path?: string): Promise<boolean> {
    if(!path) path = getGrandlinePathFromCwd()
    
    const isGrandlineExists = existsJson(path)
    if(!isGrandlineExists) return false

    const grandline: Grandline_Json = await readJson(path)
    const project = grandline.project
    
    const isProjectExists = project !== undefined && project._id !== undefined
    return isProjectExists
}

export async function save(project: Project, path?: string): Promise<Project> {
    if(!path) path = getGrandlinePathFromCwd()
    const isGrandlineExists = await existsJson(path)
    if(isGrandlineExists) return update(project, path)
    else return create(project, path)
}

export async function update(project: Project, path?: string): Promise<Project> {
    if(!path) path = getGrandlinePathFromCwd()
    const grandline: Grandline_Json = await readJson(path)
    const newGrandline: Grandline_Json = {
        ...grandline,
        project: {
            _id: project._id,
            name: project.name,
            description: project.description,
            start_at: project.start_at.format(START_AT_FORMAT),
            tags: project.tags,
        }
    }
    await writeJson(path, newGrandline)
    return project
}

export async function create(project: Project, path?: string): Promise<Project> {
    if(!path) path = getGrandlinePathFromCwd()
    const newGrandline: Grandline_Json = {
        _grandline_version: version,
        _grnadline_active: true,
        project: {
            _id: project._id,
            name: project.name,
            description: project.description,
            start_at: project.start_at.format(START_AT_FORMAT),
            tags: project.tags,
        },
        contributors: [],
    }
    await writeJson(path, newGrandline)
    return project
}

export async function find(path?: string): Promise<Project | null> {
    if(!path) path = getGrandlinePathFromCwd()

    const isExists = await existsJson(path)
    if(!isExists) return null

    const grnadline: Grandline_Json = await readJson(path)
    return {
        _id: grnadline.project._id,
        name: grnadline.project.name,
        description: grnadline.project.description,
        start_at: startAtFormat(grnadline.project.start_at),
        tags: grnadline.project.tags,
    }
}
