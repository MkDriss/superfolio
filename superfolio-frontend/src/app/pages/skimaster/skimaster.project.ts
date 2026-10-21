import { java, spring_boot, mvn, angular } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";

export const SKIMASTER = {
    id: -1,
    name: "Skimaster",
    type: ProjectType.SCHOOL,
    date: "",
    technologies: [java, spring_boot, mvn, angular],
    path: "skimaster",
    category: ProjectCategory.DEV,
    project_ico: "/projects/skimaster/skimaster.png",
    banner: "",
    overview_pictures: [
        "/projects/skimaster/skimaster.png",
    ],
    description: { en: "", fr: "" }
}
