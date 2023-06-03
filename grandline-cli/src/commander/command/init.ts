import { gray, bold, italic } from 'colorette'
import { version } from '../../../package.json'
import GrandLine from '../../interface/GrandLine'
import Contributor from '../../interface/Contributor'
import inquireProject from '../../inquirer/ProjectInquirer'
import ProjectInquirerContext from '../../inquirer/ProjectInquirerContext'
import inquireContributor from '../../inquirer/ContributorInquirer'
import ContributorInquirerContext from '../../inquirer/ContributorInquirerContext'
import { Command } from 'commander'

export function addInitCommand(program: Command) {
    return program.command('init')
        .argument('[projectName]')
        .action(async (projectName) => {
            console.log(bold('🚢 init grandline project...'))
            console.log(italic(gray('    I smell adventure!')))
            const project = await inquireProject({
                projectName: projectName 
            } as ProjectInquirerContext)
            const mainContributor = await inquireContributor({
            } as ContributorInquirerContext)
            const grandline = {
                _grandline_version: version,
                _grandline_active: true,
                project: project,
                contributor: [
                    mainContributor
                ] as Contributor[]
            } as GrandLine

            console.log(JSON.stringify(grandline, null, 2))
        })
}