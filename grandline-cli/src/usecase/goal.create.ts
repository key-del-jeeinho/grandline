import { save as saveGoal } from "../file_system/goal.repository.json";
import Goal from "../interface/Goal";

export default async function createGoal(
    goal: Goal
): Promise<Goal> {
    return saveGoal(goal)
}