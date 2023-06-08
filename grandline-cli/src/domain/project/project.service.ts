import { inject, injectable } from "inversify";
import { InquireProjectCase } from "./usecase/project.usecase.inquire";
import { CreateProjectCase } from "./usecase/project.usecase.create";
import Project, { OFFICIAL_PROJECT_PREFIX, SimpleProject, UNOFFICIAL_PROJECT_PREFIX } from "./domain/project.domain";
import InquireProject, { InquireProjectBuilder, SimpleProjectInquirerContextBuilder } from "./domain/inquire_project.domain";
import { ProjectRepository } from "./repository/project.repository";
import { ProjectTag } from "./domain/project_tag.domain";
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'
import { InquireOverwriteProjectCase } from "./usecase/project.usecase.inquire_overwrite";

@injectable()
export class ProjectService implements CreateProjectCase, InquireProjectCase, InquireOverwriteProjectCase {
    constructor(
        @inject(ProjectRepository) private readonly projectRepository: ProjectRepository
    ) {}

    createProject(project: Project): Promise<Project> {
        return this.projectRepository.save(project)
    }
    
    inquireProject(inquireProject: InquireProject): Promise<Project> {
        const project: Promise<Project> = Promise.resolve(SimpleProjectInquirerContextBuilder.of(inquireProject))
        .then((builder) => this.inquireProjectName(builder))
        .then((builder) => this.inquireProjectDescription(builder))
        .then((builder) => this.inquireTags(builder))
        .then((builder) => builder.build())
        .then((ctx) => {
            const name = ctx.projectName
            const description = ctx.projectDescription
            const tags = ctx.projectTags
            const project = new SimpleProject(name, description, tags)
            return project
        })
        return project
    }
    
    async inquireOverwriteProject(): Promise<boolean> {
        const isOverwrite = confirm({ message: 'already initialized. do you want to overwrite?' })
        return isOverwrite
    }


    private async inquireProjectName(ctx: InquireProjectBuilder): Promise<InquireProjectBuilder> {
        const projectNameInContext = ctx.getProjectName()
        const isProjectNameAlreadyAnswered = projectNameInContext
        const newProjectName = !isProjectNameAlreadyAnswered 
            ? await input({
                message: 'please write your project name!',
                default: 'grandline-example',
            }) : projectNameInContext
        const isOfficialProjectName = !newProjectName.startsWith(`${OFFICIAL_PROJECT_PREFIX}`)
            ? !await confirm({ message: 'is unofficial project?' })
            : true
        const newProjectNameWithPrefix = this.getNewProjectNameWithPrefix(isOfficialProjectName, newProjectName)
        return ctx.changeProjectName(newProjectNameWithPrefix)
    }

    private getNewProjectNameWithPrefix(isOfficialProjectName: boolean, projectName: string) {
        if(isOfficialProjectName && !projectName.startsWith(OFFICIAL_PROJECT_PREFIX))
            return `${OFFICIAL_PROJECT_PREFIX}${projectName}`
        if(!isOfficialProjectName && !projectName.startsWith(UNOFFICIAL_PROJECT_PREFIX))
            return `${UNOFFICIAL_PROJECT_PREFIX}${projectName}`
        return projectName
    }

    private async inquireProjectDescription(ctx: InquireProjectBuilder): Promise<InquireProjectBuilder> {
        const projectDescription = ctx.getProjectDescription()
        const isProjectDescriptionAlreadyAnswered = projectDescription
        const isProjectDescriptionRight = isProjectDescriptionAlreadyAnswered
            ? await confirm({ message: `description is '${projectDescription}'?` })
            : false
        if(isProjectDescriptionRight && !projectDescription) throw Error("project description muse deined when isDescriptionRight is true!")
        const newProjectDescription = (isProjectDescriptionRight && projectDescription) 
            ? projectDescription 
            : await input({
                message: 'description: ',
                default: 'my-example-project'
            })
        return ctx.changeProjectDescription(newProjectDescription)
    }

    private async inquireTags(ctx: InquireProjectBuilder): Promise<InquireProjectBuilder> {
        console.log('please write your PRIMARY tags!')
        const inputForPrimaryTags = await input({
            message: 'primary tags: ',
            default: 'tag1, tag2, tag3'
        })
        const primaryTagsToAdd = inputForPrimaryTags.split(',').map((tag) => tag.trim())
        const tagsToAdd = primaryTagsToAdd.reduce(async (previousPrimaryTag, currentPrimaryTag) => {
            const previousPrimaryTagValue = await previousPrimaryTag
            const inputForSecondaryTags = await input({
                message: `secondary tags for ${currentPrimaryTag}: `,
                default: 'tag1, tag2, tag3'
            })
            const secondaryTagsToAdd = inputForSecondaryTags.split(',').map((tag) => tag.trim())
            return [...previousPrimaryTagValue, { 
                primary: currentPrimaryTag,
                secondary: secondaryTagsToAdd
            } as ProjectTag]
        }, Promise.resolve([] as ProjectTag[]))
        .then((tags) => ctx.changeProjectTags(tags))
        return tagsToAdd
    }
}