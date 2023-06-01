#!/usr/bin/env node
import { program } from 'commander'
import { gray, bold, italic } from 'colorette'
import { version } from '../package.json'
import { randomUUID } from 'crypto'
import GrandLine from './interface/GrandLine'
import Contributor from './interface/Contributor'
import inquireProject from './inquirer/ProjectInquirer'
import ProjectInquirerContext from './inquirer/ProjectInquirerContext'

program.command('init')
    .argument('<projectName>')
    .action(async (projectName) => {
        console.log(bold('🚢 init grandline project...'))
        console.log(italic(gray('    I smell adventure!')))
        const project = await inquireProject({
             projectName: projectName 
        } as ProjectInquirerContext)
        const grandline = {
            _grandline_version: version,
            _grandline_active: true,
            project: project,
            contributor: [
                {
                    _id: randomUUID(),
                    name: "raul",
                    email: "develop.raul@gmail.com"
                }
            ] as Contributor[]
        } as GrandLine

        console.log(JSON.stringify(grandline, null, 2))
    })

program.parse(process.argv)