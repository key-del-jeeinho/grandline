import { gray, bold, italic } from 'colorette'
import inquireProject from '../inquire/project.inquire'
import ProjectInquirerContext from '../inquire/project.inquire.context'
import inquireContributor from '../inquire/contributor.inquire'
import ContributorInquirerContext from '../inquire/contributor.inquire.context'
import { Command } from 'commander'
import createProject from '../../usecase/project.create'
import createContributor from '../../usecase/contributor.create'

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