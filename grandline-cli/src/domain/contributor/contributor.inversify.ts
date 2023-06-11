import { Container } from "inversify";
import container from "../../global/_inversify";
import { ContributorRepository } from "./repository/contributor.repository";
import { ContributorRepositoryJsonImpl } from "./repository/contributor.repository.json";
import { InquireContributorCase } from "./usecase/contributor.usecase.inquire";
import { CreateContributorCase } from "./usecase/contributor.usecase.create";
import { ContributorService } from "./contributor.service";

export default function bind(container: Container) {
    container.bind<ContributorRepository>(ContributorRepository).to(ContributorRepositoryJsonImpl)
    container.bind<CreateContributorCase>(CreateContributorCase).to(ContributorService)
    container.bind<InquireContributorCase>(InquireContributorCase).to(ContributorService)
}