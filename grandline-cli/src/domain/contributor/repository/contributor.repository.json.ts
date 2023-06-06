import { Grandline_Json, contributorToJson, getGrandlinePathFromCwd, jsonToContributor } from "../../grandline/grandline.json";
import { exists as existsJson, read as readJson, write as writeJson } from "../../../global/json/_json";
import { version } from "../../../../package.json";
import Contributor from "../domain/contributor.domain";
import { UUID } from "crypto";
import { injectable } from "inversify";
import { ContributorRepository } from "./contributor.repository";

@injectable()
export class ContributorRepositoryJsonImpl implements ContributorRepository {
    async exists(path?: string): Promise<boolean> {
        if(!path) path = getGrandlinePathFromCwd()

        const isDataBaseExists = existsJson(path)
        if(!isDataBaseExists) return false

        const grandline: Grandline_Json = await readJson(path)
        const contributors = grandline.contributors

        const isContributorExists = contributors.length > 0
        return isContributorExists
    }

    async saveAll(contributors: Contributor[], path?: string): Promise<Contributor[]> {
        return Promise.all(contributors.map(async (contributor) => this.save(contributor, path)))
    }

    async save(contributor: Contributor, path?: string): Promise<Contributor> {
        if(!path) path = getGrandlinePathFromCwd()
        const isDataBaseExists = await existsJson(path)
        if(isDataBaseExists) return this.update(contributor, path)
        else return this.create(contributor, path)
    }

    async update(contributor: Contributor, path?: string): Promise<Contributor> {
        if(!path) path = getGrandlinePathFromCwd()
        const grandline: Grandline_Json = await readJson(path)
        const newGrandline: Grandline_Json = {
            ...grandline,
            contributors: [
                ...grandline.contributors,
                contributorToJson(contributor)
            ]
        }
        await writeJson(path, newGrandline)
        return contributor
    }

    async create(contributor: Contributor, path?: string): Promise<Contributor> {
        if(!path) path = getGrandlinePathFromCwd()
        const newGrandline: Grandline_Json = {
            _grandline_version: version,
            _grandline_active: true,
            contributors: [
                contributorToJson(contributor)
            ]
        }
        await writeJson(path, newGrandline)
        return contributor
    }

    async findById(id: UUID, path?: string): Promise<Contributor | null> {
        if(!path) path = getGrandlinePathFromCwd()

        const isExists = await existsJson(path)
        if(!isExists) return null

        const grandline: Grandline_Json = await readJson(path)
        const contributor = grandline.contributors
            .find((value) => value._id === id)
        
        return contributor ? jsonToContributor(contributor) : null
    }

    async findAll(path?: string): Promise<Contributor[]> {
        if(!path) path = getGrandlinePathFromCwd()

        const isExists = await existsJson(path)
        if(!isExists) return []

        const grandline: Grandline_Json = await readJson(path)
        return grandline.contributors.map(jsonToContributor)
    }
}