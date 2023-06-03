import { Command } from "commander"
import { addInitCommand } from "./command/init"
import { addGoalCommand } from "./command/goal"

type GrandlineCommand = "goal" | "init"

const grandlineCommands: () => {[command in GrandlineCommand] : {initialize: (program: Command) => Command}}  =
    () => {
        return {
        "init": { initialize: addInitCommand },
        "goal": { initialize: addGoalCommand }
        }
    }
    
export function initializeCommands(program: Command) {
    Object.values(grandlineCommands())
        .map(({initialize}) => initialize(program))
    program.parse(process.argv)
}