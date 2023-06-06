import { exists as existsJson, read as readJson, write as writeJson } from "../../../global/json/_json";
import { version } from "../../../../package.json";
import { Grandline_Goal_Json, getGrandlineGoalPathFromCwd, goalToJson, jsonToGoal } from "../grandline.goal.json";
import Goal from "../goal.domain";
import { UUID } from "crypto";
import { injectable } from "inversify";
import { GoalRepository } from "./goal.repository";

@injectable()
export class GoalRepositoryJsonImpl implements GoalRepository {
    async exists(path?: string): Promise<boolean> {
        if(!path) path = getGrandlineGoalPathFromCwd()

        const isDataBaseExists = existsJson(path)
        if(!isDataBaseExists) return false

        const grandline_goal: Grandline_Goal_Json = await readJson(path)
        const goals = grandline_goal.goals

        const isGoalExists = goals.length > 0
        return isGoalExists
    }

    async saveAll(goals: Goal[], path?: string): Promise<Goal[]> {
        //TODO must change to async foreach or own logic
        return Promise.all(goals.map(async (goal) => this.save(goal, path)))
    }

    async save(goal: Goal, path?: string): Promise<Goal> {
        if(!path) path = getGrandlineGoalPathFromCwd()
        const isDataBaseExists = await existsJson(path)
        if(isDataBaseExists) return this.update(goal, path)
        else return this.create(goal, path)
    }

    async update(goal: Goal, path?: string): Promise<Goal> {
        if(!path) path = getGrandlineGoalPathFromCwd()
        const grandline_goal: Grandline_Goal_Json = await readJson(path)
        const newGrandline_goal: Grandline_Goal_Json = {
            ...grandline_goal,
            goals: [
                ...grandline_goal.goals,
                goalToJson(goal),
            ]
        }
        await writeJson(path, newGrandline_goal)
        return goal
    }

    async create(goal: Goal, path?: string): Promise<Goal> {
        if(!path) path = getGrandlineGoalPathFromCwd()
        const newGrandline_goal: Grandline_Goal_Json = {
            _grandline_version: version,
            _grandline_active: true,
            goals: [
                goalToJson(goal)
            ]
        }
        await writeJson(path, newGrandline_goal)
        return goal
    }

    async findById(id: UUID, path?: string): Promise<Goal | null> {
        if(!path) path = getGrandlineGoalPathFromCwd()

        const isExists = await existsJson(path)
        if(isExists) return null

        const grandline_goal: Grandline_Goal_Json = await readJson(path)
        const goal = grandline_goal.goals
            .find((value) => value._id === id)
        
        return goal ? jsonToGoal(goal) : null
    }

    async findAll(path?: string): Promise<Goal[]> {
        if(!path) path = getGrandlineGoalPathFromCwd()

        const isExists = await existsJson(path)
        if(!isExists) return []

        const grandline_goal: Grandline_Goal_Json = await readJson(path)
        return grandline_goal.goals.map(jsonToGoal)
    }
}