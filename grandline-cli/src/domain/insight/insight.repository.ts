import Insight from "./insight.domain"

export interface InsightRepository {
    exists(path?: string): Promise<boolean>
    saveAll(insights: Insight[], path?: string): Promise<Insight[]>
    save(insight: Insight, path?: string): Promise<Insight>
    create(insight: Insight, path?: string): Promise<Insight>
    update(insight: Insight, path?: string): Promise<Insight>
    findById(id: string, path?: string): Promise<Insight | null>
    findAll(path?: string): Promise<Insight[]>
}

export const InsightRepository = Symbol.for("InsightRepository")