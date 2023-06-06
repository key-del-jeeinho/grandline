#!/usr/bin/env node
import { program } from 'commander'
import { initializeCommands } from './global/_initialize.command'

initializeCommands(program)
program.parse(process.argv)