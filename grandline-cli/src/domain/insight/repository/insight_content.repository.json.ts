import { injectable } from "inversify";
import { exists as existsJson, read as readMd, write as writeMd } from "../../../global/file/_md";
import { InsightContentRepository } from "./insight_content.repository";
import Insight from "../insight.domain";

@injectable()
export class InsightContentRepositoryJsonImp implements InsightContentRepository {
    async exists(insight: Insight): Promise<boolean> {
        const isContentExists = await existsJson(insight.content_path)
        return isContentExists
    }

    async create(insight: Insight): Promise<Insight> {
        const path = insight.content_path
        if(!path) throw new Error("Insight content path is not defined")
        else await writeMd(path, `
            #${insight.name}
            _please write your insight here_
        `)
        return insight
    }
}