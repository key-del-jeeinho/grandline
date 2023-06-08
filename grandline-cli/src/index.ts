#!/usr/bin/env node
import { program } from 'commander'
import container from './global/_inversify'
import { GrandlineCommandInitializer } from './global/_initialize.command'

const commandInitializer = container.get<GrandlineCommandInitializer>(GrandlineCommandInitializer)
commandInitializer.initializeCommands(program)
program.parse(process.argv)