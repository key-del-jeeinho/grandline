import { inject, injectable } from "inversify";
import { CreateInsightCase } from "./insight.usecase.create";
import Insight from "./insight.domain";
import { InsightRepository } from "./repository/insight.repository";
import { InsightContentRepository } from "./repository/insight_content.repository";

@injectable()
export class InsightService implements CreateInsightCase {
    constructor(
        @inject(InsightRepository) private readonly insightRepository: InsightRepository,
        @inject(InsightContentRepository) private insightContentRepository: InsightContentRepository,
    ) {}

    async createInsight(insight: Insight): Promise<Insight> {
        this.insightRepository.save(insight)
        if(!await this.insightContentRepository.exists(insight)) this.insightContentRepository.create(insight)
        return insight
    }
}