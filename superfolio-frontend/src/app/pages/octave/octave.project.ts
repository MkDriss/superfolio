import { node_js, angular, type_script, java_script, docker, nginx } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";

export const OCTAVE = {
    id: -1,
    name: "Octave",
    type: ProjectType.SCHOOL,
    category: ProjectCategory.DEV,
    date: "2025",
    project_ico: "/projects/octave/octave.png",
    overview_pictures: [
        "projects/octave/pictures/home-page.png",
        "projects/octave/pictures/game-selection.png",
        "projects/octave/pictures/solo-quiz-selection.png",

        "projects/octave/pictures/solo-game.png",
        "projects/octave/pictures/game-solo-answer-removed.png",
        "projects/octave/pictures/game-solo-rappel.png",
        "projects/octave/pictures/game-solo-good-answer.png",
        "projects/octave/pictures/game-solo-congrats.png",

        "projects/octave/pictures/leave-quiz-code-request.png",

        "projects/octave/pictures/admin-panel-code.png",
        "projects/octave/pictures/panel-page.png",

        "projects/octave/pictures/admin-quiz-list.png",
        "projects/octave/pictures/admin-quiz-create.png",
        "projects/octave/pictures/admin-quiz-edit.png",

        "projects/octave/pictures/multiplayer-lobby.png",
        "projects/octave/pictures/players-in-the-room.png",
        "projects/octave/pictures/join-multiplayer-page.png",

        "projects/octave/pictures/multiplayer-game.png",
        "projects/octave/pictures/multiplayer-failed.png",
        "projects/octave/pictures/multiplayer-game-right.png",

        "projects/octave/pictures/multiplayer-game-hints.png",

        "projects/octave/pictures/multiquiz-end.png",
        "projects/octave/pictures/replay-1.png",
        "projects/octave/pictures/multiplayer-game-leaderboard.png",

        "projects/octave/pictures/tutorial-1.png",
        "projects/octave/pictures/tutorial-2.png",
        "projects/octave/pictures/tutorial-3.png",
        "projects/octave/pictures/tutorial-4.png",
        "projects/octave/pictures/tutorial-5.png",

        "projects/octave/pictures/patient-stats.png",
        "projects/octave/pictures/patient-evolution-stats.png",
        "projects/octave/pictures/patient-quiz-history.png",
        "projects/octave/pictures/quiz-stats-page.png",

        "projects/octave/pictures/multiplayer-session-stats.png",
        "projects/octave/pictures/multiplayer-leader-board.png",

        "projects/octave/pictures/patient-list.png",
        "projects/octave/pictures/add-patient.png",
        "projects/octave/pictures/patient-edit.png",
        "projects/octave/pictures/patient-config.png",


    ],

    banner: "",
    technologies: [node_js, angular, type_script, java_script, docker, nginx],
    path: "octave",
    description: {
        en: `Built in a team of four with a user-experience-first approach, this is a game platform adapted for people living with Alzheimer's disease.

            At its heart is a music quiz: every question comes with a song, and every quiz is fully customizable, from the questions and answers to the music that accompanies them.

            Participants can play solo, or join real-time multiplayer games that bring a touch of friendly competition.

            Behind the scenes, a dedicated configuration area lets the day care staff build and adapt quizzes. They can also follow each participant's statistics across the different game modes, and use them to tailor the quizzes to the person playing.

            This is the project that won us first place at the Fullstack Contest, 2025 edition 🥇`,
        fr: `Réalisée à quatre avec une démarche centrée sur l'expérience utilisateur, cette plateforme de jeu est adaptée aux personnes atteintes de la maladie d'Alzheimer.

            Au cœur du projet, un quiz musical : chaque question est accompagnée d'une chanson, et chaque quiz est entièrement personnalisable, des questions et réponses jusqu'à la musique qui les accompagne.

            Les participants peuvent jouer en solo, ou rejoindre des parties multijoueur en temps réel qui apportent une touche de compétition bienveillante.

            En coulisses, un espace de configuration dédié permet au personnel de l'accueil de jour de créer et d'adapter les quiz. Il peut aussi suivre les statistiques de chaque participant selon les modes de jeu, et s'en servir pour adapter les quiz à la personne qui joue.

            C'est avec ce projet que nous avons remporté la première place du concours Fullstack, édition 2025 🥇`,
    },
    award: {
        content: {
            en: `#1 place at the Fullstack Contest, 2025 edition 🥇`,
            fr: `1re place au concours Fullstack, édition 2025 🥇`,
        },
        place: 1,
    },
};
