import { Technology } from "./technology.model"

export interface Project {
    id: number,
    name: string,
    type: ProjectType,
    date: string,
    technologies: Technology[]
    path: string,
    category: ProjectCategory
    project_ico: string,
    banner: string,
    overview_pictures: string[],
    description: string,
    award?: Award ,
}

interface Award {
    content:string,
    place:number
}

export const enum ProjectCategory {
    DEV = "Software developpment",
    CYBER = "Cyber security"
}

export const enum ProjectType {
    SCHOOL = "School Project",
    HOME = "Personal Project"
}