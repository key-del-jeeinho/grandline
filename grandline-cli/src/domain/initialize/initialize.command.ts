import { gray, bold, italic } from 'colorette'
import InquireProject from '../project/domain/inquire_project.domain'
import InquireContributor from '../contributor/domain/inquire_contributor.domain'
import { Command } from 'commander'
import { CreateProjectCase } from '../project/usecase/project.usecase.create'
import { CreateContributorCase } from '../contributor/usecase/contributor.usecase.create'
import { inject, injectable } from 'inversify'
import { InquireContributorCase } from '../contributor/usecase/contributor.usecase.inquire'
import { InquireProjectCase } from '../project/usecase/project.usecase.inquire'

export interface InitializeCommand {
    addInitCommand(program: Command): Command
}

export const InitializeCommand = Symbol.for("InitializeCommand")

@injectable()
export class InitializeCommandImpl {
    constructor(
        @inject(CreateProjectCase) private readonly createProjectCase: CreateProjectCase,
        @inject(InquireProjectCase) private readonly inquireProjectCase: InquireProjectCase,
        @inject(CreateContributorCase) private readonly createContributorCase: CreateContributorCase,
        @inject(InquireContributorCase) private readonly inquireContributorCase: InquireContributorCase,
    ) {}

    addInitCommand(program: Command) {
        return program.command('init')
            .argument('[projectName]')
            .action(async (projectName) => {
                console.log(bold('🚢 init grandline project...'))
                console.log(italic(gray('    I smell adventure!')))
                const project = await this.inquireProjectCase.inquireProject({
                    projectName: projectName 
                } as InquireProject)
                this.createProjectCase.createProject(project)

                const mainContributor = await this.inquireContributorCase.inquireContributor({} as InquireContributor)
                this.createContributorCase.createContributor(mainContributor)

                console.log(bold("project initializing complete!"))
            })
    }
}