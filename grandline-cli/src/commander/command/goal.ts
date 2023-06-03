import { Argument, Command } from "commander";
import { randomUUID } from "crypto";
import moment = require("moment");
import { GoalType, getInitialSubjectiveAchievement } from "../../interface/Goal";

export function addGoalCommand(program: Command): Command {
    return program.command('goal')
        .argument('<name>', 'name of the goal that you create')
        .argument('<description>', 'details of the goal that you create')
        .addArgument(new Argument('<type>', 'type of goal that you create (ex, repeated)').choices(GoalType))
        .action(async (name, description, _type: GoalType) => {
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