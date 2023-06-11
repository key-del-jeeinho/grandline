import { inject, injectable } from "inversify";
import { CreateContributorCase } from "./usecase/contributor.usecase.create";
import Contributor, { SimpleContributor } from "./domain/contributor.domain";
import { ContributorRepository } from "./repository/contributor.repository";
import { InquireContributorCase } from "./usecase/contributor.usecase.inquire";
import InquireContributor, { InquireContributorBuilder, SimpleInquireContributorBuilder } from "./domain/inquire_contributor.domain";
import input from '@inquirer/input'

@injectable()
export class ContributorService implements 
    CreateContributorCase, 
    InquireContributorCase {
    constructor(
        @inject(ContributorRepository) private readonly contributorRepository: ContributorRepository
    ) {}

    async createContributor(contributor: Contributor): Promise<Contributor> {
        this.contributorRepository.save(contributor)
        return contributor
    }
    
    async inquireContributor(inquireContributor: InquireContributor): Promise<Contributor> {
        const contributor: Promise<Contributor> = 
        Promise.resolve(SimpleInquireContributorBuilder.of(inquireContributor))
            .then(this.inquireContributorName)
            .then(this.inquireContributorEmail)
            .then((builder) => builder.build())
            .then((ctx) => {
                const {contributorName, contributorEmail} = ctx
                return new SimpleContributor(contributorName, contributorEmail)
            })
            return contributor
    }

    private async inquireContributorName(
        builder: InquireContributorBuilder
    ): Promise<InquireContributorBuilder> {
        const contributorNameInContext = builder.getContributorName()
        const isContributorNameAlreadyAnswered = contributorNameInContext
        const newContributorName = !isContributorNameAlreadyAnswered
            ? await input({
                message: 'please write your name!',
                default: 'Monkey D. Luffy',
            }) : contributorNameInContext
        return builder.changeContributorName(newContributorName)
    }

    private async inquireContributorEmail(
        builder: InquireContributorBuilder
    ): Promise<InquireContributorBuilder> {
        const contributorEmailInContext = builder.getContributorEmail()
        const isContributorEmailAlreadyAnswered = contributorEmailInContext
        const newContributorEmail = !isContributorEmailAlreadyAnswered
            ? await input({
                message: 'please write your email!',
                default: 'luffy_in_the@grand.line'
            }) : contributorEmailInContext
        return builder.changeContributorEmail(newContributorEmail)
    }
}