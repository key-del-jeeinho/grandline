// import { Command } from "commander"
// import { addInitCommand } from "../domain/initialize/initialize.command"
// import { addGoalCommand } from "../domain/goal/goal.command"
// import { addInsightCommand } from "../domain/insight/insight.command"

// type GrandlineCommand = "goal" | "init" | "insight"

// const grandlineCommands: () => {[command in GrandlineCommand] : {initialize: (program: Command) => Command}}  =
//     () => { 
//         return {
//             "init": { initialize: addInitCommand },
//             "goal": { initialize: addGoalCommand },
//             "insight": { initialize: addInsightCommand }
//         }
//     }
    
// export function initializeCommands(program: Command) {
//     Object.values(grandlineCommands())
//         .map(({initialize}) => initialize(program))
// }