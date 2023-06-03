#!/usr/bin/env node
import { program } from 'commander'
import { initializeCommands } from './commander/initializeCommands'

initializeCommands(program)