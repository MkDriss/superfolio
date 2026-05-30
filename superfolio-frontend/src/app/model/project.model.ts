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
    DEV = "Développement Logiciel",
    CYBER = "Cyber Sécurité"
}

export const enum ProjectType {
    SCHOOL = "Projet d'École",
    HOME = "Project Perso"
}