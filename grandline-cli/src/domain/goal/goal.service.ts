import { inject, injectable } from "inversify";
import { CreateGoalCase } from "./goal.usecase.create";
import { GoalRepository } from "./repository/goal.repository";
import Goal from "./goal.domain";

@injectable()
export class GoalService implements CreateGoalCase {
    constructor(
        @inject(GoalRepository) private readonly goalRepository: GoalRepository
    ) {}

    async createGoal(
        goal: Goal
    ): Promise<Goal> {
        return this.goalRepository.save(goal)
    }
}