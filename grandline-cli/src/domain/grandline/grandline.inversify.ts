import { Container } from "inversify"
import { ExistsGrandlineOutput, ExistsGrandlineOutputJsonImpl } from "./grandline.output.exists"
import { GrandlineService } from "./grandline.service"
import { QueryGrandlineCase } from "./grandline.usecase.query"

export default function bind(container: Container) {
    container.bind<ExistsGrandlineOutput>(ExistsGrandlineOutput).to(ExistsGrandlineOutputJsonImpl)
    container.bind<QueryGrandlineCase>(QueryGrandlineCase).to(GrandlineService)
}