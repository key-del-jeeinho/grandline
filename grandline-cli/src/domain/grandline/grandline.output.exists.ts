import { injectable } from "inversify"
import { getGrandlinePathFromCwd } from "./grandline.json"
import { exists as existsJson } from "../../global/json/_json"

export interface ExistsGrandlineOutput {
    exists(): Promise<boolean>
}

export const ExistsGrandlineOutput = Symbol.for("ExistsGrandlineOutput")

@injectable()
export class ExistsGrandlineOutputJsonImpl implements ExistsGrandlineOutput {
    async exists(): Promise<boolean> {
        const path = getGrandlinePathFromCwd()
        return existsJson(path)
    }
}