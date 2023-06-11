import Insight from "./insight.domain";

export interface CreateInsightCase {
    createInsight(insight: Insight): Promise<Insight>
}

export const CreateInsightCase = Symbol.for("CreateInsightCase")