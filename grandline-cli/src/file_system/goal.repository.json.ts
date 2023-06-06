import { exists as existsJson, read as readJson, write as writeJson } from "./_json";
import { version } from "../../package.json";
import { Grandline_Goal_Json, getGrandlineGoalPathFromCwd, goalToJson, jsonToGoal } from "./grandline.goal.json";
import Goal from "../interface/Goal";
import { UUID } from "crypto";

export async function exists(path?: string): Promise<boolean> {
    if(!path) path = getGrandlineGoalPathFromCwd()

    const isDataBaseExists = existsJson(path)
    if(!isDataBaseExists) return false

    const grandline_goal: Grandline_Goal_Json = await readJson(path)
    const goals = grandline_goal.goals

    const isGoalExists = goals.length > 0
    return isGoalExists
}

export async function saveAll(goals: Goal[], path?: string): Promise<Goal[]> {
    //must change to async foreach or own logic
    return Promise.all(goals.map(async (goal) => save(goal, path)))
}

export async function save(goal: Goal, path?: string): Promise<Goal> {
    if(!path) path = getGrandlineGoalPathFromCwd()
    const isDataBaseExists = await existsJson(path)
    if(isDataBaseExists) return update(goal, path)
    else return create(goal, path)
}

export async function update(goal: Goal, path?: string): Promise<Goal> {
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

export async function create(goal: Goal, path?: string): Promise<Goal> {
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

export async function findById(id: UUID, path?: string): Promise<Goal | null> {
    if(!path) path = getGrandlineGoalPathFromCwd()

    const isExists = await existsJson(path)
    if(isExists) return null

    const grandline_goal: Grandline_Goal_Json = await readJson(path)
    const goal = grandline_goal.goals
        .find((value) => value._id === id)
    
    return goal ? jsonToGoal(goal) : null
}

export async function findAll(path?: string): Promise<Goal[]> {
    if(!path) path = getGrandlineGoalPathFromCwd()

    const isExists = await existsJson(path)
    if(!isExists) return []

    const grandline_goal: Grandline_Goal_Json = await readJson(path)
    return grandline_goal.goals.map(jsonToGoal)
}