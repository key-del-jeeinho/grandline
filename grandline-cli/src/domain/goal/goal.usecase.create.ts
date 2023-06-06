import Goal from "./goal.domain";

export interface CreateGoalCase {
    createGoal(goal: Goal): Promise<Goal>
}

export const CreateGoalCase = Symbol.for("CreateGoalCase")