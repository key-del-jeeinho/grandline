import Insight from "../insight.domain"

export interface InsightContentRepository {
    exists(insight: Insight): Promise<boolean>
    create(insight: Insight): Promise<Insight>
}

export const InsightContentRepository = Symbol.for("InsightContentRepository")