import { save as saveGoal } from "./goal.repository.json";
import Goal from "./Goal";

export default async function createGoal(
    goal: Goal
): Promise<Goal> {
    return saveGoal(goal)
}