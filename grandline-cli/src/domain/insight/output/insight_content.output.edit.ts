import { injectable } from "inversify"
import Insight from "../insight.domain"
import { open as openNano } from "../../../global/editor/_nano"
import { open as openNotePad } from "../../../global/editor/_notepad"
import os = require("os")

export interface EditInsightContentOutput {
    editContent(insight: Insight): Promise<Insight>
}

export const EditInsightContentOutput = Symbol("EditInsightContentOutput")

@injectable()
export class EditInsightContentOutputJsonImpl implements EditInsightContentOutput {
    async editContent(insight: Insight): Promise<Insight> {
        if(os.platform() === "win32") openNotePad(insight.content_path)
        else if (os.platform() === "darwin") openNano(insight.content_path)
        else throw new Error("Unsupported platform")
        return insight
    }
}