import { Project, ProjectCategory, ProjectType } from "../model/project.model";
import { activemq, angular, arduino, cloudflare, cpp, csharp, css, docker, dot_net_core, html, java, java_script, linux, mongo_db, mvn, nginx, node_js, python, raspberry_pi, rust, spring_boot, type_script } from "./technology.mock";

export const SNELL = {
    id: -1,
    name: "Snell",
    type: ProjectType.SCHOOL,
    category: ProjectCategory.DEV,
    date: "2026",
    project_ico: "/projects/snell/snell-logo-colored.png",
    overview_pictures: [
        "/projects/snell/pictures/home-page.png",
        "/projects/snell/pictures/register-page.png",
        "/projects/snell/pictures/login-page.png",
        "/projects/snell/pictures/local-1vs1-page.png",
        "/projects/snell/pictures/ais-page.png",
        "/projects/snell/pictures/ai-game.png",
        "/projects/snell/pictures/ai-game-2.png",
        "/projects/snell/pictures/multiplayer-wait.png",
        "/projects/snell/pictures/multiplayer-game.png",
        "/projects/snell/pictures/tutorial.png",
        "/projects/snell/pictures/tutorial-hint.png",
        "/projects/snell/pictures/puzzles.png",
        "/projects/snell/pictures/puzzle-game.png",
        "/projects/snell/pictures/puzzle-game-hint.png",
        "/projects/snell/pictures/profile-page.png",
        "/projects/snell/pictures/history-page.png",
        "/projects/snell/pictures/inventory-page.png",
        "/projects/snell/pictures/review-game.png",
        "/projects/snell/pictures/snell_home_page.png",
    ],
    description: "Snell is a school project built in a team of two: a multiplayer web reimagination of Khet, the laser board game, where players move and rotate mirrored pieces, fire lasers and try to take down the opponent’s king.\n\n"
        + "The platform runs on a microservice architecture behind an API gateway, using Node.js with our own lightweight HTTP framework (built from scratch instead of relying on Express), Socket.IO for real-time play, MongoDB and Docker Compose.\n\n"
        + "It features online matchmaking, an AI opponent, game replays, a tutorial, chat, achievements and a Stripe-powered shop, and also ships as an Android app through Capacitor.\n\n"
        + "To keep the platform running smoothly, server performance is monitored in real time.\n\n"
        + "On the security side, the gateway handles authentication and TLS, and the database is backed up nightly with AES-256 encryption.\n\n"
        + "This is the project that won us first place at the Fullstack Contest, 2026 edition.",

    banner: "/projects/snell/banner.png",
    technologies: [node_js, java_script, html, css, docker, mongo_db],
    path: "snell",
    award: {
        content: "#1 place at the Fullstack Contest, 2026 edition 🥇",
        place: 1
    }
};

export const OCTAVE = {
    id: -1,
    name: "Octave",
    type: ProjectType.SCHOOL,
    category: ProjectCategory.DEV,
    date: "",
    project_ico: "/projects/octave/octave.png",
    overview_pictures: [
        "/projects/octave/pictures/home-page.png",
        "/projects/octave/pictures/admin-code-request.png",
        "/projects/octave/pictures/panel-page.png",
        "/projects/octave/pictures/accueillis-page.png",
        "/projects/octave/pictures/accueillis-edit-page.png",
        "/projects/octave/pictures/quiz-list-page.png",
        "/projects/octave/pictures/quiz-creation-interface.png",
    ],
    description: "Built in a team of four with a user-experience-first approach, this is a game platform adapted for people living with Alzheimer's disease.\n\n"
        + "At its heart is a music quiz: every question comes with a song, and every quiz is fully customizable, from the questions and answers to the music that accompanies them.\n\n"
        + "Patients can play solo, or join real-time multiplayer games that bring a touch of friendly competition.\n\n"
        + "Behind the scenes, a dedicated configuration area lets the staff of the day care center build and adapt quizzes. They can also follow each patient's statistics across the different game modes, and use them to tailor the quizzes to the person playing.\n\n"
        + "This is the project that won us first place at the Fullstack Contest, 2025 edition 🥇",
    banner: "",
    technologies: [node_js, angular, type_script, java_script, docker, nginx],
    path: "octave",
    award: { content: "#1 place at the Fullstack Contest, 2025 edition 🥇", place: 1 }
}

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
    description: "",
    banner: "",
    technologies: [java, angular, mvn, docker],
    path: "sophiatech-eat"
}

export const LETS_GO__BIKING = {
    id: -1,
    name: "Let's go Biking",
    type: ProjectType.SCHOOL,
    category: ProjectCategory.DEV,
    date: "",
    project_ico: "icons/package.png",
    overview_pictures: ["icons/package.png"],
    description: "",
    banner: "",
    technologies: [html, java_script, css, activemq, csharp, dot_net_core],
    path: "lets-go-biking"
}

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
    description: ""
}

export const NAS_HOME_SERVER = {
    id: -1,
    name: "NAS Home Server",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "",
    project_ico: "/projects/nas-home-server/nas-home-server.png",
    overview_pictures: ["/projects/nas-home-server/nas-home-server.png"],
    description: "A personal project: a self-hosted NAS built from scratch around a Raspberry Pi.\n\n"
        + "The hardware pairs two 6 TB NAS-grade drives in replication, for 6 TB of usable storage, with an NVMe M.2 SSD dedicated to running the services, so they stay fast and don't compete with the data drives.\n\n"
        + "It runs on Raspberry Pi OS Lite, with Open Media Vault handling disk management. On top of the replication, dedicated backup protocols mean a failing drive doesn't mean lost data.\n\n"
        + "Everything is deployed as containerized services with Docker, including a personal cloud, a Jellyfin media server and several others.\n\n"
        + "On the security side, all traffic goes through a Cloudflare Tunnel, so no port is ever exposed on my home router.",
    banner: "",
    technologies: [
        cloudflare,
        raspberry_pi,
        linux,
        docker,
    ],
    path: "nas-home-server"
}

export const ESP32_MARAUDER = {
    id: -1,
    name: "ESP32 Marauder",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "",
    project_ico: "icons/package.png",
    overview_pictures: ["icons/package.png"],
    description: "A personal project: a hardware pentesting tool built around an ESP32 Marauder, to explore offensive Wi-Fi and Bluetooth security hands-on.\n\n"
        + "The build pairs an ESP32 dev board (Wi-Fi and Bluetooth) with an LCD screen for on-device control and feedback, assembled on a breadboard with jumper wires.\n\n"
        + "It can run a range of Wi-Fi and Bluetooth attacks used in penetration testing, such as scanning and monitoring nearby networks and devices, deauthentication, and spoofing.\n\n"
        + "The goal was to understand these attacks from the attacker's side, on my own equipment, in order to better recognize and defend against them.",
    banner: "",
    technologies: [
        arduino
    ],
    path: "esp32-marauder"
}

export const SECURITY_LAB_IOT_IAM = {
    id: -1,
    name: "Security Lab IoT & IAM",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "",
    project_ico: "icons/package.png",
    overview_pictures: ["icons/package.png"],
    description: "A self-built, isolated security lab exploring IoT and machine identity end to end, where every tool is coded from scratch rather than assembled from existing ones, to truly understand the logic behind them.\n\n"
        + "The lab mixes real hardware: ESP32 devices acting as deliberately vulnerable objects (an unauthenticated MQTT sensor, a fake IP camera, a hardcoded-password actuator), an OpenWrt router for network segmentation, and a central Linux server running the broker, the monitoring and the identity services.\n\n"
        + "On the offensive side, I build my own tooling in Rust: a port scanner and a raw-socket sniffer, a fuzzer, and a MITM on MQTT, plus firmware extraction and reverse engineering with Ghidra, all aimed only at my own isolated network.\n\n"
        + "The flagship is a zero-trust identity system: a home-made Certificate Authority issuing one certificate per object, mutual TLS, a mini identity provider with short-lived tokens and per-object permissions, and automatic revocation triggered by a home-made IDS, with the CA root key kept offline.\n\n",
    banner: "",
    technologies: [
        python,
        rust,
        cpp,
        arduino,
        docker,
        linux
    ],
    path: "sec-lab-iot-iam"
}

const project_list: Project[] = [
    SNELL,
    OCTAVE,
    SOPHIATECH_EAT,
    LETS_GO__BIKING,
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