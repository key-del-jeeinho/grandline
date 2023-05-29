import Contributor from "./Contributor";
import Project from "./Project";

export default interface GrandLine {
    _grandline_version: string,
    _grandline_active: boolean,
    project: Project,
    contributor: Contributor[],
}