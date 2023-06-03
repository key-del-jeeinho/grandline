import { Command } from "commander"
import { addInitCommand } from "./init.command"
import { addGoalCommand } from "./goal.command"
import { addInsightCommand } from "./insight.command"

type GrandlineCommand = "goal" | "init" | "insight"

const grandlineCommands: () => {[command in GrandlineCommand] : {initialize: (program: Command) => Command}}  =
    () => { 
        return {
            "init": { initialize: addInitCommand },
            "goal": { initialize: addGoalCommand },
            "insight": { initialize: addInsightCommand }
        }
    }
    
export function initializeCommands(program: Command) {
    Object.values(grandlineCommands())
        .map(({initialize}) => initialize(program))
}