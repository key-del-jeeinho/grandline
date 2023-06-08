import "reflect-metadata";
import { Container } from "inversify";
import bindGoal from "../domain/goal/goal.inversify";
import bindInitialize from "../domain/initialize/initialize.inversify";
import bindContributor from "../domain/contributor/contributor.inversify";
import bindInsight from "../domain/insight/insight.inversify";
import bindProject from "../domain/project/project.inversify";

const container = new Container()
bindContributor(container)
bindGoal(container)
bindInitialize(container)
bindInsight(container)
bindProject(container)

export default container