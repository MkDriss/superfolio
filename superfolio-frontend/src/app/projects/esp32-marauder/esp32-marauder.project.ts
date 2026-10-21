import { arduino } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";



export const ESP32_MARAUDER = {
    id: -1,
    name: "ESP32 Marauder",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "",
    project_ico: "icons/package.png",
    overview_pictures: ["icons/package.png"],
    description: {
        en: "A personal project: a hardware pentesting tool built around an ESP32 Marauder, to explore offensive Wi-Fi and Bluetooth security hands-on.\n\n"
            + "The build pairs an ESP32 dev board (Wi-Fi and Bluetooth) with an LCD screen for on-device control and feedback, assembled on a breadboard with jumper wires.\n\n"
            + "It can run a range of Wi-Fi and Bluetooth attacks used in penetration testing, such as scanning and monitoring nearby networks and devices, deauthentication, and spoofing.\n\n"
            + "The goal was to understand these attacks from the attacker's side, on my own equipment, in order to better recognize and defend against them.",
        fr: ""
    },
    banner: "",
    technologies: [
        arduino
    ],
    path: "esp32-marauder"
}
