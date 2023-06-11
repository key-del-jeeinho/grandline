import { Argument, Command } from "commander";
import { GoalType, SimpleGoal } from "./goal.domain";
import { CreateGoalCase } from "./goal.usecase.create";
import { bold } from "colorette";
import { inject, injectable } from "inversify";

export interface GoalCommand {
    addGoalCommand(program: Command): Command
}

export const GoalCommand = Symbol.for("GoalCommand")

@injectable()
export class GoalCommandImpl implements GoalCommand {
    constructor(
        @inject(CreateGoalCase) private readonly createGoalCase: CreateGoalCase
    ) {}

    addGoalCommand(program: Command): Command {
        return program.command('goal')
            .argument('<name>', 'name of the goal that you create')
            .argument('<description>', 'details of the goal that you create')
            .addArgument(new Argument('<type>', 'type of goal that you create (ex, repeated)').choices(GoalType))
            .action(async (name, description, type: GoalType) => {
                const goal = new SimpleGoal(type, name, description)
                this.createGoalCase.createGoal(goal)

                console.log(bold(`new goal created! id: ${goal._id}`))
            })
    }
}