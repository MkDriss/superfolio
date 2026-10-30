// Tous les textes de la page rmap : d'abord en anglais, puis en français.
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
        technologies: `Technologies`,
        github: `View on Github`,
    },

    intro: {
        p: `rmap, for « Rust » and « nmap », is a TCP port scanner, and the first offensive tool of a cybersecurity lab I am building entirely on my own. Rather than using nmap, I chose to rewrite its logic in Rust, to understand what really happens on the network. It finds the live machines on a network, tests thousands of ports in parallel and labels each one as open, closed or filtered. Above all, it was built step by step, with tests that uncovered cases where it was silently wrong.`,
    },

    why: {
        title: `Why rewrite nmap?`,
        p1: `nmap is the go-to tool for mapping a network. But using it does not teach you how it works. Writing a scanner forces you to understand what a TCP connection is, how to interpret a silence, and why testing thousands of ports takes more than a simple loop.`,
        p2: `rmap is part of a larger lab focused on IAM (Identity and Access Management): an isolated IoT network behind an OpenWrt router, deliberately vulnerable ESP32 devices, and a Raspberry Pi that will act as the central server. All offensive use stays within this isolated lab, which I own.`,
    },

    basics: {
        title: `Knocking on the door`,
        p1: `A machine exposes its services on numbered ports: 22 for SSH, 80 for the web, 1883 for MQTT… To find out whether a port is open, the scanner tries to connect to it and watches how the machine reacts. There are three possible reactions, and each one tells a different story. In the diagrams, orange arrows leave the scanner, and dark red arrows come back from the machine.`,
        // image : open-port-tcp.png
        open: {
            title: `Open: a service is listening`,
            p: `The scanner asks to connect (SYN). The machine accepts (SYN-ACK), and the scanner confirms (ACK): the connection is established, then closed right away. This exchange is known as the TCP handshake.`,
        },
        // image : closed-port-tcp.png
        closed: {
            title: `Closed: nobody is listening`,
            p: `The machine immediately answers with a refusal (RST). It is there, but no service is waiting on this port.`,
        },
        // image : filtered-port-tcp.png
        filtered: {
            title: `Filtered: the request gets lost`,
            p: `No answer comes back: most of the time, a firewall dropped the request along the way. The scanner waits up to a set delay, then labels the port as filtered.`,
        },
        p2: `This method, the « TCP connect » scan, opens a real connection. It needs no administrator privileges, which makes it simple and safe to use; the trade-off is that the scanned machine may see it in its logs.`,
    },

    pipeline: {
        title: `From the terminal to the report`,
        p1: `A single command starts a scan, for example « rmap -t 192.168.50.0/24 -p 22,80-82 ». Behind it, the scan goes through five steps:`,
        // image : scan-steps.png (une boîte par étape)
        steps: [
            `Read the targets: 192.168.50.0/24 becomes the list of the network's 256 addresses.`,
            `Read the ports: 22,80-82 becomes 22, 80, 81 and 82.`,
            `Find the live machines, when asked to, so no time is wasted on empty addresses.`,
            `Test every connection in parallel, each machine and port pair becoming one attempt.`,
            `Gather the results machine by machine, with a warning if anything could not be tested.`,
        ],
        p2: `The first two steps follow nmap's syntax, and they are strict: an invalid input, such as port 70000 or an oversized network, is rejected with a clear message instead of being guessed. Steps 3 and 4 are detailed below.`,
    },

    concurrency: {
        title: `Waiting less, without breaking things`,
        p1: `The first challenge is time. When a firewall ignores a connection attempt, Linux can wait around two minutes before giving up. And a network of 256 machines on 1024 ports means more than 260,000 attempts: tested one after the other, the scan becomes endless.`,
        // image : sequential-scan.png
        sequential: {
            title: `One by one`,
            p: `Each attempt waits for the previous one to finish: the waiting times add up.`,
        },
        // image : parallel-scan.png
        parallel: {
            title: `In parallel`,
            p: `Attempts are launched at the same time thanks to Rust's asynchronous programming (tokio): while one connection waits, the others move forward, and the waits overlap.`,
        },
        p2: `On top of that, every attempt is bounded by a maximum delay, the timeout: past it, the port is labeled filtered, instead of holding up the scan for two minutes.`,
        // image : semaphore.png
        semaphore: {
            title: `With a limit`,
            p: `Parallelism cannot be unlimited: every open connection uses a system resource, and by default Linux only allows about a thousand per program. A semaphore acts as a counter with a fixed number of slots: each attempt takes one, and the next ones wait for a slot to free up.`,
        },
    },

    discovery: {
        title: `Only scanning what exists`,
        p1: `On a small network, most of the 256 addresses are empty. Scanning them all means waiting for machines that do not exist. Host discovery therefore adds a quick step: first find the live machines, then scan only those.`,
        // image : discovery.png, à placer avant ce paragraphe
        p2: `Each address is probed on a few common ports (22, 80, 443, 445, 3389, 8080 and 1883, the lab's MQTT port). Any answer, even a refusal, proves the machine is there: it moves on to the full scan. Addresses that stay silent are set aside.`,
        p3: `The classic method, ping, relies on ICMP packets that require privileges. rmap therefore sticks to TCP, just as nmap does with its own TCP probes.`,
        p4: `The downside: a machine whose firewall ignores everything goes unnoticed. That is why discovery is not enabled by default. A security tool should never set machines aside unless it is asked to.`,
    },

    reliability: {
        title: `A security tool must not lie`,
        p1: `The most instructive moment of the project came from testing. By deliberately limiting system resources, the scanner started reporting open ports as closed, without any warning. For a security tool, this is the worst possible flaw: it gives a false sense of security.`,
        // image : reliability-before.png (capture du terminal, version avant la correction)
        before_label: `Before: the scan looks complete, but two open ports are missing.`,
        // image : reliability-after.png (capture du terminal, version actuelle)
        after_label: `After: the problem is detected and reported.`,
        p2: `The fix came in three steps: reproduce the problem with a test, make it visible with a fourth « error » state and an explicit warning, then fix it by making the number of simultaneous connections configurable. The same principle guides everything else: if part of the scan fails, the program keeps going, but the summary always shows what could not be tested.`,
    },

    quality: {
        title: `Code built to last`,
        p: `rmap is covered by automated tests, from parsing ports and targets to detecting port states, and checked by Rust's standard tools for formatting and common mistakes. All of its logic lives in a library separate from the command-line interface, so the lab's next tools can reuse it as is.`,
    },

    limits: {
        title: `Known limitations`,
        p1: `Documenting what a tool does not do matters as much as what it does. rmap only speaks TCP, and that is a deliberate choice. UDP has no handshake: a closed port usually answers with an error message, but an open port often stays silent, exactly like a filtered one. Telling them apart requires sending each service the kind of message it expects, which is a whole project in itself.`,
        p2: `Address ranges and networks only work with IPv4. That is not an oversight: a single IPv6 network usually contains 2⁶⁴ addresses, far too many to try one by one, so IPv6 machines are found by other means. The scanner also only accepts IP addresses, not domain names.`,
        p3: `Two limitations come from the same choice: working without administrator privileges. A « TCP connect » scan opens real connections, which the scanned machine may record in its logs; a « SYN » scan, which stops the handshake halfway, would be more discreet, but it requires building packets by hand. Likewise, discovery can miss a machine whose firewall ignores everything; on a local network, an ARP request, which asks who owns an address, would usually still spot it. Both techniques need raw packet access, which the lab's upcoming sniffer will bring.`,
        p4: `Finally, rmap says a port is open, not which service runs on it: reading the message a service sends when a connection opens would be the next step. Ports are also tested in ascending order, a regular pattern that is easy to spot, and that will make a fine first case for the lab's future intrusion detection system.`,
    },

    next: {
        title: `What's next`,
        p: `rmap is the first building block of a suite of tools, all written in Rust: a packet sniffer, a fuzzer, a man-in-the-middle attack on MQTT, then a homemade intrusion detection system. The lab will end with its IAM part: a certificate authority, mutual TLS authentication and short-lived access tokens, to put a « zero trust » architecture to the test against these very tools.`,
    },

    links: {
        title: `Links`,
        github: `Explore the code on Github`,
    },

    references: {
        title: `References`,
    },

    related: {
        title: `Related projects`,
        empty: `No project matches your search.`,
    },

    // textes alternatifs des images
    alts: {
        open_port: `Open port: the scanner sends a connection request, the machine accepts it, then the scanner confirms.`,
        closed_port: `Closed port: the scanner sends a connection request, and the machine refuses it right away.`,
        filtered_port: `Filtered port: the scanner's connection request breaks off along the way, and no answer comes back.`,
        scan_steps: `The five steps of a scan: reading the targets and reading the ports, which merge, then finding the live machines, scanning in parallel, and the report.`,
        sequential_scan: `Sequential scan: three connection attempts, each one starting only when the previous one ends.`,
        parallel_scan: `Parallel scan: three connection attempts running at the same time.`,
        semaphore: `Semaphore: on the left, attempts waiting their turn; on the right, attempts each holding one of the available slots.`,
        discovery: `Host discovery: three addresses are probed; the one that answers is kept, the two silent ones are set aside.`,
        before_fix: `Terminal screenshot before the fix: with deliberately reduced system resources, a scan of 10,000 ports reports only one open port, port 22, and zero errors, while other open ports were missed without any warning.`,
        after_fix: `Terminal screenshot after the fix: under the same conditions, the scan reports incomplete results: many ports could not be tested, with the message « Too many open files ».`,
    },
};

const fr: typeof en = {
    ui: {
        back: `Mes projets`,
    },

    header: {
        category: `Catégorie`,
        type: `Type`,
        technologies: `Technologies`,
        github: `Voir sur GitHub`,
    },

    intro: {
        p: `rmap, pour « Rust » et « nmap », est un scanner de ports TCP, et le premier outil offensif d'un laboratoire de cybersécurité que je construis entièrement moi-même. Plutôt que d'utiliser nmap, j'ai choisi d'en recoder la logique en Rust, pour comprendre ce qui se passe vraiment sur le réseau. Il repère les machines vivantes d'un réseau, teste des milliers de ports en parallèle et classe chacun comme ouvert, fermé ou filtré. Surtout, il a été construit étape par étape, avec des tests qui ont mis au jour des cas où il se trompait sans prévenir.`,
    },

    why: {
        title: `Pourquoi recoder nmap ?`,
        p1: `nmap est l'outil de référence pour cartographier un réseau. Mais s'en servir n'apprend pas comment il fonctionne. Recoder un scanner oblige à comprendre ce qu'est une connexion TCP, comment interpréter un silence, et pourquoi tester des milliers de ports n'est pas qu'une simple boucle.`,
        p2: `rmap s'inscrit dans un laboratoire plus large, orienté IAM (gestion des identités et des accès) : un réseau IoT isolé derrière un routeur OpenWrt, des objets ESP32 volontairement vulnérables, et un Raspberry Pi qui servira de serveur central. Toute utilisation offensive reste limitée à ce laboratoire, isolé et qui m'appartient.`,
    },

    basics: {
        title: `Frapper à la porte`,
        p1: `Une machine expose ses services sur des ports numérotés : 22 pour SSH, 80 pour le web, 1883 pour MQTT… Pour savoir si un port est ouvert, le scanner tente de s'y connecter et observe la réaction de la machine. Trois réactions sont possibles, et chacune raconte quelque chose de différent. Sur les schémas, les flèches orange partent du scanner, les flèches rouge foncé reviennent de la machine.`,
        // image : open-port-tcp.png
        open: {
            title: `Ouvert : un service écoute`,
            p: `Le scanner demande à se connecter (SYN). La machine accepte (SYN-ACK), et le scanner confirme (ACK) : la connexion est établie, puis refermée aussitôt. C'est ce qu'on appelle la poignée de main TCP.`,
        },
        // image : closed-port-tcp.png
        closed: {
            title: `Fermé : personne n'écoute`,
            p: `La machine répond tout de suite par un refus (RST). Elle est bien présente, mais aucun service n'attend sur ce port.`,
        },
        // image : filtered-port-tcp.png
        filtered: {
            title: `Filtré : la demande se perd`,
            p: `Aucune réponse ne revient : le plus souvent, un pare-feu a jeté la demande en chemin. Le scanner attend jusqu'à un délai fixé, puis classe le port comme filtré.`,
        },
        p2: `Cette méthode, le « TCP connect », établit une vraie connexion. Elle ne demande aucun privilège administrateur, ce qui la rend simple et sûre à utiliser ; en contrepartie, la machine scannée peut la voir dans ses journaux.`,
    },

    pipeline: {
        title: `Du terminal au rapport`,
        p1: `Une seule commande lance un scan, par exemple « rmap -t 192.168.50.0/24 -p 22,80-82 ». Derrière, elle traverse cinq étapes :`,
        // image : scan-steps.png (une boîte par étape)
        steps: [
            `Lire les cibles : 192.168.50.0/24 devient la liste des 256 adresses du réseau.`,
            `Lire les ports : 22,80-82 devient 22, 80, 81 et 82.`,
            `Repérer les machines vivantes, si on le demande, pour ne pas perdre de temps sur des adresses vides.`,
            `Tester toutes les connexions en parallèle, chaque couple machine-port devenant une tentative.`,
            `Rassembler les résultats machine par machine, avec une alerte si quelque chose n'a pas pu être testé.`,
        ],
        p2: `Les deux premières étapes reprennent la syntaxe de nmap, et elles sont strictes : une entrée invalide, comme un port 70000 ou un réseau trop grand, est refusée avec un message clair plutôt qu'interprétée au hasard. Les étapes 3 et 4 sont détaillées plus bas.`,
    },

    concurrency: {
        title: `Attendre moins, sans tout casser`,
        p1: `Le premier défi est le temps. Quand un pare-feu ignore une tentative de connexion, Linux peut attendre environ deux minutes avant d'abandonner. Or un réseau de 256 machines sur 1024 ports représente plus de 260 000 tentatives : menées l'une après l'autre, le scan devient interminable.`,
        // image : sequential-scan.png
        sequential: {
            title: `Un par un`,
            p: `Chaque tentative attend la fin de la précédente : les temps d'attente s'additionnent.`,
        },
        // image : parallel-scan.png
        parallel: {
            title: `En parallèle`,
            p: `Les tentatives sont lancées en même temps grâce à la programmation asynchrone de Rust (tokio) : pendant qu'une connexion attend, les autres avancent, et les attentes se chevauchent.`,
        },
        p2: `S'y ajoute un délai maximal par tentative, le timeout : passé ce délai, le port est classé filtré, au lieu de bloquer le scan pendant deux minutes.`,
        // image : semaphore.png
        semaphore: {
            title: `Avec une limite`,
            p: `Le parallélisme ne peut pas être infini : chaque connexion ouverte consomme une ressource du système, et Linux n'en autorise par défaut qu'environ un millier par programme. Un sémaphore joue le rôle de guichet, avec un nombre fixe de places : chaque tentative en occupe une, et les suivantes attendent qu'une place se libère.`,
        },
    },

    discovery: {
        title: `Ne scanner que ce qui existe`,
        p1: `Sur un petit réseau, la plupart des 256 adresses sont vides. Les scanner en entier revient à attendre des machines qui n'existent pas. La découverte d'hôtes ajoute donc une étape rapide : repérer d'abord les machines vivantes, puis ne scanner qu'elles.`,
        // image : discovery.png, à placer avant ce paragraphe
        p2: `Chaque adresse est sondée sur quelques ports courants (22, 80, 443, 445, 3389, 8080 et 1883, le port MQTT du laboratoire). Toute réponse, même un refus, prouve que la machine est là : elle passe au scan complet. Les adresses qui restent muettes sont écartées.`,
        p3: `La méthode classique, le ping, repose sur des paquets ICMP qui demandent des privilèges. rmap reste donc sur TCP, comme le fait nmap avec ses propres sondes TCP.`,
        p4: `Le revers : une machine dont le pare-feu ignore tout passe inaperçue. C'est pourquoi la découverte n'est pas activée par défaut. Un outil de sécurité ne doit pas écarter des machines sans qu'on le lui demande.`,
    },

    reliability: {
        title: `Un outil de sécurité ne doit pas mentir`,
        p1: `Le moment le plus instructif du projet est venu des tests. En réduisant volontairement les ressources du système, le scanner a commencé à déclarer fermés des ports pourtant ouverts, sans le moindre avertissement. Pour un outil de sécurité, c'est le pire défaut possible : il donne une fausse impression de sécurité.`,
        // image : reliability-before.png (capture du terminal, version avant la correction)
        before_label: `Avant : le scan semble complet, mais deux ports ouverts manquent à l'appel.`,
        // image : reliability-after.png (capture du terminal, version actuelle)
        after_label: `Après : le problème est détecté et signalé.`,
        p2: `La correction s'est faite en trois temps : reproduire le problème par un test, le rendre visible avec un quatrième état « erreur » et un avertissement explicite, puis le corriger en rendant réglable le nombre de connexions simultanées. Le même principe guide tout le reste : si une partie du scan échoue, le programme continue, mais le bilan indique toujours ce qui n'a pas pu être testé.`,
    },

    quality: {
        title: `Un code pensé pour durer`,
        p: `rmap est couvert par des tests automatisés, de la lecture des ports et des cibles jusqu'à la détection des états, et vérifié par les outils standards de Rust pour la mise en forme et les erreurs courantes. Toute sa logique est rangée dans une bibliothèque séparée de l'interface en ligne de commande : les prochains outils du laboratoire pourront la réutiliser telle quelle.`,
    },

    limits: {
        title: `Limites connues`,
        p1: `Documenter ce qu'un outil ne fait pas compte autant que ce qu'il fait. rmap ne parle que TCP, et c'est un choix. UDP n'a pas de poignée de main : un port fermé répond en général par un message d'erreur, mais un port ouvert reste souvent muet, exactement comme un port filtré. Les distinguer demande d'envoyer à chaque service le type de message qu'il attend, ce qui est un projet à part entière.`,
        p2: `Les plages d'adresses et les réseaux ne fonctionnent qu'en IPv4. Ce n'est pas un oubli : un seul réseau IPv6 compte en général 2⁶⁴ adresses, bien trop pour les essayer une à une, et les machines IPv6 se découvrent par d'autres moyens. Le scanner n'accepte par ailleurs que des adresses IP, pas des noms de domaine.`,
        p3: `Deux limites viennent du même choix : fonctionner sans privilèges administrateur. Le scan « TCP connect » ouvre de vraies connexions, que la machine scannée peut garder dans ses journaux ; un scan « SYN », qui s'arrête à mi-chemin de la poignée de main, serait plus discret, mais il demande de fabriquer les paquets à la main. De même, la découverte peut manquer une machine dont le pare-feu ignore tout ; sur un réseau local, une requête ARP, qui demande à qui appartient une adresse, la repérerait en général quand même. Ces deux techniques demandent un accès direct aux paquets, que le futur sniffer du laboratoire apportera.`,
        p4: `Enfin, rmap dit qu'un port est ouvert, pas quel service s'y trouve : lire le message qu'un service envoie à l'ouverture de la connexion serait l'étape suivante. Les ports sont aussi testés dans l'ordre croissant, un motif régulier facile à repérer, qui fera un très bon premier cas d'étude pour le futur système de détection d'intrusion du laboratoire.`,
    },

    next: {
        title: `Et ensuite`,
        p: `rmap est la première brique d'une suite d'outils, tous écrits en Rust : un sniffer de paquets, un fuzzer, une attaque de l'homme du milieu sur MQTT, puis un système de détection d'intrusion maison. Le laboratoire se conclura par sa partie IAM : autorité de certification, authentification mutuelle TLS et jetons d'accès de courte durée, pour éprouver une architecture « zero trust » face à ces mêmes outils.`,
    },

    links: {
        title: `Liens`,
        github: `Voir le code sur GitHub`,
    },

    references: {
        title: `Références`,
    },

    related: {
        title: `Projets liés`,
        empty: `Aucun projet ne correspond à votre recherche.`,
    },

    // textes alternatifs des images
    alts: {
        open_port: `Port ouvert : le scanner envoie une demande de connexion, la machine l'accepte, puis le scanner confirme.`,
        closed_port: `Port fermé : le scanner envoie une demande de connexion, et la machine la refuse aussitôt.`,
        filtered_port: `Port filtré : la demande de connexion du scanner s'interrompt en chemin, et aucune réponse ne revient.`,
        scan_steps: `Les cinq étapes d'un scan : la lecture des cibles et celle des ports, qui se rejoignent, puis la découverte des machines vivantes, le scan en parallèle et le rapport.`,
        sequential_scan: `Scan séquentiel : trois tentatives de connexion, chacune ne commençant qu'à la fin de la précédente.`,
        parallel_scan: `Scan en parallèle : trois tentatives de connexion menées en même temps.`,
        semaphore: `Sémaphore : à gauche, des tentatives qui attendent leur tour ; à droite, des tentatives qui occupent chacune une des places disponibles.`,
        discovery: `Découverte d'hôtes : trois adresses sont sondées ; celle qui répond est gardée, les deux muettes sont écartées.`,
        before_fix: `Capture du terminal avant la correction : avec des ressources système volontairement réduites, le scan de 10 000 ports n'annonce qu'un seul port ouvert, le 22, et aucune erreur, alors que d'autres ports ouverts ont été manqués sans avertissement.`,
        after_fix: `Capture du terminal après la correction : dans les mêmes conditions, le scan signale des résultats incomplets : de nombreux ports n'ont pas pu être testés, avec le message « Too many open files ».`,
    },
};

export const RMAP_TEXTS = { en, fr };