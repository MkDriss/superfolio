import { Project, ProjectCategory, ProjectType } from "../model/project.model";

export const PROJECTS_MOCK: Project[] = [
    {
        id: 0,
        name: "Snell",
        type: ProjectType.SCHOOL,
        category: ProjectCategory.DEV,
        date: new Date(),
        project_ico: "/projects/snell/pictures/snell.png",
        overview_pictures: [],
        description: ""
    },
    {
        id: 1,
        name: "Octave",
        type: ProjectType.SCHOOL,
        category: ProjectCategory.DEV,
        date: new Date(),
        project_ico: "/projects/octave/pictures/octave.png",
        overview_pictures: [],
        description: ""
    },
    {
        id: 2,
        name: "SophiaTech Eat",
        type: ProjectType.SCHOOL,
        category: ProjectCategory.DEV,
        date: new Date(),
        project_ico: "",
        overview_pictures: [],
        description: ""
    },
    {
        id: 3,
        name: "Let's go Biking",
        type: ProjectType.SCHOOL,
        category: ProjectCategory.DEV,
        date: new Date(),
        project_ico: "",
        overview_pictures: [],
        description: ""
    },
    {
        id: 4,
        name: "NAS Home Server",
        type: ProjectType.HOME,
        category: ProjectCategory.CYBER,
        date: new Date(),
        project_ico: "",
        overview_pictures: [],
        description: ""
    },
    {
        id: 5,
        name: "ESP32 Marauder",
        type: ProjectType.HOME,
        category: ProjectCategory.CYBER,
        date: new Date(),
        project_ico: "",
        overview_pictures: [],
        description: ""
    },
]