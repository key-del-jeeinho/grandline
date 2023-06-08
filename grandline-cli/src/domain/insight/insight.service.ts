import { inject, injectable } from "inversify";
import { CreateInsightCase } from "./insight.usecase.create";
import Insight from "./insight.domain";
import { InsightRepository } from "./repository/insight.repository";

@injectable()
export class InsightService implements CreateInsightCase {
    constructor(
        @inject(InsightRepository) private readonly insightRepository: InsightRepository
    ) {}

    async createInsight(insight: Insight): Promise<Insight> {
        this.insightRepository.save(insight)
        return insight
    }
}