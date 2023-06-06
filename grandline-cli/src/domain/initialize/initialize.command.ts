import { gray, bold, italic } from 'colorette'
import inquireProject from '../project/inquire/project.inquire'
import ProjectInquirerContext from '../project/inquire/project.inquire.context'
import inquireContributor from '../contributor/inquire/contributor.inquire'
import ContributorInquirerContext from '../contributor/inquire/contributor.inquire.context'
import { Command } from 'commander'
import createProject from '../project/project.create'
import createContributor from '../contributor/contributor.create'

export function addInitCommand(program: Command) {
    return program.command('init')
        .argument('[projectName]')
        .action(async (projectName) => {
            console.log(bold('🚢 init grandline project...'))
            console.log(italic(gray('    I smell adventure!')))
            const project = await inquireProject({
                projectName: projectName 
            } as ProjectInquirerContext)
            createProject(project)

            const mainContributor = await inquireContributor({} as ContributorInquirerContext)
            createContributor(mainContributor)

            console.log(bold("project initializing complete!"))
        })
}