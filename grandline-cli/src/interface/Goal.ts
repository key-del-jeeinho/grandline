import { UUID } from "crypto";
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

export default interface Goal {
    _id: UUID,
    _type: GoalType,

}

export function getInitialSubjectiveAchievement(type: GoalType) {
    return GoalMetadata[type].initialSubjectiveAchievement
}