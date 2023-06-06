import { Command } from "commander";
import { UUID, randomUUID } from "crypto";
import moment = require("moment");
import { Moment } from "moment";
import { GrandLineSuperset } from "../../global/GrandLineSuperset";
import { injectable } from "inversify";

export interface InsightCommand {
    addInsightCommand(program: Command): Command
}

export const InsightCommand = Symbol.for("InsightCommand")

@injectable()
export class InsightCommandImpl implements InsightCommand {
    addInsightCommand(program: Command): Command {
        return program.command('insight')
            .argument('<name>', 'name of insight and created file for write detail')
            .action(async (name: string) => {
                const insightsPathTemplate = "./insights/{name}_{uuid}.md"
                const uuid = randomUUID()
                const createAt = moment()
                const insightsPath = this.resolveInsightPathTemplate(insightsPathTemplate, {
                    name: name,
                    uuid: uuid,
                    createAt: createAt
                })
                const insight = {
                    _id: uuid,
                    name: name,
                    create_at: createAt.format("YYYY.MM.DD"),
                }
                const grandline_insights = GrandLineSuperset({
                    scan: insightsPathTemplate,
                    insights: [insight]
                })
                console.log(grandline_insights)
            })
    }

    private resolveInsightPathTemplate(template: string, {name, uuid, createAt}: InsightPathTemplateArguments) {
        return template.replaceAll("{name}", name.replaceAll(" ", "_"))
            .replaceAll("{uuid}", uuid)
            .replaceAll("{createAt}", createAt.format("YYYYMMDD_hhmmss"))

    }
}

interface InsightPathTemplateArguments {
    name: string,
    uuid: UUID,
    createAt: Moment
}