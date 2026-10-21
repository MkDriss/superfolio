// Tous les textes de la page Snell : d'abord en anglais, puis en français.
//
// `const fr: typeof en` oblige la version française à avoir exactement les mêmes clés
// que l'anglaise : si tu oublies un texte ou fais une faute dans une clé, la compilation échoue.
//
const en = {
    ui: {
        back: `My projects`,
        switch_lang: `FR`,
        switch_lang_label: `Passer en français`,
    },

    header: {
        category: `Category`,
        type: `Type`,
        awards: `Award`,
        technologies: `Technologies`,
        github: `View on Github`,
    },

    intro: {
        p1: `Snell is a multiplayer web version of Khet, the laser chess game, built in a team of two as a school project. The catch: no frameworks, only vanilla JavaScript. So we built our own lightweight HTTP framework, and designed a microservice architecture able to absorb a new feature every week.`,
        p2: `Beyond the brief, we added an AI opponent with several difficulty levels, an interactive tutorial, puzzles, a shop, an Android app, real-time monitoring and encrypted backups, and I self-hosted the whole platform on a Raspberry Pi. It won both the Jury Prize and the Audience Prize at the 2026 Fullstack Contest.`,
    },

    context: {
        title: `The context`,
        p1: `Snell started as a school assignment with a simple premise: build an online version of Khet, a board game where players use mirrors to guide a laser toward the opposing king. Our teacher reworked the original rules into his own version, and set a pace that would shape the entire project: every week, a new feature to deliver, until the final version.`,
        p2: `We didn't start from a blank page, but close to it. The starter project gave us a simple HTTP server able to serve files, and the Socket.IO code for real-time communication. Everything else had to be built by hand: frameworks were forbidden, and only a short list of libraries was allowed, for tasks where rebuilding them would teach little, such as WebSockets or password hashing. The goal was clear: understand how the features of a full-stack application work natively, before ever relying on abstractions.`,
        p3: `Looking back, these two constraints ended up driving almost every decision we made. The rest of this page tells how.`,
    },

    game: {
        title: `The Game`,
        intro: `The rules are a reworked version of Khet, played on a 10×10 grid. Each player controls five kinds of pieces, which we renamed for our version:`,
        shooter: `The Shooter, an indestructible piece that fires the laser at the end of every turn.`,
        protector: `The Protector, shielded on one side only.`,
        triangles: `The Triangles, whose single mirror redirects the beam.`,
        full_mirror: `The Full Mirror, which reflects on both sides and can never be destroyed.`,
        king: `The King, vulnerable from every angle. Lose your King, and you lose the game.`,
        rules: `On each turn, a player performs exactly one action: rotate a piece, move it, place a Triangle from their reserve, or swap their Full Mirror with their Shooter or their King, each swap having its own cooldown. Then the laser fires, bounces off the mirrors, and destroys every unprotected piece in its path. A destroyed Triangle isn't gone for good: it joins the opponent's reserve, ready to be used against its former owner. And every game starts differently, since the initial positions are randomized and mirrored around the center of the board.`,
        theme: `For the look and feel, we picked a theme with a wink: Snell is a playful parody of chess.com, from its colors to its crossed-out logo, all the way to our very own coach, Bae.`,
    },

    by_hand: {
        title: `Building everything by hand`,
        p: `Without a framework, every HTTP request had to be handled from scratch: parsing the URL, reading the body, routing it to the right function, sending back a response. After writing the same logic a few times, we did what any framework does under the hood: we extracted it into our own lightweight, Express-like framework, with routing and middlewares. Writing it ourselves meant understanding exactly what happens between a request arriving and a response leaving, which is precisely what libraries are designed to hide.`,
    },

    architecture: {
        title: `An architecture built to grow`,
        p1: `With a new feature every week, we needed an architecture where adding something wouldn't mean breaking everything else. Splitting the platform into microservices felt like the natural answer: each domain lives in its own service (game, users, chat, shop, achievements, mail...), runs in its own Docker container, and can evolve independently. A single gateway sits in front of them: it is the only entry point reachable from the outside, and it checks authentication before forwarding each request to the right service.`,
        p2: `This choice paid off week after week. When a new feature came in, it often meant adding a new service and plugging it into the gateway, without touching the rest.`,
    },

    learning: {
        title: `Learning to play`,
        p1: `The brief asked for a tutorial, or a text explaining the rules. A wall of text felt like the fastest way to lose new players, so we built something interactive instead: Coach Bae walks you through the rules step by step, while the board highlights the cells you need to interact with.`,
        p2: `Once the basics are in place, puzzles take over: tricky positions to solve, with hints when you're stuck, to practice the kind of situations that decide real games.`,
    },

    playing: {
        title: `Playing`,
        local: `Local and against the AI. Two players can face each other on the same screen, or take on one of our AI opponents, each with its own level and personality (more on them below). Against the AI, players also choose their color: white, black or random, white always moving first, as in chess.`,
        online: `Online, in real time. Multiplayer games are synchronized in real time through Socket.IO, and every move is validated by the server: as our teacher put it, never trust your users. Rather than pairing players at random, our matchmaking compares their Elo ratings to find an opponent of similar level. If no match turns up after a while, it gradually widens the acceptable rating gap, so nobody waits forever. Ratings are updated after every online game, and the gap between the two players matters: the bigger it is, the more the underdog stands to win, and the favorite to lose.`,
    },

    ai: {
        title: `Inside the AI`,
        intro: `Our first AI played at random: enough to check that the engine knew every legal move, not enough to make a real opponent. Each improvement that followed answers a specific problem.`,
        thinking: {
            title: `I. Thinking ahead`,
            p: `To play well, the AI has to imagine its move, then the opponent's best reply, then its own answer, and so on. That is exactly what minimax does (here in its negamax form). But the possibilities multiply at every step, so the AI drops any line as soon as it is proven worse than one it has already found (alpha-beta pruning).`,
        },
        moves: {
            title: `II. Too many moves`,
            p: `In a typical starting position, a player has 343 possible actions, and 324 of them are Triangle placements that mostly change nothing. Since the laser is fully predictable, a move can only matter if it touches the beam's path or the shooter itself. So the AI looks at those moves first, along with the ones that already worked elsewhere in its search (killer moves, history heuristic), and gives the harmless-looking ones only a quick glance, unless they turn out better than expected (principal variation search, late move reductions, futility pruning).`,
        },
        time: {
            title: `III. Limited time`,
            p: `The AI never knows in advance how deep it will manage to search. So it starts one move ahead, then goes deeper and deeper until its time runs out, always keeping the best move found so far (iterative deepening). Along the way, it remembers the positions it has already analyzed, since the same one can be reached in different orders, recognizing each by a compact fingerprint (transposition table, Zobrist hashing).`,
        },
        stopping: {
            title: `IV. Stopping at the wrong moment`,
            p: `A position can look excellent right after your own shot, and terrible right after your opponent's. So before judging a position, the AI plays out any exchange of shots still pending (quiescence search).`,
        },
        judging: {
            title: `V. Judging a position`,
            p: `In laser chess, only the beam kills: chess intuitions like controlling the center don't apply. So the AI looks at what each laser would destroy if it fired now, and at how exposed each King is to a redirected beam.`,
        },
        speed: {
            title: `VI. Speed`,
            p: `All of this means weighing hundreds of thousands of positions every turn. To keep up, each piece fits in a single byte, the whole board in 100 bytes, and the search creates no new objects along the way.`,
        },
        ladder: {
            title: `VII. A ladder of opponents`,
            p: `All the AIs share the same engine; only their profile changes: thinking time, temperament, and how often they make mistakes. Making a weak AI short-sighted would make it oddly sharp at times, so instead it occasionally picks a lesser move, though never one that loses its King on the spot, just like a beginner. The ladder goes from Patrick La Chine (500 Elo), who plays randomly, to Bot Bizot (2500 Elo), who is a formidable opponent.`,
        },
        outro: `These techniques come from chess engines: the references at the end of this page explain them in more depth.`,
    },

    review: {
        title: `Reviewing a game`,
        p: `Beyond the brief, any past game, online or against the AI, can be replayed move by move. An evaluation function analyzes the board at each step to estimate which player has the advantage, so you can spot the exact move where a game turned.`,
    },

    together: {
        title: `Playing together`,
        p: `Players create an account, add friends (a request on one side, an approval on the other) and challenge them to a duel. The brief asked for one kind of chat out of three: a global chat, a private chat between friends, or an in-game chat. We built all three.`,
    },

    progression: {
        title: `Reasons to come back`,
        p: `The brief asked for achievements and a leaderboard, with an Elo ranking for every profile. We built a whole progression system around them. Completing an achievement now rewards players with SnellCoins, our in-game currency, which they can spend in a shop inspired by Fortnite's: profile pictures, emote packs for the chat, and themes that change the look of the pieces. Everything they buy lands in their inventory. SnellCoins can also be bought through a Stripe payment link, running in sandbox mode for the exercise.`,
    },

    security: {
        title: `Accounts and security`,
        p: `Some areas, such as online games and the AI, require being signed in: sessions rely on JWT tokens, checked by the gateway, and passwords are hashed before being stored. Forgotten passwords can be reset by email. And for the fun of it, we hid an alternative way in: the honesty test. First, declare whether you're honest. Then, drag and drop a set of statements into the « Liar » and « Honest » boxes. Get the combination right after claiming to be honest, and you've proven you can be trusted... with resetting anyone's password. Needless to say, this one is a joke, not a security feature.`,
    },

    android: {
        title: `On Android`,
        p: `The project also had to ship as a mobile app. We wrapped the platform with Capacitor, redesigned the interface for touch screens, and integrated a native feature of the device: local notifications, triggered when you receive a friend request or a challenge request.`,
    },

    running: {
        title: `Running it for real`,
        monitoring: `Shipping features was one thing; keeping the platform healthy was another. We added a monitoring page fed by the Docker socket and dedicated API endpoints: it shows the number of games in progress, the state of each container, and so of each service, and the CPU and memory usage of the host machine.`,
        backups: `The database is backed up automatically every night at 2 AM, when the fewest players are online. Three scripts handle the whole cycle: one creates the backup and encrypts it with AES-256, one checks its integrity by simulating a full restoration, and one restores the database when needed. Backups are kept on a rolling 14-day window, so they never saturate the storage. The next step would have been to store them on a separate server, so that losing the machine wouldn't mean losing the backups too.`,
    },

    deployment: {
        title: `From the cloud to my desk`,
        p: `The course planned to deploy every project on an AWS instance. I chose to host Snell myself, on my own Raspberry Pi: the services run with Docker Compose behind an nginx reverse proxy, and all traffic comes in through a Cloudflare Tunnel, so no port is ever opened on my home network.`,
    },

    contest: {
        title: `The Fullstack Contest`,
        p: `Each year, the best projects of the class are selected to compete in the Fullstack Contest, and taking part earns each team member a title of excellence awarded by the school. The format is inspired by « Ma thèse en 180 secondes »: each team pitches its project on stage, in front of a lecture hall filled with first-year students and a jury of company representatives. The pitch is followed by a speed-dating session, where each team meets the jury members to go deeper into the project and answer their questions. The jury then establishes a ranking to award the Jury Prize, while the audience votes for the Audience Prize.`,
        result: `This year, Snell won both! 🥇🥇🎉`,
    },

    links: {
        title: `Links`,
        github: `Explore the code on Github`,
    },

    references: {
        title: `References`,
        p: `To go further on the AI techniques mentioned above, the Chess Programming Wiki has a clear page for each of them: Minimax and Negamax, Alpha-Beta, Iterative Deepening, Principal Variation Search, Late Move Reductions, Futility Pruning, Quiescence Search, Transposition Table, Zobrist Hashing, Killer Heuristic and History Heuristic.`,
    },

    related: {
        title: `Related projects`,
        empty: `No project matches your search.`,
    },

    // textes alternatifs des images des galeries
    alts: {
        home: `Snell home page`,
        local_game: `Local game between two players`,
        architecture: `Microservice architecture of Snell`,
        tutorial: `Interactive tutorial with Coach Bae`,
        tutorial_hint: `Tutorial step with highlighted cells`,
        puzzles: `Puzzle selection`,
        puzzle_game: `Puzzle in progress`,
        puzzle_hint: `Puzzle with a hint displayed`,
        ais: `AI opponent selection`,
        ai_game: `Game against the AI`,
        ai_game_2: `Another game against the AI`,
        multiplayer_wait: `Matchmaking waiting screen`,
        multiplayer_game: `Online multiplayer game`,
        engine: `Encoding of a piece on a single byte`,
        review: `Game review with the advantage indicator`,
        profile: `Player profile`,
        inventory: `Player inventory`,
        honesty_1: `Honesty test: declaring whether you are honest`,
        honesty_2: `Honesty test: sorting the statements`,
        mobile_home: `Mobile app: home page`,
        mobile_login: `Mobile app: login`,
        mobile_shop: `Mobile app: shop`,
        mobile_ais: `Mobile app: AI selection`,
        mobile_ai_game: `Mobile app: game against the AI`,
        mobile_friends: `Mobile app: friends`,
        mobile_puzzles: `Mobile app: puzzle selection`,
        mobile_puzzle_game: `Mobile app: puzzle in progress`,
        mobile_tutorial: `Mobile app: tutorial`,
        mobile_profile: `Mobile app: profile`,
        monitoring: `Monitoring dashboard`,
        deployment: `Self-hosted deployment through a Cloudflare Tunnel`,
    },
};

const fr: typeof en = {
    ui: {
        back: `Mes projets`,
        switch_lang: `EN`,
        switch_lang_label: `Switch to English`,
    },

    header: {
        category: `Catégorie`,
        type: `Type`,
        awards: `Récompense`,
        technologies: `Technologies`,
        github: `Voir sur GitHub`,
    },

    intro: {
        p1: `Snell est une version web multijoueur de Khet, le jeu d'échecs au laser, réalisée en binôme dans le cadre d'un projet scolaire. La particularité : aucun framework, uniquement du JavaScript natif. Nous avons donc construit notre propre framework HTTP léger, et conçu une architecture en microservices capable d'accueillir une nouvelle fonctionnalité chaque semaine.`,
        p2: `Au-delà du sujet, nous avons ajouté une IA avec plusieurs niveaux de difficulté, un tutoriel interactif, des puzzles, une boutique, une application Android, un monitoring en temps réel et des sauvegardes chiffrées, et j'ai hébergé toute la plateforme moi-même sur un Raspberry Pi. Le projet a remporté le Prix du jury et le Prix du public au concours Fullstack 2026.`,
    },

    context: {
        title: `Le contexte`,
        p1: `Snell est né d'un projet scolaire au point de départ simple : créer une version en ligne de Khet, un jeu de plateau dans lequel les joueurs utilisent des miroirs pour guider un laser jusqu'au roi adverse. Notre professeur a revu les règles d'origine pour en faire sa propre version, et imposé un rythme qui allait façonner tout le projet : chaque semaine, une nouvelle fonctionnalité à livrer, jusqu'à la version finale.`,
        p2: `Nous ne sommes pas partis d'une page blanche, mais presque. Le projet de départ nous fournissait un simple serveur HTTP capable de servir des fichiers, ainsi que le code de Socket.IO pour la communication en temps réel. Tout le reste devait être construit à la main : les frameworks étaient interdits, et seule une courte liste de bibliothèques était autorisée, pour les tâches où les réécrire n'aurait pas appris grand-chose, comme les WebSockets ou le hachage des mots de passe. L'objectif était clair : comprendre comment fonctionnent nativement les fonctionnalités d'une application full-stack, avant de s'appuyer sur des abstractions.`,
        p3: `Avec le recul, ces deux contraintes ont guidé presque toutes nos décisions. La suite de cette page raconte comment.`,
    },

    game: {
        title: `Le jeu`,
        intro: `Les règles reprennent une version remaniée de Khet, sur une grille de 10×10. Chaque joueur contrôle cinq types de pièces, que nous avons renommées pour notre version :`,
        shooter: `Le Shooter, une pièce indestructible qui tire le laser à la fin de chaque tour.`,
        protector: `Le Protector, protégé par un bouclier sur un seul côté.`,
        triangles: `Les Triangles, dont l'unique miroir redirige le faisceau.`,
        full_mirror: `Le Full Mirror, qui réfléchit des deux côtés et ne peut jamais être détruit.`,
        king: `Le King, vulnérable sous tous les angles. Perdez votre King, et vous perdez la partie.`,
        rules: `À chaque tour, un joueur effectue exactement une action : faire pivoter une pièce, la déplacer, poser un Triangle depuis sa réserve, ou échanger son Full Mirror avec son Shooter ou son King, chaque échange ayant son propre temps de recharge. Le laser tire ensuite, rebondit sur les miroirs et détruit toute pièce non protégée sur son passage. Un Triangle détruit ne disparaît pas pour de bon : il rejoint la réserve de l'adversaire, prêt à être utilisé contre son ancien propriétaire. Et aucune partie ne commence de la même façon, puisque les positions de départ sont tirées au hasard, puis reproduites en miroir autour du centre du plateau.`,
        theme: `Pour l'apparence, nous avons choisi un thème en clin d'œil : Snell est une parodie de chess.com, de ses couleurs à son logo barré, jusqu'à notre propre coach, Bae.`,
    },

    by_hand: {
        title: `Tout construire à la main`,
        p: `Sans framework, chaque requête HTTP devait être gérée de zéro : analyser l'URL, lire le corps de la requête, l'acheminer vers la bonne fonction, renvoyer une réponse. Après avoir écrit plusieurs fois la même logique, nous avons fait ce que fait tout framework en coulisses : nous l'avons extraite dans notre propre framework léger, inspiré d'Express, avec un routage et des middlewares. L'écrire nous-mêmes nous a obligés à comprendre exactement ce qui se passe entre l'arrivée d'une requête et le départ de la réponse, c'est-à-dire précisément ce que les bibliothèques sont conçues pour cacher.`,
    },

    architecture: {
        title: `Une architecture pensée pour grandir`,
        p1: `Avec une nouvelle fonctionnalité chaque semaine, il nous fallait une architecture où ajouter quelque chose ne voudrait pas dire tout casser. Découper la plateforme en microservices nous a semblé la réponse naturelle : chaque domaine vit dans son propre service (jeu, utilisateurs, chat, boutique, succès, mail...), tourne dans son propre conteneur Docker et peut évoluer indépendamment. Une gateway unique se place devant eux : c'est le seul point d'entrée accessible depuis l'extérieur, et elle vérifie l'authentification avant de transmettre chaque requête au bon service.`,
        p2: `Ce choix a payé semaine après semaine. Une nouvelle fonctionnalité revenait souvent à ajouter un nouveau service et à le brancher sur la gateway, sans toucher au reste.`,
    },

    learning: {
        title: `Apprendre à jouer`,
        p1: `Le sujet demandait un tutoriel, ou un texte expliquant les règles. Un pavé de texte nous semblait le moyen le plus sûr de perdre les nouveaux joueurs, alors nous avons fait quelque chose d'interactif : Coach Bae explique les règles étape par étape, pendant que le plateau met en surbrillance les cases avec lesquelles interagir.`,
        p2: `Une fois les bases acquises, les puzzles prennent le relais : des positions délicates à résoudre, avec des indices en cas de blocage, pour s'entraîner aux situations qui décident des vraies parties.`,
    },

    playing: {
        title: `Jouer`,
        local: `En local et contre l'IA. Deux joueurs peuvent s'affronter sur le même écran, ou défier l'une de nos IA, chacune avec son niveau et sa personnalité (on en reparle plus bas). Contre l'IA, les joueurs choisissent aussi leur couleur : blanc, noir ou aléatoire, les blancs commençant toujours, comme aux échecs.`,
        online: `En ligne, en temps réel. Les parties multijoueur sont synchronisées en temps réel grâce à Socket.IO, et chaque coup est validé par le serveur : comme le disait notre professeur, ne jamais faire confiance à ses utilisateurs. Plutôt que d'associer les joueurs au hasard, notre matchmaking compare leur classement Elo pour trouver un adversaire de niveau proche. Si personne n'est trouvé au bout d'un moment, il élargit progressivement l'écart de classement accepté, pour que personne n'attende indéfiniment. Les classements sont mis à jour après chaque partie en ligne, et l'écart entre les deux joueurs compte : plus il est grand, plus l'outsider a à gagner, et le favori à perdre.`,
    },

    ai: {
        title: `Dans la tête de l'IA`,
        intro: `Notre première IA jouait au hasard : de quoi vérifier que le moteur connaissait tous les coups possibles, mais pas de quoi faire un véritable adversaire. Chaque amélioration qui a suivi répond à un problème précis.`,
        thinking: {
            title: `I. Anticiper`,
            p: `Pour bien jouer, l'IA doit imaginer son coup, puis la meilleure réponse de l'adversaire, puis sa propre réponse, et ainsi de suite. C'est exactement ce que fait l'algorithme minimax (ici sous sa forme negamax). Mais les possibilités se multiplient à chaque étape, alors l'IA abandonne une piste dès qu'elle est prouvée moins bonne qu'une autre déjà trouvée (élagage alpha-bêta).`,
        },
        moves: {
            title: `II. Trop de coups`,
            p: `Dans une position de départ typique, un joueur dispose de 343 actions possibles, dont 324 sont des poses de Triangle qui, pour la plupart, ne changent rien. Comme le laser est parfaitement prévisible, un coup ne peut compter que s'il touche le trajet du faisceau ou le Shooter lui-même. L'IA examine donc ces coups en priorité, avec ceux qui ont déjà fait leurs preuves ailleurs dans sa recherche (killer moves, heuristique de l'historique), et n'accorde qu'un rapide coup d'œil aux coups d'apparence anodine, à moins qu'ils ne se révèlent meilleurs que prévu (principal variation search, late move reductions, futility pruning).`,
        },
        time: {
            title: `III. Un temps limité`,
            p: `L'IA ne sait jamais à l'avance jusqu'où elle pourra chercher. Elle commence donc par regarder un coup à l'avance, puis va de plus en plus loin jusqu'à ce que son temps soit écoulé, en gardant toujours le meilleur coup trouvé jusque-là (approfondissement itératif). En chemin, elle mémorise les positions déjà analysées, puisqu'une même position peut être atteinte dans des ordres différents, et reconnaît chacune grâce à une empreinte compacte (table de transposition, hachage de Zobrist).`,
        },
        stopping: {
            title: `IV. S'arrêter au mauvais moment`,
            p: `Une position peut sembler excellente juste après votre propre tir, et catastrophique juste après celui de l'adversaire. Avant de juger une position, l'IA joue donc jusqu'au bout les échanges de tirs encore en suspens (recherche de quiescence).`,
        },
        judging: {
            title: `V. Évaluer une position`,
            p: `Au laser chess, seul le faisceau tue : les intuitions des échecs, comme contrôler le centre, ne s'appliquent pas. L'IA regarde donc ce que chaque laser détruirait s'il tirait maintenant, et à quel point chaque King est exposé à un faisceau redirigé.`,
        },
        speed: {
            title: `VI. La vitesse`,
            p: `Tout cela revient à peser des centaines de milliers de positions à chaque tour. Pour tenir le rythme, chaque pièce tient sur un seul octet, le plateau entier sur 100 octets, et la recherche ne crée aucun nouvel objet en cours de route.`,
        },
        ladder: {
            title: `VII. Une échelle d'adversaires`,
            p: `Toutes les IA partagent le même moteur ; seul leur profil change : temps de réflexion, tempérament et fréquence des erreurs. Rendre une IA faible en la rendant myope la rendrait étrangement redoutable par moments : elle choisit donc parfois un coup moins bon, mais jamais un coup qui lui fait perdre son King sur-le-champ, comme un débutant. L'échelle va de Patrick La Chine (500 Elo), qui joue au hasard, à Bot Bizot (2500 Elo), un adversaire de taille.`,
        },
        outro: `Ces techniques viennent des moteurs d'échecs : les références en fin de page les expliquent plus en détail.`,
    },

    review: {
        title: `Revoir une partie`,
        p: `Au-delà du sujet, toute partie passée, en ligne ou contre l'IA, peut être rejouée coup par coup. Une fonction d'évaluation analyse le plateau à chaque étape pour estimer quel joueur a l'avantage, ce qui permet de repérer le coup précis où la partie a basculé.`,
    },

    together: {
        title: `Jouer ensemble`,
        p: `Les joueurs créent un compte, ajoutent des amis (une demande d'un côté, une acceptation de l'autre) et peuvent les défier en duel. Le sujet demandait un type de chat parmi trois : un chat global, un chat privé entre amis ou un chat en partie. Nous avons fait les trois.`,
    },

    progression: {
        title: `Des raisons de revenir`,
        p: `Le sujet demandait des succès et un classement, avec un Elo pour chaque profil. Nous avons construit tout un système de progression autour. Chaque succès débloqué rapporte désormais des SnellCoins, notre monnaie virtuelle, à dépenser dans une boutique inspirée de celle de Fortnite : photos de profil, packs d'emotes pour le chat et thèmes qui changent l'apparence des pièces. Chaque achat rejoint l'inventaire du joueur. Les SnellCoins peuvent aussi s'acheter via un lien de paiement Stripe, en mode sandbox pour l'exercice.`,
    },

    security: {
        title: `Comptes et sécurité`,
        p: `Certaines parties de la plateforme, comme les parties en ligne et l'IA, nécessitent d'être connecté : les sessions reposent sur des tokens JWT, vérifiés par la gateway, et les mots de passe sont hachés avant d'être stockés. Un mot de passe oublié peut être réinitialisé par e-mail. Et pour s'amuser, nous avons caché une autre méthode : le test d'honnêteté. D'abord, indiquez si vous êtes honnête. Ensuite, glissez-déposez une série d'affirmations dans les cases « Liar » et « Honest ». Trouvez la bonne combinaison après vous être déclaré honnête, et vous avez prouvé qu'on peut vous faire confiance... pour réinitialiser le mot de passe de n'importe qui. Inutile de préciser qu'il s'agit d'une blague, et non d'une fonctionnalité de sécurité.`,
    },

    android: {
        title: `Sur Android`,
        p: `Le projet devait aussi être disponible en application mobile. Nous avons intégré la plateforme dans Capacitor, repensé l'interface pour les écrans tactiles et ajouté une fonctionnalité native de l'appareil : les notifications locales, déclenchées à la réception d'une demande d'ami ou d'un défi.`,
    },

    running: {
        title: `En conditions réelles`,
        monitoring: `Livrer des fonctionnalités était une chose ; garder la plateforme en bonne santé en était une autre. Nous avons ajouté une page de monitoring alimentée par le socket Docker et des endpoints dédiés de l'API : elle affiche le nombre de parties en cours, l'état de chaque conteneur, et donc de chaque service, ainsi que l'utilisation du processeur et de la mémoire de la machine hôte.`,
        backups: `La base de données est sauvegardée automatiquement chaque nuit à 2 h, au moment où le moins de joueurs sont connectés. Trois scripts gèrent tout le cycle : le premier crée la sauvegarde et la chiffre en AES-256, le deuxième vérifie son intégrité en simulant une restauration complète, et le troisième restaure la base en cas de besoin. Les sauvegardes sont conservées sur une fenêtre glissante de 14 jours, pour ne jamais saturer le stockage. L'étape suivante aurait été de les stocker sur un autre serveur, pour que la perte de la machine n'entraîne pas celle des sauvegardes.`,
    },

    deployment: {
        title: `Du cloud à mon bureau`,
        p: `Le cours prévoyait de déployer chaque projet sur une instance AWS. J'ai choisi d'héberger Snell moi-même, sur mon propre Raspberry Pi : les services tournent avec Docker Compose derrière un reverse proxy nginx, et tout le trafic passe par un tunnel Cloudflare, si bien qu'aucun port n'est jamais ouvert sur mon réseau domestique.`,
    },

    contest: {
        title: `Le concours Fullstack`,
        p: `Chaque année, les meilleurs projets de la promotion sont sélectionnés pour participer au concours Fullstack, et chaque membre des équipes participantes reçoit un titre d'excellence décerné par l'école. Le format s'inspire de « Ma thèse en 180 secondes » : chaque équipe présente son projet sur scène, devant un amphithéâtre rempli d'étudiants de première année et un jury de représentants d'entreprises. Le pitch est suivi d'un speed dating, où chaque équipe rencontre les membres du jury pour approfondir le projet et répondre à leurs questions. Le jury établit ensuite un classement pour décerner le Prix du jury, tandis que le public vote pour le Prix du public.`,
        result: `Cette année-là, Snell a remporté les deux ! 🥇🥇🎉`,
    },

    links: {
        title: `Liens`,
        github: `Explorer le code sur GitHub`,
    },

    references: {
        title: `Références`,
        p: `Pour aller plus loin sur les techniques d'IA évoquées plus haut, le Chess Programming Wiki consacre une page claire à chacune d'elles : Minimax et Negamax, Alpha-Beta, Iterative Deepening, Principal Variation Search, Late Move Reductions, Futility Pruning, Quiescence Search, Transposition Table, Zobrist Hashing, Killer Heuristic et History Heuristic.`,
    },

    related: {
        title: `Projets liés`,
        empty: `Aucun projet ne correspond à votre recherche.`,
    },

    alts: {
        home: `Page d'accueil de Snell`,
        local_game: `Partie locale entre deux joueurs`,
        architecture: `Architecture en microservices de Snell`,
        tutorial: `Tutoriel interactif avec Coach Bae`,
        tutorial_hint: `Étape du tutoriel avec des cases en surbrillance`,
        puzzles: `Sélection des puzzles`,
        puzzle_game: `Puzzle en cours`,
        puzzle_hint: `Puzzle avec un indice affiché`,
        ais: `Sélection de l'IA adverse`,
        ai_game: `Partie contre l'IA`,
        ai_game_2: `Une autre partie contre l'IA`,
        multiplayer_wait: `Écran d'attente du matchmaking`,
        multiplayer_game: `Partie multijoueur en ligne`,
        engine: `Encodage d'une pièce sur un seul octet`,
        review: `Revue de partie avec l'indicateur d'avantage`,
        profile: `Profil d'un joueur`,
        inventory: `Inventaire d'un joueur`,
        honesty_1: `Test d'honnêteté : se déclarer honnête ou non`,
        honesty_2: `Test d'honnêteté : classer les affirmations`,
        mobile_home: `Application mobile : accueil`,
        mobile_login: `Application mobile : connexion`,
        mobile_shop: `Application mobile : boutique`,
        mobile_ais: `Application mobile : sélection de l'IA`,
        mobile_ai_game: `Application mobile : partie contre l'IA`,
        mobile_friends: `Application mobile : amis`,
        mobile_puzzles: `Application mobile : sélection des puzzles`,
        mobile_puzzle_game: `Application mobile : puzzle en cours`,
        mobile_tutorial: `Application mobile : tutoriel`,
        mobile_profile: `Application mobile : profil`,
        monitoring: `Tableau de bord de monitoring`,
        deployment: `Déploiement auto-hébergé via un tunnel Cloudflare`,
    },
};

export const SNELL_TEXTS = { en, fr };