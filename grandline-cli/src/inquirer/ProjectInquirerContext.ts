import { ProjectTag } from "../interface/ProjectTag"

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
    return {
        projectName: builder.getProjectName()!,
        projectDescription: builder.getProjectDescription()!,
        projectTags: builder.getProjectTags()!,
    } as ProjectInquirerContext
}