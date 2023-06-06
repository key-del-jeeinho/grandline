import { save as saveContributor } from "./contributor.repository.json";
import Contributor from "./Contributor";

export default async function createContributor(
    contributor: Contributor
): Promise<Contributor> {
    return saveContributor(contributor)
}