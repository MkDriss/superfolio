export interface Project {
    id: number,
    name: string,
    type: ProjectType,
    date: Date,
    category: ProjectCategory
    project_ico: string,
    overview_pictures: string[],
    description: string,
}

export const enum ProjectCategory {
    DEV = "Software development",
    CYBER = "Cyber sécurity"
}

export const enum ProjectType {
    SCHOOL = "School Project",
    HOME = "Home Project"
}