import Contributor, { SimpleContributor } from "../Contributor";
import ContributorInquirerContext, { ContributorInquirerContextBuilder, SimpleContributorInquirerContextBuilder, complete } from "./contributor.inquire.context";
import input from '@inquirer/input'

export default async function inquireContributor(ctx: ContributorInquirerContext): Promise<Contributor> {
    const contributor: Promise<Contributor> = 
        Promise.resolve(SimpleContributorInquirerContextBuilder.of(ctx))
            .then(inquireContributorName)
            .then(inquireContributorEmail)
            .then(complete)
            .then((ctx) => {
                const {contributorName, contributorEmail} = ctx
                return new SimpleContributor(contributorName, contributorEmail)
            })
    return contributor
}

async function inquireContributorName(
    ctx: ContributorInquirerContextBuilder
): Promise<ContributorInquirerContextBuilder> {
    const contributorNameInContext = ctx.getContributorName()
    const isContributorNameAlreadyAnswered = contributorNameInContext
    const newContributorName = !isContributorNameAlreadyAnswered
        ? await input({
            message: 'please write your name!',
            default: 'Monkey D. Luffy',
        }) : contributorNameInContext
    return ctx.changeContributorName(newContributorName)
}

async function inquireContributorEmail(
    ctx: ContributorInquirerContextBuilder
): Promise<ContributorInquirerContextBuilder> {
    const contributorEmailInContext = ctx.getContributorEmail()
    const isContributorEmailAlreadyAnswered = contributorEmailInContext
    const newContributorEmail = !isContributorEmailAlreadyAnswered
        ? await input({
            message: 'please write your email!',
            default: 'luffy_in_the@grand.line'
        }) : contributorEmailInContext
    return ctx.changeContributorEmail(newContributorEmail)
}