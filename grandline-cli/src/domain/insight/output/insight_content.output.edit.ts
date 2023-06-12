import { injectable } from "inversify"
import Insight from "../insight.domain"
import { open as openNano } from "../../../global/editor/_nano"

export interface EditInsightContentOutput {
    editContent(insight: Insight): Promise<Insight>
}

export const EditInsightContentOutput = Symbol("EditInsightContentOutput")

@injectable()
export class EditInsightContentOutputJsonImpl implements EditInsightContentOutput {
    async editContent(insight: Insight): Promise<Insight> {
        openNano(insight.content_path)
        return insight
    }
}