import { save as saveContributor } from "../file_system/contributor.repository.json";
import Contributor from "../interface/Contributor";

export default async function createContributor(
    contributor: Contributor
): Promise<Contributor> {
    return saveContributor(contributor)
}