import { Project, ProjectCategory, ProjectType } from "../model/project.model";
import { ESP32_MARAUDER } from "../pages/esp32-marauder/esp32-marauder.project";
import { LETS_GO_BIKING } from "../pages/lets-go-biking/lets-go-biking.project";
import { NAS_HOME_SERVER } from "../pages/nas-home-server/nas-home-server.project";
import { OCTAVE } from "../pages/octave/octave.project";
import { SECURITY_LAB_IOT_IAM } from "../pages/security-lab-iot-iam/security-lab-iot.iam.project";
import { SKIMASTER } from "../pages/skimaster/skimaster.project";
import { SNELL } from "../pages/snell/snell.project";
import { SOPHIATECH_EAT } from "../pages/sophiatech-eat/sophiatech-eat.project";

const project_list: Project[] = [
    SNELL,
    OCTAVE,
    SOPHIATECH_EAT,
    LETS_GO_BIKING,
    SKIMASTER,
    NAS_HOME_SERVER,
    ESP32_MARAUDER,
    SECURITY_LAB_IOT_IAM,
]

export const PROJECTS = init_projects(project_list);

function init_projects(projects: Project[]) {
    for (let i = 0; i < projects.length; i++) {
        projects[i].id = i;
    }
    return projects;
}