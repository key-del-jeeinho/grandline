import { UUID } from "crypto"
import Goal from "../goal.domain"

export interface GoalRepository {
    exists(path?: string): Promise<boolean>
    saveAll(goals: Goal[], path?: string): Promise<Goal[]>
    save(goal: Goal, path?: string): Promise<Goal>
    update(goal: Goal, path?: string): Promise<Goal>
    create(goal: Goal, path?: string): Promise<Goal>
    findById(id: UUID, path?: string): Promise<Goal | null>
    findAll(path?: string): Promise<Goal[]>
}

export const GoalRepository = Symbol.for("GoalRepository")