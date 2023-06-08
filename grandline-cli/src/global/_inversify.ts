import "reflect-metadata";
import { Container } from "inversify";
import bindGoal from "../domain/goal/goal.inversify";
import bindInitialize from "../domain/initialize/initialize.inversify";
import bindContributor from "../domain/contributor/contributor.inversify";
import bindInsight from "../domain/insight/insight.inversify";
import bindProject from "../domain/project/project.inversify";
import { CentralizedGrandlineCommandInitializer, GrandlineCommandInitializer } from "./_initialize.command";

const container = new Container()

bindCommandInitializer(container)
bindContributor(container)
bindGoal(container)
bindInitialize(container)
bindInsight(container)
bindProject(container)

function bindCommandInitializer(container: Container) {
    container.bind<GrandlineCommandInitializer>(GrandlineCommandInitializer).to(CentralizedGrandlineCommandInitializer)
}

export default container