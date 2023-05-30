export default interface ProjectInquirerContext {
    projectName: string,
    projectDescription: string,
}

export interface ProjectInquirerContextBuilder {
    changeProjectName(projectName: string): ProjectInquirerContextBuilder
    getProjectName(): string | undefined

    changeProjectDescription(projectDescription: string): ProjectInquirerContextBuilder
    getProjectDescription(): string | undefined
}

export class SimpleProjectInquirerContextBuilder implements ProjectInquirerContextBuilder{
    #projectName: string | undefined
    #projectDescription: string | undefined

    constructor(projectName?: string | undefined, projectDescription?: string | undefined) {
        this.#projectName = projectName
        this.#projectDescription = projectDescription
    }

    changeProjectName(projectName: string): ProjectInquirerContextBuilder {
        return new SimpleProjectInquirerContextBuilder(projectName, this.#projectDescription)
    }
    getProjectName(): string | undefined {
        return this.#projectName
    }
    changeProjectDescription(projectDescription: string): ProjectInquirerContextBuilder {
        return new SimpleProjectInquirerContextBuilder(this.#projectName, projectDescription)
    }
    getProjectDescription(): string | undefined {
        return this.#projectDescription
    }
}

export function complete(builder: ProjectInquirerContextBuilder): ProjectInquirerContext{
    return {
        projectName: builder.getProjectName()!,
        projectDescription: builder.getProjectDescription()!,
    } as ProjectInquirerContext
}