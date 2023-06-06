import { UUID, randomUUID } from "crypto";
import { Moment } from "moment";
import moment = require("moment");

export default interface Insight {
    _id: UUID,
    name: string,
    content_path: string,
    create_at: Moment,
}

export class SimpleInsight implements Insight {
    constructor(name: string) {
        this.name = name
        this.content_path = resolveInsightPathTemplate({
            name: name,
            uuid: this._id,
            createAt: this.create_at
        })
    }

    _id: UUID = randomUUID()
    name: string
    content_path: string
    create_at: Moment = moment()
}

export function resolveInsightPathTemplate({name, uuid, createAt}: InsightPathTemplateArguments) {
    return INSIGHT_CONTENT_PATH_TEMPLATE.replaceAll("{name}", name.replaceAll(" ", "_"))
        .replaceAll("{uuid}", uuid)
        .replaceAll("{createAt}", createAt.format("YYYYMMDD_hhmmss"))

}

const INSIGHT_CONTENT_PATH_TEMPLATE = "./insights/{name}_{uuid}.md"

interface InsightPathTemplateArguments {
    name: string,
    uuid: UUID,
    createAt: Moment
}