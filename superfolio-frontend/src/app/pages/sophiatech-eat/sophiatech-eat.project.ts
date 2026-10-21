import { java, angular, mvn, docker } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";

export const SOPHIATECH_EAT = {
    id: -1,
    name: "SophiaTech Eat",
    type: ProjectType.SCHOOL,
    category: ProjectCategory.DEV,
    date: "",
    project_ico: "/projects/sophiatech-eat/sophiatech-eat-logo-colored.png",
    overview_pictures: [
        "/projects/sophiatech-eat/sophiatech-eat-logo-colored.png"
    ],
    description: {
        en: "", fr: ""
    },
    banner: "",
    technologies: [java, angular, mvn, docker],
    path: "sophiatech-eat"
}