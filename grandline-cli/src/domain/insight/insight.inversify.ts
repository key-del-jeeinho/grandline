import { Container } from "inversify";
import { InsightCommand, InsightCommandImpl } from "./insight.command";
import { InsightService } from "./insight.service";
import { CreateInsightCase } from "./insight.usecase.create";
import { InsightRepository } from "./repository/insight.repository";
import { InsightRepositoryJsonImpl } from "./repository/insight.repository.json";

export default function bind(container: Container) {
    container.bind<InsightRepository>(InsightRepository).to(InsightRepositoryJsonImpl)
    container.bind<CreateInsightCase>(CreateInsightCase).to(InsightService)
    container.bind<InsightCommand>(InsightCommand).to(InsightCommandImpl)
}