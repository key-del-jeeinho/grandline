import { Container } from "inversify";
import { InitializeCommand, InitializeCommandImpl } from "./initialize.command";

export default function bind(container: Container) {
    container.bind<InitializeCommand>(InitializeCommand).to(InitializeCommandImpl)
}