import { UUID } from "crypto";
import { Moment } from "moment";
const GoalMetadata = {
    repeated: {
        initialSubjectiveAchievement: 0
    },
    one_off: {
        initialSubjectiveAchievement: null
    }
}
export type GoalType = keyof(typeof GoalMetadata)
export const GoalType = Object.keys(GoalMetadata)
type SubjectiveAchievement = typeof GoalMetadata[GoalType]["initialSubjectiveAchievement"]

export default interface Goal {
    _id: UUID,
    _type: GoalType,
    name: string,
    description: string,
    start_at: Moment,
    subjective_achievement: SubjectiveAchievement,
}

export function getInitialSubjectiveAchievement(type: GoalType) {
    return GoalMetadata[type].initialSubjectiveAchievement
}