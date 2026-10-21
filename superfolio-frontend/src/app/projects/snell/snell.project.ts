import { node_js, java_script, html, css, docker, mongo_db } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";

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
    ],
    description: {
        en: `Snell is a school project built in a team of two: a multiplayer web reimagination of Khet, the laser board game, where players move and rotate mirrored pieces, fire lasers and try to take down the opponent's king.

            The platform runs on a microservice architecture behind an API gateway, using Node.js with our own lightweight HTTP framework (built from scratch instead of relying on Express), Socket.IO for real-time play, MongoDB and Docker Compose.

            It features online matchmaking, an AI opponent, game replays, a tutorial, chat, achievements and a Stripe-powered shop, and also ships as an Android app through Capacitor.

            To keep the platform running smoothly, server performance is monitored in real time. On the security side, the gateway handles authentication and TLS, and the database is backed up nightly with AES-256 encryption.

            This is the project that won us first place at the Fullstack Contest, 2026 edition.`,
        fr: `Snell est un projet scolaire réalisé en binôme : une réinvention web multijoueur de Khet, le jeu de plateau au laser, dans lequel les joueurs déplacent et font pivoter des pièces à miroirs, tirent au laser et tentent d'éliminer le roi adverse.

            La plateforme repose sur une architecture en microservices derrière une API gateway, avec Node.js et notre propre framework HTTP léger (construit de zéro plutôt que d'utiliser Express), Socket.IO pour le jeu en temps réel, MongoDB et Docker Compose.

            Elle propose un matchmaking en ligne, une IA adverse, la revue de parties, un tutoriel, un chat, des succès et une boutique avec paiement Stripe, et existe aussi en application Android grâce à Capacitor.
            
            Pour que la plateforme tourne sans accroc, les performances du serveur sont surveillées en temps réel.

            Côté sécurité, la gateway gère l'authentification et le TLS, et la base de données est sauvegardée chaque nuit avec un chiffrement AES-256.
            
            C'est avec ce projet que nous avons remporté la première place du concours Fullstack, édition 2026.`,
    },

    banner: "/projects/snell/banner.png",
    technologies: [node_js, java_script, html, css, docker, mongo_db],
    path: "snell",
    award: {
        content: {
            en: `#1 place at the Fullstack Contest, 2026 edition 🥇`,
            fr: `1re place au concours Fullstack, édition 2026 🥇`,
        },
        place: 1,
    },
};