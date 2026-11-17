import { rust, python, cpp, mqtt } from "../../../mocks/technology.mock";
import { ProjectType, ProjectCategory, Project } from "../../../model/project.model";

export const BREAKING_TRUST: Project = {
    id: -1,
    name: "IoT Security Lab - Breaking Trust",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "2026",
    project_ico: "/projects/iot-security-lab/breaking-trust/breaking-trust-logo-colored.svg",
    overview_pictures: [
        "/projects/iot-security-lab/breaking-trust/breaking-trust-logo-colored.svg",
        "/projects/iot-security-lab/breaking-trust/pictures/full-lab.jpg",
        "/projects/iot-security-lab/breaking-trust/schemas/schema-kill-chain.fr.png",
        "/projects/iot-security-lab/breaking-trust/pictures/ghidra-clientId-found.png",
        "/projects/iot-security-lab/breaking-trust/pictures/rmap-scan.png",
    ],
    description: {
        en: `Breaking Trust is the offensive half of an isolated IoT security lab I built from the ground up. A single campaign runs through it end to end: cracking the Wi-Fi to get in, mapping the devices with a hand-written scanner, sniffing clear-text MQTT, recovering a hard-coded identity from a firmware dump, then stepping into the middle to hijack a physical actuator.

            Three devices — a camera, a sensor and an actuator — were chosen to cover the whole security triad, and every flaw builds the case for identity-based security.

            Part 1 breaks trust; Part 2 (Rebuilding Trust) puts it back with an IAM layer 🔓`,

        fr: `Breaking Trust est le volet offensif d'un labo de sécurité IoT isolé, construit de A à Z. Une seule campagne le traverse de bout en bout : casser le Wi-Fi pour entrer, cartographier les objets avec un scanner codé main, écouter le MQTT en clair, retrouver une identité codée en dur dans un dump de firmware, puis se placer au milieu pour détourner un actionneur physique.

            Trois objets — une caméra, un capteur et un actionneur — ont été choisis pour couvrir toute la triade de la sécurité, et chaque faille construit l'argument d'une sécurité fondée sur l'identité.

            Le Volet 1 brise la confiance et le Volet 2 (Rebuilding Trust) la reconstruit avec une couche IAM 🔓`,
    },

    banner: "/projects/iot-security-lab/banner.png",
    technologies: [rust, python, cpp, mqtt],
    git_url: "https://github.com/MkDriss/sec-lab-iot",
    path: "iot-security-lab/breaking-trust",
};