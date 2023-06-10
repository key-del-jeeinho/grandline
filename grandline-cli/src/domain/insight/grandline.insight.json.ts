import { GrandLineSuperset } from "../../global/GrandLineSuperset";
import { UUID } from "crypto";
import Insight from "./insight.domain";
import { jsonToMoment, momentToJson } from "../../global/file/moment.json";

export type Grandline_Insight_Json = GrandLineSuperset<{
    scan: string,
    insights: JsonInsight[]
}>
export const getGrandlineInsightPathFromCwd = () => `${process.cwd()}/grandline.insight.json`

export type JsonInsight = {
    _id: UUID,
    name: string,
    content_path: string,
    create_at: string,
}

export function insightToJson({
    _id,
    name,
    content_path,
    create_at,
}: Insight): JsonInsight {
    return {
        _id: _id,
        name: name,
        content_path: content_path,
        create_at: momentToJson(create_at),
    }
}

export function jsonToInsight({
    _id,
    name,
    content_path,
    create_at,
}: JsonInsight): Insight {
    return {
        _id: _id,
        name: name,
        content_path: content_path,
        create_at: jsonToMoment(create_at),
    }
}