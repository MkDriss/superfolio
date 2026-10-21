import { Localized } from "./localized.model"
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
    description: Localized,
    award?: Award,
}

interface Award {
    content: Localized,
    place: number
}

export const enum ProjectCategory {
    DEV = "Software developpment",
    CYBER = "Cyber security"
}

export const enum ProjectType {
    SCHOOL = "School Project",
    HOME = "Personal Project"
}

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, Localized> = {
    [ProjectCategory.DEV]: { en: `Software development`, fr: `Développement logiciel` },
    [ProjectCategory.CYBER]: { en: `Cybersecurity`, fr: `Cybersécurité` },
};

export const PROJECT_TYPE_LABELS: Record<ProjectType, Localized> = {
    [ProjectType.SCHOOL]: { en: `School project`, fr: `Projet scolaire` },
    [ProjectType.HOME]: { en: `Personal project`, fr: `Projet personnel` },
};