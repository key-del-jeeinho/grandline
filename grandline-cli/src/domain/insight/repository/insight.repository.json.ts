import { getGrandlineInsightPathFromCwd, insightToJson, jsonToInsight } from "../grandline.insight.json";
import { exists as existsJson, read as readJson, write as writeJson } from "../../../global/file/_json";
import { version } from "../../../../package.json";
import { inject, injectable } from "inversify";
import { InsightRepository } from "./insight.repository";
import Insight from "../insight.domain";
import { Grandline_Insight_Json } from "../grandline.insight.json";
import { InsightContentRepository } from "./insight_content.repository";

@injectable()
export class InsightRepositoryJsonImpl implements InsightRepository {
    constructor(
        @inject(InsightContentRepository) private insightContentRepository: InsightContentRepository
    ) {}

    async exists(path?: string): Promise<boolean> {
        if(!path) path = getGrandlineInsightPathFromCwd()

        const isDataBaseExists = existsJson(path)
        if(!isDataBaseExists) return false

        const grandline_insight: Grandline_Insight_Json = await readJson(path)
        const insights = grandline_insight.insights

        const isInsightExists = insights.length > 0
        return isInsightExists
    }

    async saveAll(insights: Insight[], path?: string): Promise<Insight[]> {
        return Promise.all(insights.map(async (insight) => this.save(insight, path)))
    }

    async save(insight: Insight, path?: string): Promise<Insight> {
        if(!path) path = getGrandlineInsightPathFromCwd()
        const isDataBaseExists = await existsJson(path)
        if(isDataBaseExists) return this.update(insight, path)
        else return this.create(insight, path)
    }

    async create(insight: Insight, path?: string): Promise<Insight> {
        if(!path) path = getGrandlineInsightPathFromCwd()
        const newGrandline_insight: Grandline_Insight_Json = {
            _grandline_version: version,
            _grandline_active: true,
            scan: "grandline",
            insights: [
                insightToJson(insight)
            ]
        }
        await writeJson(path, newGrandline_insight)
        if(!this.insightContentRepository.exists(insight)) this.insightContentRepository.create(insight)
        return insight
    }

    async update(insight: Insight, path?: string): Promise<Insight> {
        if(!path) path = getGrandlineInsightPathFromCwd()
        const grandline_insight: Grandline_Insight_Json = await readJson(path)
        const newGrandline_insight: Grandline_Insight_Json = {
            ...grandline_insight,
            insights: [
                ...grandline_insight.insights,
                insightToJson(insight)
            ]
        }
        if(!this.insightContentRepository.exists(insight)) this.insightContentRepository.create(insight)
        await writeJson(path, newGrandline_insight)
        return insight
    }

    async findById(id: string, path?: string): Promise<Insight | null> {
        if(!path) path = getGrandlineInsightPathFromCwd()

        const isExists = await this.exists(path)
        if(!isExists) return null

        const grandline_insight: Grandline_Insight_Json = await readJson(path)
        const insights = grandline_insight.insights
            .find((value) => value._id === id)

        return insights ? jsonToInsight(insights) : null
    }

    async findAll(path?: string): Promise<Insight[]> {
        if(!path) path = getGrandlineInsightPathFromCwd()

        const isExists = await this.exists(path)
        if(!isExists) return []

        const grandline_insight: Grandline_Insight_Json = await readJson(path)
        return grandline_insight.insights.map(jsonToInsight)
    }
}