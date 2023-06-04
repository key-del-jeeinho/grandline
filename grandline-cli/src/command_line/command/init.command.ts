import { gray, bold, italic } from 'colorette'
import inquireProject from '../inquire/project.inquire'
import ProjectInquirerContext from '../inquire/project.inquire.context'
import inquireContributor from '../inquire/contributor.inquire'
import ContributorInquirerContext from '../inquire/contributor.inquire.context'
import { Command } from 'commander'
import { GrandLineSuperset } from '../../interface/GrandLineSuperset'

export function addInitCommand(program: Command) {
    return program.command('init')
        .argument('[projectName]')
        .action(async (projectName) => {
            console.log(bold('🚢 init grandline project...'))
            console.log(italic(gray('    I smell adventure!')))
            const project = await inquireProject({
                projectName: projectName 
            } as ProjectInquirerContext)
            const mainContributor = await inquireContributor({} as ContributorInquirerContext)
            const grandline = GrandLineSuperset({
                project: project,
                contributor: [
                    mainContributor
                ]
            })

            console.log(JSON.stringify(grandline, null, 2))
        })
}