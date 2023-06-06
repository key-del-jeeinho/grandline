import InquireProject from "../domain/inquire_project.domain"
import Project from "../domain/project.domain"

export interface InquireProjectCase {
    inquireProject(inquireProject: InquireProject): Promise<Project>
}

export const InquireProjectCase = Symbol.for("InquireProjectCase")
