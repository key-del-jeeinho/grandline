import { Grandline_Json, contributorToJson, getGrandlinePathFromCwd, jsonToContributor } from "./grandline.json";
import { exists as existsJson, read as readJson, write as writeJson } from "./_json";
import Contributor from "../interface/Contributor";
import { UUID } from "crypto";

export async function exists(path?: string): Promise<boolean> {
    if(!path) path = getGrandlinePathFromCwd()

    const isDataBaseExists = existsJson(path)
    if(!isDataBaseExists) return false

    const grandline: Grandline_Json = await readJson(path)
    const contributors = grandline.contributors

    const isContributorExists = contributors.length > 0
    return isContributorExists
}

export async function saveAll(contributors: Contributor[], path?: string): Promise<Contributor[]> {
    return Promise.all(contributors.map(async (contributor) => save(contributor, path)))
}

export async function save(contributor: Contributor, path?: string): Promise<Contributor> {
    if(!path) path = getGrandlinePathFromCwd()
    const isDataBaseExists = await existsJson(path)
    if(isDataBaseExists) return update(contributor, path)
    else return create(contributor, path)
}

export async function update(contributor: Contributor, path?: string): Promise<Contributor> {
    if(!path) path = getGrandlinePathFromCwd()
    const grandline: Grandline_Json = await readJson(path)
    const newGrandline: Grandline_Json = {
        ...grandline,
        contributors: [
            ...grandline.contributors,
            {
                _id: contributor._id,
                name: contributor.name,
                email: contributor.email
            }
        ]
    }
    await writeJson(path, newGrandline)
    return contributor
}

export async function create(contributor: Contributor, path?: string): Promise<Contributor> {
    if(!path) path = getGrandlinePathFromCwd()
    const newGrandline: Grandline_Json = {
        _grandline_version: "version",
        _grandline_active: true,
        contributors: [
            contributorToJson(contributor)
        ]
    }
    await writeJson(path, newGrandline)
    return contributor
}

export async function findById(id: UUID, path?: string): Promise<Contributor | null> {
    if(!path) path = getGrandlinePathFromCwd()

    const isExists = await existsJson(path)
    if(!isExists) return null

    const grandline: Grandline_Json = await readJson(path)
    const contributor = grandline.contributors
                                .find((value) =>value._id === id)
    
    return contributor ? jsonToContributor(contributor) : null
}

export async function findAll(id: UUID, path?: string): Promise<Contributor[]> {
    if(!path) path = getGrandlinePathFromCwd()

    const isExists = await existsJson(path)
    if(!isExists) return []

    const grandline: Grandline_Json = await readJson(path)
    return grandline.contributors.map(jsonToContributor)
}