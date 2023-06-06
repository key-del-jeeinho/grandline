import { Command } from "commander";
import { inject, injectable } from "inversify";
import { SimpleInsight } from "./insight.domain";
import { bold } from "colorette";
import { CreateInsightCase } from "./insight.usecase.create";

export interface InsightCommand {
    addInsightCommand(program: Command): Command
}

export const InsightCommand = Symbol.for("InsightCommand")

@injectable()
export class InsightCommandImpl implements InsightCommand {
    constructor(
        @inject(CreateInsightCase) private readonly createInsightCase: CreateInsightCase
    ) {}

    addInsightCommand(program: Command): Command {
        return program.command('insight')
            .argument('<name>', 'name of insight and created file for write detail')
            .action(async (name: string) => {
                const insight = new SimpleInsight(name)
                this.createInsightCase.createInsight(insight)

                console.log(bold(`new insight created! id: ${insight._id}`))
            })
    }
}