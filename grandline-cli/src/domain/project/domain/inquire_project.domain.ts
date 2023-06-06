import { ProjectTag } from "./project_tag.domain"

export default interface InquireProject {
    projectName: string,
    projectDescription: string,
    projectTags: ProjectTag[],
}

export interface InquireProjectBuilder {
    changeProjectName(projectName: string): InquireProjectBuilder
    getProjectName(): string | undefined

    changeProjectDescription(projectDescription: string): InquireProjectBuilder
    getProjectDescription(): string | undefined

    changeProjectTags(projectTags: ProjectTag[]): InquireProjectBuilder
    getProjectTags(): ProjectTag[] | undefined
    build(): InquireProject
}

export class SimpleProjectInquirerContextBuilder implements InquireProjectBuilder{
    #projectName: string | undefined
    #projectDescription: string | undefined
    #projectTags: ProjectTag[] | undefined

    static of(
        {
            projectName, projectDescription, projectTags
        }: {
            projectName?: string | undefined,
            projectDescription?: string | undefined,
            projectTags?: ProjectTag[] | undefined
        }
    ) {
        return new SimpleProjectInquirerContextBuilder(
            projectName, 
            projectDescription, 
            projectTags
        )
    }

    constructor(
        projectName?: string | undefined,
        projectDescription?: string | undefined,
        projectTags?: ProjectTag[] | undefined
    ) {
        this.#projectName = projectName
        this.#projectDescription = projectDescription
        this.#projectTags = projectTags
    }

    changeProjectName(projectName: string): InquireProjectBuilder {
        return new SimpleProjectInquirerContextBuilder(projectName, this.#projectDescription, this.#projectTags)
    }
    getProjectName(): string | undefined {
        return this.#projectName
    }
    changeProjectDescription(projectDescription: string): InquireProjectBuilder {
        return new SimpleProjectInquirerContextBuilder(this.#projectName, projectDescription, this.#projectTags)
    }
    getProjectDescription(): string | undefined {
        return this.#projectDescription
    }
    changeProjectTags(projectTags: ProjectTag[]): InquireProjectBuilder {
        return new SimpleProjectInquirerContextBuilder(this.#projectName, this.#projectDescription, projectTags)
    }
    getProjectTags(): ProjectTag[] | undefined {
        return this.#projectTags
    }
    build(): InquireProject {
        const projectName = this.getProjectName()
        const projectDescription = this.getProjectDescription()
        const projectTags = this.getProjectTags()
        if(!projectName) throw Error("project name must be defined!")
        if(!projectDescription) throw Error("project description must be defined!")
        if(!projectTags) throw Error("project tags must be defined!")
        return {
            projectName,
            projectDescription,
            projectTags
        }
    }
}