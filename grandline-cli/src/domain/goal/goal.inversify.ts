import { Container } from "inversify";
import { GoalCommand, GoalCommandImpl } from "./goal.command";
import { GoalService } from "./goal.service";
import { CreateGoalCase } from "./goal.usecase.create";
import { GoalRepository } from "./repository/goal.repository";
import { GoalRepositoryJsonImpl } from "./repository/goal.repository.json";

export default function bind(container: Container) {
    container.bind<GoalRepository>(GoalRepository).to(GoalRepositoryJsonImpl)
    container.bind<CreateGoalCase>(CreateGoalCase).to(GoalService)
    container.bind<GoalCommand>(GoalCommand).to(GoalCommandImpl)
}