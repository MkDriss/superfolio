import { html, java_script, css, activemq, csharp, dot_net_core } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";

export const LETS_GO_BIKING = {
    id: -1,
    name: "Let's go Biking",
    type: ProjectType.SCHOOL,
    category: ProjectCategory.DEV,
    date: "",
    project_ico: "icons/package.png",
    overview_pictures: ["icons/package.png"],
    description: { en: "", fr: "" },
    banner: "",
    technologies: [html, java_script, css, activemq, csharp, dot_net_core],
    path: "lets-go-biking"
}
