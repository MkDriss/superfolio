// Tous les textes de la page Octave : d'abord en anglais, puis en français.
//
// `const fr: typeof en` oblige la version française à avoir exactement les mêmes clés
// que l'anglaise : si tu oublies un texte ou fais une faute dans une clé, la compilation échoue.

const en = {
    ui: {
        back: `My projects`,
    },

    header: {
        category: `Category`,
        type: `Type`,
        awards: `Award`,
        technologies: `Technologies`,
        github: `View on Github`,
    },

    intro: {
        p: `Octave is a music quiz platform designed for seniors living with Alzheimer's disease, built in a team of four as a school project. Music can bring back memories and emotions in just a few notes, so we built fully customizable quizzes around songs, a configuration space where day care staff adapt the game to each participant, and a real-time multiplayer mode. Shaped from start to finish by the feedback of a real day care center, Octave won both the Jury Prize and the Audience Prize at the 2025 Fullstack Contest.`,
    },

    brief: {
        title: `The brief`,
        p1: `During our first year of engineering school at Polytech Nice Sophia, we had to build a web application with Angular, following a user-centered design approach. Teams of four had to choose between two very different audiences.`,
        p2: `The first option was a set of games for children with learning disorders such as dyslexia, dyscalculia or dyspraxia, guided by occupational therapists working with them. The second was a platform for seniors living with Alzheimer's, Parkinson's or other age-related conditions, attending a day care center in partnership with the school, and guided by its staff.`,
        p3: `Whatever the choice, the platform needed a configuration space for administrators: a place to collect statistics on each player, and to adjust the game to a specific person to help them along.`,
    },

    audience: {
        title: `Choosing our audience`,
        p1: `We chose the seniors. The subject echoed personal experiences for some of us, and the challenge was all the greater: the platform would be used by people who rarely, if ever, use a computer.`,
        p2: `One difference shaped the whole project. A child can make progress with their learning disorder; Alzheimer's, on the other hand, cannot be reversed, and the best one can hope for is to slow its progression. So our goal was never to make participants « win » or improve, but to stimulate them, and above all to give them a good time.`,
    },

    idea: {
        title: `Finding the right idea`,
        p1: `Our first instinct was classic memory games, like a memory card game or putting objects back in place in a room. We wanted something more original, and found it in music therapy: sometimes, a few notes are enough to bring back a memory or an emotion. That is how the idea of customizable music quizzes was born.`,
        p2: `We also knew how quiet day care centers can be, and how much participants can lack stimulation, despite all the staff's efforts. So we imagined a multiplayer mode, to bring a touch of friendly competition. As we would discover later, it turned into something else entirely.`,
    },

    understanding: {
        title: `Understanding before coding`,
        p1: `Before writing a single line of code, we took the time to understand the needs. We presented our ideas and questions to the day care staff during dedicated meetings, and formalized the expected behavior with use case and sequence diagrams.`,
        p2: `At the same time, we were introduced to component-based design with Matrio, a simplified Python framework built by a Polytech student, which takes Angular's component concepts and strips them down to the essentials. We used it to build our first mockups, then showed them to the staff.`,
        p3: `Their feedback made the application better from the start: this is how customizable hints, revealed one by one during the game, came to life.`,
    },

    frustration: {
        title: `Playing without frustration`,
        p1: `People living with Alzheimer's can easily lose track. The challenge was to find the right balance: enough stimulation to keep them in the game, without overloading them with information. And above all, a participant should never feel uncomfortable or frustrated while playing.`,
        helps_intro: `So every help can be adjusted to each participant by the staff:`,
        helps: [
            `Hints appear one by one, as the question goes on.`,
            `Wrong answers disappear when a participant takes too long, after a delay set in advance.`,
            `A message offers to move on to the next question after a while, rather than leaving someone stuck.`,
        ],
        p2: `The game reacts kindly, too. When a participant picks a wrong answer, it simply disappears, with no penalty, and when they find the right one, a warm message in encouraging colors invites them to keep going.`,
    },

    building: {
        title: `Building it step by step`,
        p1: `The project was also about learning web development and Angular, a framework widely used in the industry. We built Octave one feature at a time, starting with a simple, working version of the game.`,
        p2: `The single-player mode came first. Then an administration page to create and configure participant profiles, followed by a quiz editor, so that quizzes and participants were no longer hard-coded test data. Next came the statistics, collected during every game. Finally, the multiplayer mode, which wasn't required, but which we wanted badly enough to take on the extra work.`,
        p3: `Once the frontend was complete, our teacher provided a minimal JavaScript backend to plug in a database, and we containerized the whole project with Docker.`,
    },

    together: {
        title: `Playing together`,
        p: `This was our first time working with WebSockets. Before coding, we listed every action each player could take, at every moment of a game, to make sure no situation was left unhandled.`,
        led: {
            title: `A game led by the staff`,
            p: `A staff member hosts the game: they create a lobby with a unique code. At first, participants joined with that code; after discussing it with the staff, we added a simpler way: the host sees which participants are connected, and adds them with a single click. The participant's screen then lets them know they'll soon join a game. While they wait, a short tutorial explains how to play.`,
        },
        screens: {
            title: `One screen to lead, one screen to answer`,
            p: `The host's screen shows the question, the hints, and plays the music. We chose a single sound source on purpose: a dozen devices playing at once would have created a din and disturbed participants. Their screen shows only the answers, nothing more.`,
        },
        conversation: {
            title: `Answers that spark conversation`,
            p: `The host moves through the questions at their own pace, and sees the share of each answer update live. When everyone agrees, or when opinions are split, it becomes a natural starting point for a discussion.`,
        },
        feedback: {
            title: `Feedback for everyone`,
            p: `Once a participant answers, they wait for the others before the answer is revealed: a rewarding message if they found it, an encouraging one if not. At the end of the game, everyone is congratulated. The host can then go back over the game: questions, answer shares, hints, replay a song people enjoyed, or show the leaderboard.`,
        },
    },

    following: {
        title: `Following each participant`,
        intro: `This is where the configuration space takes on its full meaning: statistics help the staff adapt the game to each person.`,
        quiz: `For each quiz, the staff can see how many times it was played, the average time and number of hints per question, and how answers were distributed for each question.`,
        participant: `For each participant, they can see how many quizzes were played over a year, and how their results evolve month by month: share of correct answers, average time per question, hints used. These trends help spot a sudden decline. Every past game, solo or in a group, can be opened in detail to better understand a score.`,
    },

    meeting: {
        title: `Meeting the participants`,
        p1: `Near the end of the project, we had the chance to welcome participants from the day care center at Polytech, to try Octave for themselves. It was an opportunity to meet the people we had been designing for, listen to them, and see how they actually used the platform. It was also a deeply moving moment.`,
        p2: `And they surprised us. The multiplayer mode, designed to bring some competition, turned into something else: participants helped each other, discussed the answers, and talked together. In places like day care centers, creating these bonds matters enormously, and it became, for us, the project's most meaningful achievement.`,
    },

    contest: {
        title: `The Fullstack Contest`,
        intro: `It was our first time on that stage, and our project was selected among the best of the class.`,
        p: `Each year, the best projects of the class are selected to compete in the Fullstack Contest, and taking part earns each team member a title of excellence awarded by the school. The format is inspired by « Ma thèse en 180 secondes »: each team pitches its project on stage, in front of a lecture hall filled with first-year students and a jury of company representatives. The pitch is followed by a speed-dating session, where each team meets the jury members to go deeper into the project and answer their questions. The jury then establishes a ranking to award the Jury Prize, while the audience votes for the Audience Prize.`,
        result: `Octave won both! 🥇🥇🎉`,
        // la phrase est coupée autour du lien vers Snell
        again_before: `A year later, we did it again with `,
        again_after: `.`,
    },

    links: {
        title: `Links`,
        github: `Explore the code on Github`,
    },

    references: {
        title: `References`,
        in_french: `(in French)`, // les deux articles sont en français
    },

    related: {
        title: `Related projects`,
        empty: `No project matches your search.`,
    },

    // textes alternatifs des images des galeries
    alts: {
        home_page: `Octave home page`,
        solo_game: `Solo game`,

        use_case: `Use case diagram`,
        sequence_staff: `Sequence diagram, staff side`,
        sequence_participant: `Sequence diagram, participant side`,

        mockup_home: `Octave mockup`,
        mockup_solo: `Solo game mockup`,
        mockup_config: `Configuration mockup`,
        mockup_participant_stats_1: `Participant statistics mockup (1/3)`,
        mockup_participant_stats_2: `Participant statistics mockup (2/3)`,
        mockup_participant_stats_3: `Participant statistics mockup (3/3)`,
        mockup_quiz_score: `Quiz score mockup`,
        mockup_quiz_stats: `Quiz statistics mockup`,
        matrio: `The Matrio framework`,

        solo_hint: `Solo game with a hint displayed`,
        solo_right_answer: `Solo game: right answer`,
        solo_answer_removed: `Solo game: a wrong answer was removed`,
        solo_reminder: `Solo game: message offering to move on`,
        solo_congrats: `Solo game: congratulations at the end of the quiz`,

        admin_panel: `Administration panel`,
        participant_list: `Participant list`,
        participant_edit: `Editing a participant's information`,
        participant_config: `Editing a participant's game settings`,
        participant_add: `Form to add a participant`,
        quiz_list: `Quiz list`,
        quiz_edit: `Quiz editor`,

        mp_lobby: `Multiplayer game lobby`,
        mp_join: `Joining a multiplayer game with a code`,
        mp_players: `Participants in the lobby`,

        mp_host: `Multiplayer game, host view`,
        mp_host_hints: `Multiplayer game, host view with hints displayed`,
        mp_right: `Multiplayer game: right answer`,
        mp_wrong: `Multiplayer game: wrong answer`,

        mp_end: `End of a multiplayer game`,
        mp_replay: `Replay of a multiplayer game`,
        mp_leaderboard: `Multiplayer game leaderboard`,

        quiz_stats: `Quiz statistics`,
        session_stats: `Multiplayer session statistics`,
        session_leaderboard: `Multiplayer session leaderboard`,

        participant_global: `Participant overall statistics`,
        participant_evolution: `Participant month-by-month statistics`,
        participant_history: `Participant game history`,
    },
};

const fr: typeof en = {
    ui: {
        back: `Mes projets`,
    },

    header: {
        category: `Catégorie`,
        type: `Type`,
        awards: `Récompense`,
        technologies: `Technologies`,
        github: `Voir sur GitHub`,
    },

    intro: {
        p: `Octave est une plateforme de quiz musicaux conçue pour les personnes âgées atteintes de la maladie d'Alzheimer, réalisée à quatre dans le cadre d'un projet scolaire. Quelques notes suffisent parfois à raviver des souvenirs et des émotions : nous avons donc créé des quiz entièrement personnalisables autour de chansons, un espace de configuration où le personnel de l'accueil de jour adapte le jeu à chaque participant, et un mode multijoueur en temps réel. Façonné du début à la fin par les retours d'un véritable accueil de jour, Octave a remporté le Prix du jury et le Prix du public au concours Fullstack 2025.`,
    },

    brief: {
        title: `Le sujet`,
        p1: `Lors de notre première année du cycle ingénieur à Polytech Nice Sophia, nous devions réaliser une application web avec Angular, en suivant une démarche centrée sur l'utilisateur. Les équipes de quatre devaient choisir entre deux publics très différents.`,
        p2: `La première option était un ensemble de jeux pour des enfants atteints de troubles des apprentissages, comme la dyslexie, la dyscalculie ou la dyspraxie, avec l'accompagnement d'ergothérapeutes qui travaillent avec eux. La seconde était une plateforme pour des personnes âgées atteintes de la maladie d'Alzheimer, de Parkinson ou d'autres pathologies liées à l'âge, reçues dans un accueil de jour partenaire de l'école, avec l'accompagnement de son personnel.`,
        p3: `Quel que soit le choix, la plateforme devait comporter un espace de configuration pour des administrateurs : un endroit pour recueillir des statistiques sur chaque joueur, et adapter le jeu à une personne en particulier pour l'accompagner.`,
    },

    audience: {
        title: `Choisir notre public`,
        p1: `Nous avons choisi les personnes âgées. Le sujet faisait écho à des expériences personnelles pour certains d'entre nous, et le défi n'en était que plus grand : la plateforme serait utilisée par des personnes qui ne se servent que rarement, voire jamais, d'un ordinateur.`,
        p2: `Une différence a façonné tout le projet. Un enfant peut progresser face à ses troubles des apprentissages ; la maladie d'Alzheimer, elle, ne peut pas être inversée, et le mieux que l'on puisse espérer est d'en ralentir la progression. Notre objectif n'a donc jamais été de faire « gagner » ou progresser les participants, mais de les stimuler, et surtout de leur faire passer un bon moment.`,
    },

    idea: {
        title: `Trouver la bonne idée`,
        p1: `Notre premier réflexe a été de penser à des jeux de mémoire classiques, comme un memory ou un jeu où l'on replace des objets dans une pièce. Nous voulions quelque chose de plus original, et l'avons trouvé dans la musicothérapie : parfois, quelques notes suffisent à raviver un souvenir ou une émotion. C'est ainsi qu'est née l'idée de quiz musicaux personnalisables.`,
        p2: `Nous savions aussi à quel point les accueils de jour peuvent être calmes, et à quel point les participants peuvent manquer de stimulation, malgré tous les efforts du personnel. Nous avons donc imaginé un mode multijoueur, pour apporter une touche de compétition bienveillante. Comme nous allions le découvrir plus tard, il est devenu tout autre chose.`,
    },

    understanding: {
        title: `Comprendre avant de coder`,
        p1: `Avant d'écrire la moindre ligne de code, nous avons pris le temps de comprendre les besoins. Nous avons présenté nos idées et nos questions au personnel de l'accueil de jour lors de points dédiés, et formalisé le comportement attendu avec des diagrammes de cas d'utilisation et de séquence.`,
        p2: `En parallèle, nous avons été initiés à la conception par composants avec Matrio, un framework Python simplifié développé par un étudiant de Polytech, qui reprend les concepts de composants d'Angular en les réduisant à l'essentiel. Nous l'avons utilisé pour réaliser nos premières maquettes, que nous avons ensuite présentées au personnel.`,
        p3: `Leurs retours ont amélioré l'application dès le départ : c'est ainsi que sont nés les indices personnalisables, révélés un à un au fil de la partie.`,
    },

    frustration: {
        title: `Jouer sans frustration`,
        p1: `Les personnes atteintes de la maladie d'Alzheimer peuvent facilement perdre le fil. Tout l'enjeu était de trouver le bon équilibre : assez de stimulation pour les garder dans le jeu, sans les surcharger d'informations. Et surtout, un participant ne devait jamais se sentir mal à l'aise ou frustré en jouant.`,
        helps_intro: `Chaque aide peut donc être réglée pour chaque participant par le personnel :`,
        helps: [
            `Les indices apparaissent un à un, au fil de la question.`,
            `Les mauvaises réponses disparaissent quand un participant met trop de temps, après un délai défini à l'avance.`,
            `Un message propose de passer à la question suivante au bout d'un moment, plutôt que de laisser quelqu'un bloqué.`,
        ],
        p2: `Le jeu réagit aussi avec bienveillance. Quand un participant choisit une mauvaise réponse, elle disparaît simplement, sans pénalité, et quand il trouve la bonne, un message chaleureux aux couleurs encourageantes l'invite à continuer.`,
    },

    building: {
        title: `Construire étape par étape`,
        p1: `Le projet devait aussi nous apprendre le développement web et Angular, un framework très utilisé dans l'industrie. Nous avons construit Octave une fonctionnalité à la fois, en commençant par une version simple et fonctionnelle du jeu.`,
        p2: `Le mode solo est arrivé en premier. Puis une page d'administration pour créer et configurer les profils des participants, suivie d'un éditeur de quiz, pour que les quiz et les participants ne soient plus des données de test écrites en dur. Sont ensuite venues les statistiques, recueillies à chaque partie. Enfin, le mode multijoueur, qui n'était pas demandé, mais que nous tenions assez à réaliser pour accepter le travail supplémentaire.`,
        p3: `Une fois le frontend terminé, notre professeur nous a fourni un backend JavaScript minimal pour brancher une base de données, et nous avons conteneurisé l'ensemble du projet avec Docker.`,
    },

    together: {
        title: `Jouer ensemble`,
        p: `C'était notre première expérience avec les WebSockets. Avant de coder, nous avons listé chaque action que chaque joueur pouvait effectuer, à chaque moment d'une partie, pour qu'aucune situation ne reste sans réponse.`,
        led: {
            title: `Une partie animée par le personnel`,
            p: `Un membre du personnel anime la partie : il crée un salon avec un code unique. Au départ, les participants rejoignaient la partie avec ce code ; après en avoir discuté avec le personnel, nous avons ajouté une solution plus simple : l'animateur voit quels participants sont connectés, et les ajoute en un clic. L'écran du participant l'informe alors qu'il va bientôt rejoindre une partie. En attendant, un court tutoriel explique comment jouer.`,
        },
        screens: {
            title: `Un écran pour animer, un écran pour répondre`,
            p: `L'écran de l'animateur affiche la question et les indices, et joue la musique. Nous avons choisi une source sonore unique à dessein : une dizaine d'appareils jouant en même temps auraient créé un brouhaha et perturbé les participants. Leur écran n'affiche que les réponses, rien de plus.`,
        },
        conversation: {
            title: `Des réponses qui lancent la discussion`,
            p: `L'animateur avance dans les questions à son rythme, et voit la répartition des réponses se mettre à jour en direct. Quand tout le monde est d'accord, ou quand les avis divergent, cela devient un point de départ naturel pour une discussion.`,
        },
        feedback: {
            title: `Un retour pour chacun`,
            p: `Une fois qu'un participant a répondu, il attend les autres avant que la réponse soit dévoilée : un message gratifiant s'il l'a trouvée, un message d'encouragement sinon. À la fin de la partie, tout le monde est félicité. L'animateur peut ensuite revenir sur la partie : questions, répartition des réponses, indices, réécouter une chanson qui a plu, ou afficher le classement.`,
        },
    },

    following: {
        title: `Suivre chaque participant`,
        intro: `C'est là que l'espace de configuration prend tout son sens : les statistiques aident le personnel à adapter le jeu à chaque personne.`,
        quiz: `Pour chaque quiz, le personnel peut voir combien de fois il a été joué, le temps moyen et le nombre moyen d'indices par question, ainsi que la répartition des réponses à chaque question.`,
        participant: `Pour chaque participant, il peut voir combien de quiz ont été joués sur une année, et comment ses résultats évoluent mois par mois : part de bonnes réponses, temps moyen par question, indices utilisés. Ces tendances aident à repérer un déclin soudain. Chaque partie passée, en solo ou en groupe, peut être ouverte en détail pour mieux comprendre un score.`,
    },

    meeting: {
        title: `Rencontrer les participants`,
        p1: `Vers la fin du projet, nous avons eu la chance d'accueillir à Polytech des participants de l'accueil de jour, venus essayer Octave par eux-mêmes. C'était l'occasion de rencontrer les personnes pour qui nous avions conçu la plateforme, de les écouter, et de voir comment ils l'utilisaient réellement. Ce fut aussi un moment profondément émouvant.`,
        p2: `Et ils nous ont surpris. Le mode multijoueur, pensé pour apporter un peu de compétition, est devenu tout autre chose : les participants s'entraidaient, discutaient des réponses et échangeaient entre eux. Dans des lieux comme les accueils de jour, créer ces liens compte énormément, et c'est devenu, pour nous, la plus belle réussite du projet.`,
    },

    contest: {
        title: `Le concours Fullstack`,
        intro: `C'était notre première fois sur cette scène, et notre projet avait été sélectionné parmi les meilleurs de la promotion.`,
        p: `Chaque année, les meilleurs projets de la promotion sont sélectionnés pour participer au concours Fullstack, et chaque membre des équipes participantes reçoit un titre d'excellence décerné par l'école. Le format s'inspire de « Ma thèse en 180 secondes » : chaque équipe présente son projet sur scène, devant un amphithéâtre rempli d'étudiants de première année et un jury de représentants d'entreprises. Le pitch est suivi d'un speed dating, où chaque équipe rencontre les membres du jury pour approfondir le projet et répondre à leurs questions. Le jury établit ensuite un classement pour décerner le Prix du jury, tandis que le public vote pour le Prix du public.`,
        result: `Octave a remporté les deux ! 🥇🥇🎉`,
        again_before: `Un an plus tard, nous avons remis ça avec `,
        again_after: `.`,
    },

    links: {
        title: `Liens`,
        github: `Explorer le code sur GitHub`,
    },

    references: {
        title: `Références`,
        in_french: ``, // inutile en français : la mention ne s'affiche pas
    },

    related: {
        title: `Projets liés`,
        empty: `Aucun projet ne correspond à votre recherche.`,
    },

    alts: {
        home_page: `Page d'accueil d'Octave`,
        solo_game: `Partie en solo`,

        use_case: `Diagramme de cas d'utilisation`,
        sequence_staff: `Diagramme de séquence, côté personnel`,
        sequence_participant: `Diagramme de séquence, côté participant`,

        mockup_home: `Maquette d'Octave`,
        mockup_solo: `Maquette d'une partie en solo`,
        mockup_config: `Maquette de la configuration`,
        mockup_participant_stats_1: `Maquette des statistiques d'un participant (1/3)`,
        mockup_participant_stats_2: `Maquette des statistiques d'un participant (2/3)`,
        mockup_participant_stats_3: `Maquette des statistiques d'un participant (3/3)`,
        mockup_quiz_score: `Maquette du score d'un quiz`,
        mockup_quiz_stats: `Maquette des statistiques d'un quiz`,
        matrio: `Le framework Matrio`,

        solo_hint: `Partie en solo avec un indice affiché`,
        solo_right_answer: `Partie en solo : bonne réponse`,
        solo_answer_removed: `Partie en solo : une mauvaise réponse a disparu`,
        solo_reminder: `Partie en solo : message proposant de passer à la suite`,
        solo_congrats: `Partie en solo : félicitations à la fin du quiz`,

        admin_panel: `Panneau d'administration`,
        participant_list: `Liste des participants`,
        participant_edit: `Modification des informations d'un participant`,
        participant_config: `Modification des réglages de jeu d'un participant`,
        participant_add: `Formulaire d'ajout d'un participant`,
        quiz_list: `Liste des quiz`,
        quiz_edit: `Éditeur de quiz`,

        mp_lobby: `Salon d'une partie multijoueur`,
        mp_join: `Rejoindre une partie multijoueur avec un code`,
        mp_players: `Participants dans le salon`,

        mp_host: `Partie multijoueur, vue de l'animateur`,
        mp_host_hints: `Partie multijoueur, vue de l'animateur avec les indices affichés`,
        mp_right: `Partie multijoueur : bonne réponse`,
        mp_wrong: `Partie multijoueur : mauvaise réponse`,

        mp_end: `Fin d'une partie multijoueur`,
        mp_replay: `Revue d'une partie multijoueur`,
        mp_leaderboard: `Classement d'une partie multijoueur`,

        quiz_stats: `Statistiques d'un quiz`,
        session_stats: `Statistiques d'une session multijoueur`,
        session_leaderboard: `Classement d'une session multijoueur`,

        participant_global: `Statistiques générales d'un participant`,
        participant_evolution: `Statistiques mois par mois d'un participant`,
        participant_history: `Historique des parties d'un participant`,
    },
};

export const OCTAVE_TEXTS = { en, fr };