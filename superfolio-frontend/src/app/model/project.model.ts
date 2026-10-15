import { Technology } from "./technology.model"

export interface Project {
    id: number,
    name: string,
    type: ProjectType,
    date: string,
    technologies: Technology[]
    url: string,
    category: ProjectCategory
    project_ico: string,
    main_picture: string,
    overview_pictures: string[],
    description: string,
}

export const enum ProjectCategory {
    DEV = "Software developpment",
    CYBER = "Cyber security"
}

export const enum ProjectType {
    SCHOOL = "School Project",
    HOME = "Personal Project"
}