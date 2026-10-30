import { rust } from "../../mocks/technology.mock";
import { ProjectCategory, ProjectType } from "../../model/project.model";

export const RMAP = {
    id: -1,
    name: "Rmap",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "2026",
    project_ico: "/projects/rmap/rmap-logo-colored.png",
    overview_pictures: [
        "/projects/rmap/rmap-logo-colored.png",
        "/projects/rmap/pictures/open-port-tcp.png",
        "/projects/rmap/pictures/closed-port-tcp.png",
        "/projects/rmap/pictures/filtered-port-tcp.png",
        "/projects/rmap/pictures/scan-steps.png",
    ],
    description: {
        en: `Built from scratch in Rust, rmap is a TCP port scanner that exists to understand what a tool like nmap really does, rather than just using it.
 
            It finds the live machines on a network, then tests thousands of ports in parallel to tell which ones are open, closed, or filtered by a firewall.
 
            Every step was built and validated one at a time, with tests that revealed cases where the tool was silently wrong. A security scanner must not lie: today, it always reports when a result is incomplete.
 
            It is the first offensive tool of an IAM-focused cybersecurity lab that I am building entirely on my own 🔐`,

        fr: `Écrit de zéro en Rust, rmap est un scanner de ports TCP né d'une envie : comprendre ce que fait vraiment un outil comme nmap, plutôt que de simplement l'utiliser.
 
            Il repère les machines vivantes d'un réseau, puis teste des milliers de ports en parallèle pour savoir lesquels sont ouverts, fermés ou filtrés par un pare-feu.
 
            Chaque étape a été construite et validée une à une, avec des tests qui ont révélé des cas où l'outil se trompait sans prévenir. Un scanner de sécurité ne doit pas mentir : aujourd'hui, il signale toujours quand un résultat est incomplet.
 
            C'est le premier outil offensif d'un labo de cybersécurité orienté IAM que je construis entièrement moi-même 🔐`,
    },

    banner: "/projects/rmap/banner.png",
    technologies: [rust],
    path: "rmap",
};