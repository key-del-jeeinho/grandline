import { Argument, Command } from "commander";
import { randomUUID } from "crypto";
import moment = require("moment");
import { version } from "../../../package.json";
import { GoalType, getInitialSubjectiveAchievement } from "../../interface/Goal";

export function addGoalCommand(program: Command): Command {
    return program.command('goal')
        .argument('<name>', 'name of the goal that you create')
        .argument('<description>', 'details of the goal that you create')
        .addArgument(new Argument('<type>', 'type of goal that you create (ex, repeated)').choices(GoalType))
        .action(async (name, description, type: GoalType) => {
            const uuid = randomUUID()
            const startAt = moment()
            const subjectiveAchievement = getInitialSubjectiveAchievement(type)
            const goal = {
                _id: uuid,
                _type: type,
                name: name,
                description: description,
                start_at: startAt,
                subjective_achievement: subjectiveAchievement,
            }
            const grandline_goals = {
                _grandline_version: version,
                _grandline_active: true,
                goals: [goal]
            }
            console.log(JSON.stringify(grandline_goals, null, 2))
        })
}