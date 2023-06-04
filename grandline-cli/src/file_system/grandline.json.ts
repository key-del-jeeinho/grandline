import { UUID } from "crypto"
import { ProjectTag } from "../interface/ProjectTag"

export type Grandline_Json = {
    _grandline_version: string,
    _grnadline_active: true,
    project: {
        _id: UUID,
        name: string,
        description: string,
        start_at: string,
        tags: ProjectTag[],
    }
    contributors: {
        _id: UUID,
        name: string,
        email: string,
    }[]
}
export const getGrandlinePathFromCwd = () => `${process.cwd()}/grandline.json`