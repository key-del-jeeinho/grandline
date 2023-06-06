import { ProjectTag } from "../ProjectTag"

export default interface ProjectInquirerContext {
    projectName: string,
    projectDescription: string,
    projectTags: ProjectTag[],
}

export interface ProjectInquirerContextBuilder {
    changeProjectName(projectName: string): ProjectInquirerContextBuilder
    getProjectName(): string | undefined

    changeProjectDescription(projectDescription: string): ProjectInquirerContextBuilder
    getProjectDescription(): string | undefined

    changeProjectTags(projectTags: ProjectTag[]): ProjectInquirerContextBuilder
    getProjectTags(): ProjectTag[] | undefined
}

export class SimpleProjectInquirerContextBuilder implements ProjectInquirerContextBuilder{
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

    changeProjectName(projectName: string): ProjectInquirerContextBuilder {
        return new SimpleProjectInquirerContextBuilder(projectName, this.#projectDescription, this.#projectTags)
    }
    getProjectName(): string | undefined {
        return this.#projectName
    }
    changeProjectDescription(projectDescription: string): ProjectInquirerContextBuilder {
        return new SimpleProjectInquirerContextBuilder(this.#projectName, projectDescription, this.#projectTags)
    }
    getProjectDescription(): string | undefined {
        return this.#projectDescription
    }
    changeProjectTags(projectTags: ProjectTag[]): ProjectInquirerContextBuilder {
        return new SimpleProjectInquirerContextBuilder(this.#projectName, this.#projectDescription, projectTags)
    }
    getProjectTags(): ProjectTag[] | undefined {
        return this.#projectTags
    }
}

export function complete(builder: ProjectInquirerContextBuilder): ProjectInquirerContext{
    const projectName = builder.getProjectName()
    const projectDescription = builder.getProjectDescription()
    const projectTags = builder.getProjectTags()
    if(!projectName) throw Error("project name must be defined!")
    if(!projectDescription) throw Error("project description must be defined!")
    if(!projectTags) throw Error("project tags must be defined!")
    return {
        projectName,
        projectDescription,
        projectTags
    }
}