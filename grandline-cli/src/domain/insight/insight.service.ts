import { inject, injectable } from "inversify";
import { CreateInsightCase } from "./insight.usecase.create";
import Insight from "./insight.domain";
import { InsightRepository } from "./repository/insight.repository";
import { InsightContentRepository } from "./repository/insight_content.repository";
import { InquireEditInsightContentOutput } from "./output/insight_content.output.inquire_edit";
import { EditInsightContentOutput } from "./output/insight_content.output.edit";

@injectable()
export class InsightService implements CreateInsightCase {
    constructor(
        @inject(InsightRepository) private readonly insightRepository: InsightRepository,
        @inject(InsightContentRepository) private insightContentRepository: InsightContentRepository,
        @inject(InquireEditInsightContentOutput) private inquireEditInsightContentOutput: InquireEditInsightContentOutput,
        @inject(EditInsightContentOutput) private editInsightContentOutput: EditInsightContentOutput
    ) {}

    async createInsight(insight: Insight): Promise<Insight> {
        this.insightRepository.save(insight)
        if(!await this.insightContentRepository.exists(insight)) this.insightContentRepository.create(insight)
        const created = await this.initializeInsightContent(insight)
        return created
    }

    async initializeInsightContent(insight: Insight): Promise<Insight> {
        const editContent = await this.inquireEditInsightContentOutput.inquireEditContent()
        return editContent ? this.editInsightContentOutput.editContent(insight) : insight
    }
}