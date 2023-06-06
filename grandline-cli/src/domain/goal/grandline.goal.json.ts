import { UUID } from "crypto"
import { GrandLineSuperset } from "../../global/GrandLineSuperset"
import Goal, { GoalType, SubjectiveAchievement } from "./Goal"
import { jsonToMoment, momentToJson } from "../../global/json/moment.json"

export type Grandline_Goal_Json = GrandLineSuperset<{
    goals: JsonGoal[]
}>
export const getGrandlineGoalPathFromCwd = () => `${process.cwd()}/grandline.goal.json`

export type JsonGoal = {
    _id: UUID,
    _type: GoalType,
    name: string,
    description: string,
    start_at: string,
    achievement: SubjectiveAchievement
}

export function goalToJson({
    _id,
    _type,
    name,
    description,
    start_at,
    subjective_achievement,
}: Goal): JsonGoal {
    return {
        _id: _id,
        _type: _type,
        name: name,
        description: description,
        start_at: momentToJson(start_at),
        achievement: subjective_achievement,
    }
}

export function jsonToGoal({
    _id,
    _type,
    name,
    description,
    start_at,
    achievement,
}: JsonGoal): Goal {
    return {
        _id: _id,
        _type: _type,
        name: name,
        description: description,
        start_at: jsonToMoment(start_at),
        subjective_achievement: achievement,
    }
}
