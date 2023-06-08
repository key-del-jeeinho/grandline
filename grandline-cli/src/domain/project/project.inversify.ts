import { Container } from "inversify";
import { ProjectService } from "./project.service";
import { ProjectRepository } from "./repository/project.repository";
import { ProjectRepositoryJsonImpl } from "./repository/project.repository.json";
import { CreateProjectCase } from "./usecase/project.usecase.create";
import { InquireProjectCase } from "./usecase/project.usecase.inquire";
import { InquireOverwriteProjectCase } from "./usecase/project.usecase.inquire_overwrite";

export default function bind(container: Container) {
    container.bind<ProjectRepository>(ProjectRepository).to(ProjectRepositoryJsonImpl)
    container.bind<CreateProjectCase>(CreateProjectCase).to(ProjectService)
    container.bind<InquireProjectCase>(InquireProjectCase).to(ProjectService)
    container.bind<InquireOverwriteProjectCase>(InquireOverwriteProjectCase).to(ProjectService)
}