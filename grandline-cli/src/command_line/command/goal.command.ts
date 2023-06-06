import { Argument, Command } from "commander";
import { randomUUID } from "crypto";
import moment = require("moment");
import { GoalType, getInitialSubjectiveAchievement } from "../../interface/Goal";
import { GrandLineSuperset } from "../../interface/GrandLineSuperset";
import createGoal from "../../usecase/goal.create";
import { bold } from "colorette";

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
            createGoal(goal)

            console.log(bold(`new goal created! id: ${uuid}`))
        })
}