import { UUID, randomUUID } from "crypto";
import { Moment } from "moment";
import moment = require("moment");

export default interface Project {
    _id: UUID,
    name: string,
    description: string,
    start_at: Moment,
    tags: string[][],
}

export class SimepleProject implements Project {
    constructor(name: string, description: string, tags: string[][]) {
        this.name = name
        this.description = description
        this.start_at = this.start_at
        this.tags = tags
    }

    _id: UUID = randomUUID()
    name: string
    description: string
    start_at: Moment = moment()
    tags: string[][]
}