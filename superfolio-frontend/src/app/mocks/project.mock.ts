import { Project } from "../model/project.model";
import { ESP32_MARAUDER } from "../projects/esp32-marauder/esp32-marauder.project";
import { LETS_GO_BIKING } from "../projects/lets-go-biking/lets-go-biking.project";
import { NAS_HOME_SERVER } from "../projects/nas-home-server/nas-home-server.project";
import { OCTAVE } from "../projects/octave/octave.project";
import { SECURITY_LAB_IOT_IAM } from "../projects/security-lab-iot-iam/security-lab-iot.iam.project";
import { SKIMASTER } from "../projects/skimaster/skimaster.project";
import { SNELL } from "../projects/snell/snell.project";
import { SOPHIATECH_EAT } from "../projects/sophiatech-eat/sophiatech-eat.project";


const project_list: Project[] = [
    SECURITY_LAB_IOT_IAM,
    SNELL,
    NAS_HOME_SERVER,
    OCTAVE,
    ESP32_MARAUDER,
    SKIMASTER,
    SOPHIATECH_EAT,
    LETS_GO_BIKING,
]

export const PROJECTS = init_projects(project_list);

function init_projects(projects: Project[]) {
    for (let i = 0; i < projects.length; i++) {
        projects[i].id = i;
    }
    return projects;
}