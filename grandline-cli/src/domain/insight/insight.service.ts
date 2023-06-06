import { inject, injectable } from "inversify";
import { CreateInsightCase } from "./insight.usecase.create";
import Insight from "./insight.domain";
import { InsightRepository } from "./insight.repository";

@injectable()
export class Insightservice implements CreateInsightCase {
    constructor(
        @inject(InsightRepository) private readonly insightRepository: InsightRepository
    ) {}

    async createInsight(insight: Insight): Promise<Insight> {
        this.insightRepository.save(insight)
        return insight
    }
}