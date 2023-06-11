import { UUID, randomUUID } from "crypto";
import { Moment } from "moment";
import moment = require("moment");
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
export type SubjectiveAchievement = typeof GoalMetadata[GoalType]["initialSubjectiveAchievement"]

export default interface Goal {
    _id: UUID,
    _type: GoalType,
    name: string,
    description: string,
    start_at: Moment,
    subjective_achievement: SubjectiveAchievement,
}

export class SimpleGoal implements Goal {
    constructor(
        _type: GoalType,
        name: string,
        description: string,
    ) {
        this._type = _type
        this.name = name
        this.description = description
        this.subjective_achievement = getInitialSubjectiveAchievement(this._type)
    }
    _id: UUID = randomUUID()
    _type: GoalType
    name: string
    description: string
    start_at: Moment = moment()
    subjective_achievement: SubjectiveAchievement
}

function getInitialSubjectiveAchievement(type: GoalType) {
    return GoalMetadata[type].initialSubjectiveAchievement
}