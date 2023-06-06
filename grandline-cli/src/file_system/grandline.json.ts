import { UUID } from "crypto"
import { ProjectTag } from "../interface/ProjectTag"
import Contributor from "../interface/Contributor"
import Project from "../interface/Project"
import { jsonToMoment, momentToJson } from "./moment.json"
import { GrandLineSuperset } from "../interface/GrandLineSuperset"

export type Grandline_Json = GrandLineSuperset<{
    project?: JsonProject
    contributors: JsonContributor[]
}>
export const getGrandlinePathFromCwd = () => `${process.cwd()}/grandline.json`

export type JsonProject = {
    _id: UUID,
    name: string,
    description: string,
    start_at: string,
    tags: ProjectTag[],
}

export function projectToJson({_id, name, description, start_at, tags}: Project): JsonProject {
    return {
        _id: _id,
        name: name,
        description: description,
        start_at: momentToJson(start_at),
        tags: tags
    }
}

export function jsonToProject({_id, name, description, start_at, tags}: JsonProject): Project {
    return {
        _id: _id,
        name: name,
        description: description,
        start_at: jsonToMoment(start_at),
        tags: tags
    }
}

export type JsonContributor = {
    _id: UUID,
    name: string,
    email: string,
}

export function contributorToJson({_id, name, email}: Contributor): JsonContributor {
    return {
        _id: _id,
        name: name,
        email: email
    }
}

export function jsonToContributor({_id, name, email}: JsonContributor): Contributor {
    return {
        _id: _id,
        name: name,
        email: email
    }
}