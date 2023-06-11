import { Container } from "inversify";
import { InsightCommand, InsightCommandImpl } from "./insight.command";
import { InsightService } from "./insight.service";
import { CreateInsightCase } from "./insight.usecase.create";
import { InsightRepository } from "./repository/insight.repository";
import { InsightRepositoryJsonImpl } from "./repository/insight.repository.json";
import { InsightContentRepository } from "./repository/insight_content.repository";
import { InsightContentRepositoryJsonImp } from "./repository/insight_content.repository.json";

export default function bind(container: Container) {
    container.bind<InsightContentRepository>(InsightContentRepository).to(InsightContentRepositoryJsonImp)
    container.bind<InsightRepository>(InsightRepository).to(InsightRepositoryJsonImpl)
    container.bind<CreateInsightCase>(CreateInsightCase).to(InsightService)
    container.bind<InsightCommand>(InsightCommand).to(InsightCommandImpl)
}