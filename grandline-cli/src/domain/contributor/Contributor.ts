import { UUID, randomUUID } from "crypto";

export default interface Contributor {
    _id: UUID,
    name: string,
    email: string,
}

export class SimpleContributor implements Contributor {
    constructor(name: string, email: string) {
        this.name = name
        this.email = email
    }

    _id: UUID = randomUUID()
    name: string
    email: string
}