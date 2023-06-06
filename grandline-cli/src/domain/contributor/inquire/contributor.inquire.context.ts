export default interface ContributorInquirerContext {
    contributorName: string,
    contributorEmail: string,
}

export interface ContributorInquirerContextBuilder {
    changeContributorName(contributorName: string): ContributorInquirerContextBuilder
    getContributorName(): string | undefined

    changeContributorEmail(contributorEmail: string): ContributorInquirerContextBuilder
    getContributorEmail(): string | undefined
}

export class SimpleContributorInquirerContextBuilder implements ContributorInquirerContextBuilder{
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
        return new SimpleContributorInquirerContextBuilder(
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

    changeContributorName(contributorName: string): ContributorInquirerContextBuilder {
        return new SimpleContributorInquirerContextBuilder(contributorName, this.#contributorEmail)
    }
    getContributorName(): string | undefined {
        return this.#contributorName
    }
    changeContributorEmail(contributorEmail: string): ContributorInquirerContextBuilder {
        return new SimpleContributorInquirerContextBuilder(this.#contributorName, contributorEmail)
    }
    getContributorEmail(): string | undefined {
        return this.#contributorEmail
    }
}

export function complete(ctx: ContributorInquirerContextBuilder): ContributorInquirerContext {
    const contributorName = ctx.getContributorName()
    const contributorEmail = ctx.getContributorEmail()
    if(!contributorName) throw Error("contributor name must be defined!")
    if(!contributorEmail) throw Error("contributor email must be defined!")
    return {
        contributorName,
        contributorEmail,
    }
}