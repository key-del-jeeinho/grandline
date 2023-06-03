#!/usr/bin/env node
import { program } from 'commander'
import { initializeCommands } from './command_line/command/_initialize'

initializeCommands(program)
program.parse(process.argv)