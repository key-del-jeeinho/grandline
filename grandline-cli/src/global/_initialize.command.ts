import { Command } from "commander"
import { InitializeCommand } from "../domain/initialize/initialize.command"
import { GoalCommand } from "../domain/goal/goal.command"
import { InsightCommand } from "../domain/insight/insight.command"
import { inject, injectable } from "inversify"

type GrandlineCommand = "goal" | "init" | "insight"

export interface GrandlineCommandInitializer {
    initializeCommands(program: Command): void
}

export const GrandlineCommandInitializer = Symbol.for("GrandlineCommandInitializer")

@injectable()
export class CentralizedGrandlineCommandInitializer {
    constructor(
        @inject(InitializeCommand) private readonly initializeCommand: InitializeCommand,
        @inject(GoalCommand) private readonly goalCommand: GoalCommand,
        @inject(InsightCommand) private readonly insightCommand: InsightCommand
    ) {}

    getGrandlineCommands(): {[command in GrandlineCommand] : {initialize: (program: Command) => Command}} {
        return  {
            "init": { initialize: (command) => this.initializeCommand.addInitCommand(command) },
            "goal": { initialize: (command) => this.goalCommand.addGoalCommand(command) },
            "insight": { initialize: (command) => this.insightCommand.addInsightCommand(command) }
        }
    }
        
    initializeCommands(program: Command) {
        Object.values(this.getGrandlineCommands())
            .map(({initialize}) => initialize(program))
    }
}