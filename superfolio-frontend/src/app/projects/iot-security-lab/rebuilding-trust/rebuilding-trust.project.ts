import { rust, python, cpp, mqtt } from "../../../mocks/technology.mock";
import { ProjectType, ProjectCategory, Project } from "../../../model/project.model";

export const REBUILDING_TRUST: Project = {
    id: -1,
    name: "IoT Security Lab - Rebuilding Trust",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "2026",
    project_ico: "/projects/iot-security-lab/rebuilding-trust/rebuilding-trust-colored-logo.svg",
    overview_pictures: [
        "/projects/iot-security-lab/rebuilding-trust/rebuilding-trust-colored-logo.svg",
    ],
    description: {
        en: ``,

        fr: ``,
    },

    banner: "/projects/iot-security-lab/banner.png",
    technologies: [rust, python, cpp, mqtt],
    git_url: "https://github.com/MkDriss/sec-lab-iot",
    path: "iot-security-lab/rebuilding-trust",
};