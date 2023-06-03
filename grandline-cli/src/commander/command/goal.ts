import { Command } from "commander";
import { randomUUID } from "crypto";
import moment = require("moment");
import { GoalType } from "../../interface/Goal";

type GoalTypeArgument = GoalType | string

export function addGoalCommand(program: Command): Command {
    return program.command('goal')
        .arguments('<name> <description> <type>')
        .action(async (name, description, _type: GoalTypeArgument) => {
            if(!GoalType.includes(_type) ) throw Error(`type must be one of ${Object.keys(GoalType).join(', ')}`)
            const type = _type as GoalType
            const goal = {
                _id: randomUUID(),
                _type: type,
                name: name,
                description: description,
                start_at: moment(),
                subjective_achievement: getInitialSubjectiveAchievement(type),
            }
            console.log(JSON.stringify(goal, null, 2))
        })
}

function getInitialSubjectiveAchievement(type: GoalType): number | null {
    switch(type) {
        case "repeated": return 0
        case "one_off": return null
        default: return 0
    }
}