export default interface InquireContributor {
    contributorName: string,
    contributorEmail: string,
}

export interface InquireContributorBuilder {
    changeContributorName(contributorName: string): InquireContributorBuilder
    getContributorName(): string | undefined

    changeContributorEmail(contributorEmail: string): InquireContributorBuilder
    getContributorEmail(): string | undefined

    build(): InquireContributor 
}

export class SimpleInquireContributorBuilder implements InquireContributorBuilder{
    #contributorName: string | undefined
    #contributorEmail: string | undefined

    static of(
        {
            contributorName, contributorEmail
        }: {
            contributorName?: string | undefined,
            contributorEmail?: string | undefined,
        }
    ) {
        return new SimpleInquireContributorBuilder(
            contributorName, 
            contributorEmail, 
        )
    }

    constructor(
        contributorName?: string | undefined,
        contributorEmail?: string | undefined,
    ) {
        this.#contributorName = contributorName
        this.#contributorEmail = contributorEmail
    }

    changeContributorName(contributorName: string): InquireContributorBuilder {
        return new SimpleInquireContributorBuilder(contributorName, this.#contributorEmail)
    }
    getContributorName(): string | undefined {
        return this.#contributorName
    }
    changeContributorEmail(contributorEmail: string): InquireContributorBuilder {
        return new SimpleInquireContributorBuilder(this.#contributorName, contributorEmail)
    }
    getContributorEmail(): string | undefined {
        return this.#contributorEmail
    }
    build(): InquireContributor {
        const contributorName = this.getContributorName()
        const contributorEmail = this.getContributorEmail()
        if(!contributorName) throw Error("contributor name must be defined!")
        if(!contributorEmail) throw Error("contributor email must be defined!")
        return {
            contributorName,
            contributorEmail,
        }
    }
}