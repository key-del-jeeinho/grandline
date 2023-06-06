import { UUID, randomUUID } from "crypto";
import { Moment } from "moment";
import moment = require("moment");
import { ProjectTag } from "./ProjectTag";

export default interface Project {
    _id: UUID,
    name: string,
    description: string,
    start_at: Moment,
    tags: ProjectTag[],
}

export class SimepleProject implements Project {
    constructor(name: string, description: string, tags: ProjectTag[]) {
        this.name = name
        this.description = description
        this.start_at = this.start_at
        this.tags = tags
    }

    _id: UUID = randomUUID()
    name: string
    description: string
    start_at: Moment = moment()
    tags: ProjectTag[]
}

export const OFFICIAL_PROJECT_PREFIX = "grandline-"
export const UNOFFICIAL_PROJECT_PREFIX = "redline-"