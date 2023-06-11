import { gray, bold, italic, red } from 'colorette'
import InquireProject from '../project/domain/inquire_project.domain'
import InquireContributor from '../contributor/domain/inquire_contributor.domain'
import { Command } from 'commander'
import { CreateProjectCase } from '../project/usecase/project.usecase.create'
import { CreateContributorCase } from '../contributor/usecase/contributor.usecase.create'
import { inject, injectable } from 'inversify'
import { InquireContributorCase } from '../contributor/usecase/contributor.usecase.inquire'
import { InquireProjectCase } from '../project/usecase/project.usecase.inquire'
import { QueryGrandlineCase } from '../grandline/grandline.usecase.query'
import { InquireOverwriteProjectCase } from '../project/usecase/project.usecase.inquire_overwrite'

export interface InitializeCommand {
    addInitCommand(program: Command): Command
}

export const InitializeCommand = Symbol.for("InitializeCommand")

@injectable()
export class InitializeCommandImpl implements InitializeCommand {
    constructor(
        @inject(QueryGrandlineCase) private readonly queryGrandlineCase: QueryGrandlineCase,
        @inject(InquireOverwriteProjectCase) private readonly inquireOverwriteProjectCase: InquireOverwriteProjectCase,
        @inject(CreateProjectCase) private readonly createProjectCase: CreateProjectCase,
        @inject(InquireProjectCase) private readonly inquireProjectCase: InquireProjectCase,
        @inject(CreateContributorCase) private readonly createContributorCase: CreateContributorCase,
        @inject(InquireContributorCase) private readonly inquireContributorCase: InquireContributorCase,
    ) {}

    addInitCommand(program: Command) {
        return program.command('init')
            .argument('[projectName]')
            .action(async (projectName) => {
                this.noticeExecuteToUser()

                const status = await this.checkOverwrite()
                if(status[0] === 'cancel') {
                    this.noticeCancelToUser(status[1])
                    return
                }
                this.noticeProgressToUser(status[0])

                await this.initializeProject(projectName)
                await this.initializeContributor()

                this.noticeCompleteToUser(status[0])
            })
    }

    private noticeExecuteToUser() {
        console.log(bold('🚢 init grandline project...'))
        console.log(italic(gray('    I smell adventure!')))
    }

    private async checkOverwrite(): Promise<['cancel', string] | ['overwrite'] | ['initialize']> {
        const isAlreadyInitialize = await this.queryGrandlineCase.exists()
        if(isAlreadyInitialize) {
            const doOverwrite = await this.inquireOverwriteProjectCase.inquireOverwriteProject()
            if(!doOverwrite) return ['cancel', 'already initialized']
            else return ['overwrite']
        } else return ['initialize']
    }

    private async initializeProject(projectName: any) {
        const project = await this.inquireProjectCase.inquireProject({
            projectName: projectName 
        } as InquireProject)
        this.createProjectCase.createProject(project)
    }
    private async initializeContributor() {
        const mainContributor = await this.inquireContributorCase.inquireContributor({} as InquireContributor)
        this.createContributorCase.createContributor(mainContributor)
    }

    private noticeCancelToUser(reason: string) {
        const canceled = red('canceled')
        console.log(gray(italic(`project initializing ${canceled} cause ${reason}`)))
    }

    private noticeProgressToUser(status: 'overwrite' | 'initialize') {
        const displayActionName = {
            overwrite: 'overwrite',
            initialize: 'initialize'
        }[status]
        console.log(gray(italic(`${displayActionName} grandline started!`)))
    }
    
    private noticeCompleteToUser(status: 'overwrite' | 'initialize') {
        const displayActionName = {
            overwrite: 'overwriting',
            initialize: 'initializing'
        }[status]
        console.log(bold(`project ${displayActionName} complete!`))
    }
}