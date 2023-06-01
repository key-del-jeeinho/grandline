import Project, { OFFICIAL_PROJECT_PREFIX, SimepleProject, UNOFFICIAL_PROJECT_PREFIX } from "../interface/Project";
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'
import ProjectInquirerContext, { ProjectInquirerContextBuilder, SimpleProjectInquirerContextBuilder, complete } from "./ProjectInquirerContext";
import { ProjectTag } from "../interface/ProjectTag";

export default async function inquireProject(ctx: ProjectInquirerContext): Promise<Project> {
    const project: Promise<Project> = Promise.resolve(SimpleProjectInquirerContextBuilder.of(ctx))
    .then(inquireProjectName)
    .then(inquireProjectDescription)
    .then(inquireTags)
    .then(complete)
    .then((ctx) => {
        const name = ctx.projectName
        const description = ctx.projectDescription
        const tags = ctx.projectTags
        const project = new SimepleProject(name, description, tags)
        return project
    })
    return project
}

async function inquireProjectName(ctx: ProjectInquirerContextBuilder): Promise<ProjectInquirerContextBuilder> {
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
    const newProjectNameWithPrefix = getNewProjectNameWithPrefix(isOfficialProjectName, newProjectName)
    return ctx.changeProjectName(newProjectNameWithPrefix)
}

function getNewProjectNameWithPrefix(isOfficialProjectName: boolean, projectName: string) {
    if(isOfficialProjectName && !projectName.startsWith(OFFICIAL_PROJECT_PREFIX))
        return `${OFFICIAL_PROJECT_PREFIX}${projectName}`
    if(!isOfficialProjectName && !projectName.startsWith(UNOFFICIAL_PROJECT_PREFIX))
        return `${UNOFFICIAL_PROJECT_PREFIX}${projectName}`
    return projectName
}

async function inquireProjectDescription(ctx: ProjectInquirerContextBuilder): Promise<ProjectInquirerContextBuilder> {
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

async function inquireTags(ctx: ProjectInquirerContextBuilder): Promise<ProjectInquirerContextBuilder> {
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