import { injectable } from "inversify";
import Insight from "../insight.domain";
import confirm from '@inquirer/confirm'

export interface InquireEditInsightContentOutput {
    inquireEditContent(): Promise<boolean>
}

export const InquireEditInsightContentOutput = Symbol("InquireEditInsightContentOutput")

@injectable()
export class InquireEditInsightContentOutputJsonImpl implements InquireEditInsightContentOutput {
    inquireEditContent(): Promise<boolean> {
        return confirm({ message: `do you want to edit insight content?` })
    }
}