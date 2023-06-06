import Contributor from "../domain/contributor.domain";

export interface CreateContributorCase {
    createContributor(contributor: Contributor): Promise<Contributor>
}

export const CreateContributorCase = Symbol.for("CreateContributorCase")