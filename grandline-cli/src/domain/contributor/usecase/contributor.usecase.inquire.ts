import Contributor from "../domain/contributor.domain";
import InquireContributor from "../domain/inquire_contributor.domain";

export interface InquireContributorCase {
    inquireContributor(inquireContributor: InquireContributor): Promise<Contributor>
}

export const InquireContributorCase = Symbol.for("InquireContributorCase")