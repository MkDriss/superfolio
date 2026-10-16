import { Project, ProjectCategory, ProjectType } from "../model/project.model";
import { activemq, angular, csharp, css, docker, html, java, java_script, mongo_db, mvn, nginx, spring_boot, type_script } from "./technology.mock";

const project_list: Project[] = [
    {
        id: -1,
        name: "Snell",
        type: ProjectType.SCHOOL,
        category: ProjectCategory.DEV,
        date: "",
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
            + "It features online matchmaking, AI opponents with different levels, game replays, a tutorial, chat, friends, achievements and a Stripe-powered shop, and also ships as an Android app through Capacitor.\n\n"
            + "On the security side, the gateway handles authentication and TLS, and the database is backed up nightly with AES-256 encryption.\n\n"
            + "This is the project that won us first place at the Fullstack Contest, 2026 edition 🥇",

        main_picture: "/projects/snell/pictures/snell_home_page.png",
        technologies: [java_script, html, css, docker, mongo_db],
        path: "snell",
        mention: {
            content: "#1 place at the Fullstack Contest, 2026 edition 🥇",
            place: 1
        }
    },
    {
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
        description: "",
        main_picture: "",
        technologies: [angular, type_script, docker, nginx],
        path: "octave",
        mention: { content: "#1 place at the Fullstack Contest, 2025 edition 🥇", place: 1 }

    },
    {
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
        main_picture: "",
        technologies: [java, angular, mvn, docker],
        path: "sophiatech-eat"
    },
    {
        id: -1,
        name: "Let's go Biking",
        type: ProjectType.SCHOOL,
        category: ProjectCategory.DEV,
        date: "",
        project_ico: "package.png",
        overview_pictures: ["package.png"],
        description: "",
        main_picture: "",
        technologies: [html, java_script, css, activemq, csharp],
        path: "lets-go-biking"
    },
    {
        id: -1,
        name: "Skimaster",
        type: ProjectType.SCHOOL,
        date: "",
        technologies: [java, spring_boot, angular],
        path: "",
        category: ProjectCategory.DEV,
        project_ico: "/projects/skimaster/skimaster.png",
        main_picture: "",
        overview_pictures: [],
        description: "skimaster"
    },
    {
        id: -1,
        name: "NAS Home Server",
        type: ProjectType.HOME,
        category: ProjectCategory.CYBER,
        date: "",
        project_ico: "/projects/nas-home-server/nas-home-server.png",
        overview_pictures: ["/projects/nas-home-server/nas-home-server.png"],
        description: "",
        main_picture: "",
        technologies: [],
        path: "nas-home-server"
    },
    {
        id: -1,
        name: "ESP32 Marauder",
        type: ProjectType.HOME,
        category: ProjectCategory.CYBER,
        date: "",
        project_ico: "package.png",
        overview_pictures: ["package.png"],
        description: "",
        main_picture: "",
        technologies: [],
        path: "esp32-marauder"
    },
]

export const PROJECTS = init_projects(project_list);

function init_projects(projects: Project[]) {
    for (let i = 0; i < projects.length; i++) {
        projects[i].id = i;
    }
    return projects;
}