import Contributor from "../domain/contributor.domain"

export interface ContributorRepository {
    exists(path?: string): Promise<boolean>
    saveAll(contributors: Contributor[], path?: string): Promise<Contributor[]>
    save(contributor: Contributor, path?: string): Promise<Contributor>
    update(contributor: Contributor, path?: string): Promise<Contributor>
    create(contributor: Contributor, path?: string): Promise<Contributor>
    findById(id: string, path?: string): Promise<Contributor | null>
    findAll(path?: string): Promise<Contributor[]>
}

export const ContributorRepository = Symbol.for("ContributorRepository")