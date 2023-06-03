import { Command } from "commander"
import { addInitCommand } from "./command/init"
import { addGoalCommand } from "./command/goal"
import { addInsightCommand } from "./command/insight"

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