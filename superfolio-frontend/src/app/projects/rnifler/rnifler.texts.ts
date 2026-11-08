// Tous les textes de la page rnifler : d'abord en anglais, puis en français.
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
        p1: `rnifler, from « renifleur », the French word for « sniffer », with the r of Rust, is a defensive network sniffer written in Rust. It listens to MQTT traffic, the messaging protocol used by many connected devices, and decodes it in plain text: who connects, with which credentials, which values are published, which commands are sent.`,
        p2: `Rather than using Wireshark, I rebuilt its logic layer by layer: capturing packets, putting each TCP conversation back together, then decoding every message from the official MQTT specification. Since it reads data that may come from an attacker, every step was designed to withstand booby-trapped packets.`,
    },

    features: {
        title: `What it does`,
        intro: `rnifler runs with a single command and covers four uses:`,
        items: [
            `Watch live traffic: the traffic of a network interface is displayed message by message, with the direction of each exchange and a timestamp down to the microsecond.`,
            `Replay a capture: a recorded file, from rnifler, tcpdump or Wireshark, is read exactly like live traffic, without any privileges.`,
            `Record: the raw traffic is saved to files in the pcap format, which Wireshark opens directly.`,
            `Flag anomalies: any message that breaks the MQTT specification is detected and explained, along with the exact rule it violates.`,
        ],
        p: `Every published version comes with ready-to-use binaries for PCs (x86_64) and for the Raspberry Pi (64-bit ARM).`,
    },

    independent: {
        title: `A standalone building block`,
        p1: `In the IoT world, MQTT often travels unencrypted: a sensor publishes a temperature, an actuator receives the order to switch on, and everything crosses the network in plain text. To defend such an infrastructure, you first need to see what flows through it.`,
        p2: `rnifler was designed for the IoT cybersecurity lab I am building, but deliberately kept apart from it. All of its logic lives in a library that observes and reports what it sees as events (a decoded message, a lost packet, an anomaly); the command-line interface is just one user of that library, and simply displays them.`,
        p3: `This split makes the tool reusable in other contexts, and that is exactly what the lab will do: the same library will serve as the foundation of its future intrusion detection system (IDS), which will apply its own rules to the very same events.`,
    },

    journey: {
        title: `The journey of a packet`,
        intro: `Between the antenna and the screen, an MQTT message goes through four steps. Each one answers a specific problem.`,

        capture: {
            title: `1. Capture`,
            p1: `A network card sees all of the machine's traffic go by: SSH, DNS, the web... Copying every packet to the program only to keep a tiny fraction of them would be costly. rnifler therefore hands the sorting over to the kernel: a small filter (BPF), compiled by the libpcap library, only lets MQTT traffic through.`,
            p2: `Listening to the network requires privileges, but not all of an administrator's. The program receives a single capability from the system, the right to open a capture socket (CAP_NET_RAW), instead of running with every root privilege. And replaying a file requires no privileges at all.`,
            p3: `Each captured packet is then broken down layer by layer, Ethernet, then IP, then TCP, to extract the addresses, the ports and the data it carries. This well-known step is handed over to a proven library (etherparse): the real challenge of the project lies in what comes next.`,
        },

        reassembly: {
            title: `2. Put the pieces back together`,
            p1: `TCP does not carry messages, but a stream of bytes. A single MQTT message can therefore arrive split into several pieces (segments), two messages can share the same segment, and a segment can be sent again, lost, or arrive late. Decoding each segment on its own would produce false alerts.`,
            p2: `rnifler therefore rebuilds each conversation, in each direction, putting the bytes back in order thanks to their sequence numbers. Duplicates are discarded, a missing segment is reported, and decoding resynchronizes on the next message. A connection that was already open when the tool started is picked up midway, without any false anomaly.`,
            p3: `All of this happens without copying the data: complete messages are decoded directly within the captured bytes, and only the beginning of a split message is set aside while waiting for the rest. Memory is bounded: at most 256 tracked conversations, and 64 MB in total for incomplete messages.`,
            callout: {
                label: `Technical focus`,
                title: `Zero copy, zero risk`,
                p: `In C, keeping a pointer to a packet's bytes after moving on to the next packet is a classic mistake: the memory has been reused, and the program reads data that is no longer the right one (use-after-free). In Rust, every decoded message is tied by a lifetime to the bytes it comes from: the compiler rejects any code that would try to use it after them. Zero copy thus becomes a guarantee checked at compile time, rather than a discipline to follow by hand.`,
            },
        },

        decoding: {
            title: `3. Understand`,
            p1: `MQTT libraries exist, but they are made for clients: faced with an invalid packet, they reject it. A defensive tool has to do the opposite: explain why the packet is invalid, because that is precisely what tells a badly programmed device apart from an attack attempt. So I wrote the decoder by hand, from the official OASIS specification.`,
            p2: `Every message starts with a header announcing its type and its remaining length, encoded on one to four bytes. This length is what tells where a message ends within the stream. Every read then goes through the same checkpoint, which makes sure a field never goes past the end of the packet before reading it.`,
            p3: `The decoder recognizes the 14 packet types of MQTT 3.1.1 and detects 19 kinds of anomalies: reserved flags, forbidden quality of service, badly encoded text, lying lengths... Each one is explained, along with the reference of the specification requirement it violates whenever there is one.`,
        },

        recording: {
            title: `4. Keep a record`,
            p1: `To analyze an incident after the fact, rnifler can record the raw traffic, before any analysis, in pcap files, the standard format read by tcpdump and Wireshark. A new file starts every 100 MB, and each one is named after the UTC time of its first frame, down to the millisecond.`,
            p2: `These files are sensitive: with unencrypted MQTT, they contain credentials in plain text. They can therefore only be read by their owner, an existing file is never overwritten, and every frame is written to disk as soon as it arrives, so nothing is lost if the program stops abruptly.`,
        },
    },

    hostile: {
        title: `A tool that reads hostile data`,
        intro: `A sniffer reads data sent by anyone on the network, attackers included. It is therefore a target itself. Four threats shaped its design.`,

        lengths: {
            title: `Lying lengths`,
            p: `A field announces its own length: 200 bytes, while the packet only contains two. This is the principle behind the Heartbleed flaw, which leaked the memory of many servers in 2014. In rnifler, every length is compared with the data actually present before anything is read: the packet is reported as an anomaly, and nothing else is read.`,
        },

        terminal: {
            title: `The booby-trapped terminal`,
            p: `Some character sequences are not displayed: the terminal executes them as commands, to clear the screen or rewrite lines. A malicious client could slip some into a topic name, to wipe the traces of its attack from the screen (CWE-150). rnifler neutralizes every string coming from the network before displaying it. Passwords, for their part, are hidden by default.`,
        },

        insertion: {
            title: `Seeing what the recipient sees`,
            p: `An analysis tool can be fooled if it does not handle packets exactly like the machine it monitors. An attacker sends a fake packet whose checksum, the value meant to detect corruption, is deliberately wrong: the broker's system rejects it, but a tool that checks nothing accepts it, and displays a message the broker never received. This insertion attack was described by Ptacek and Newsham in 1998. rnifler therefore checks checksums, and accepts connection resets (RST) according to the same rules as Linux.`,
        },

        memory: {
            title: `Memory exhaustion`,
            p: `The length of an MQTT message can reach 256 MB. An attacker could announce one, then send it byte by byte, to inflate the tool's memory until it crashes. rnifler refuses any message larger than 1 MB as soon as it reads the header, without waiting for its data, and caps the total memory it devotes to incomplete messages.`,
        },

        offload: {
            label: `Technical focus`,
            title: `Why only incoming packets are checked`,
            p: `To lighten the processor's load, the network card computes the checksums of outgoing packets itself (offload). But the capture happens before that computation: as seen by the sniffer, packets sent by the machine carry an incomplete checksum, which would look wrong. rnifler therefore only checks packets received by the machine, whose checksum is real. On the local interface (loopback), which never computes this checksum, checking is turned off automatically.`,
        },

        rst: {
            label: `Technical focus`,
            title: `The forged RST`,
            p: `An RST packet abruptly cuts a TCP connection. Since 2012, Linux only accepts an RST if its sequence number is exactly the expected one, as defined by RFC 5961. rnifler applies the same rule: an attacker sending a fake RST with an approximate number cannot make the tool believe a connection is over while the broker keeps receiving it.`,
        },
    },

    proof: {
        title: `Test, replay, publish`,

        test: {
            title: `Test`,
            p: `A single command, cargo test, runs 138 tests (121 unit tests and 17 integration tests), with no network and no privileges. They start from frames that were actually captured, cover each of the 19 anomalies with counter-tests making sure a valid packet is never wrongly rejected, and compare the checksum computation with a reference library across dozens of frames.`,
        },

        replay: {
            title: `Replay`,
            p: `Another command generates nine captures that reproduce specific situations: a split message, a lost packet, out-of-order segments, a malformed packet, a lying length, a forged RST, a booby-trapped topic, an insertion, an already open connection. Anyone can replay them with rnifler or open them in Wireshark. The insertion scenario is the most telling: without checksum checking, the tool displays the fake message; with it, the real one.`,
        },

        publish: {
            title: `Publish`,
            p: `Tests run automatically on every change to the code (continuous integration). Publishing a version only takes a tag: the tests run again on PC and on ARM, then the binaries for both architectures are built and published with their SHA-256 fingerprint, which lets anyone make sure the downloaded file is intact. The pipeline itself is hardened: every external action is pinned to a precise version, and the pipeline's token only has the rights it strictly needs.`,
        },
    },

    limits: {
        title: `Known limitations`,
        p1: `rnifler only reads unencrypted MQTT. Once the traffic is encrypted with TLS, messages become unreadable to any observer on the network, and that is the point: only the broker, which decrypts them, keeps sight of the messages.`,
        p2: `When a segment arrives out of order, rnifler does not hold it back: it reports the gap and resynchronizes on the next message. This is a choice of simplicity, which can lose a message during a burst on an unstable Wi-Fi network. Resynchronization also remains a heuristic: an arbitrary sequence of bytes can, rarely, look like a valid message.`,
        p3: `Only version 3.1.1 of MQTT is supported, the most widespread one, not version 5.`,
        p4: `Finally, checking checksums does not close every door to insertion: the broker's system can reject a packet for other reasons, such as a sequence number outside its receive window, which the tool does not reproduce.`,
    },

    next: {
        title: `What's next`,
        p: `rnifler will serve as the foundation of the IoT security lab's intrusion detection system. The messages it already decodes, such as an anonymous connection, a refused subscription or a malformed packet, will become the raw material of detection rules.`,
    },

    links: {
        title: `Links`,
        github: `Explore the code on Github`,
    },

    references: {
        title: `References`,
        mqtt: `OASIS - MQTT Version 3.1.1: the specification the decoder was written from.`,
        ptacek: `Ptacek and Newsham — Insertion, Evasion, and Denial of Service: the founding paper on attacks against network analysis tools.`,
        rfc5961: `RFC 5961: the RST acceptance rule applied by Linux.`,
        cwe150: `MITRE CWE-150: escape sequence injection.`,
        rust_book: `The Rust Programming Language: the official Rust documentation.`,
    },

    related: {
        title: `Related projects`,
        empty: `No project matches your search.`,
    },

    // textes alternatifs des images
    alts: {
        session: `Terminal screenshot: rnifler replays a recorded MQTT session, from the opening of the connection to its closing, with the password hidden.`,
        usage_live: `Terminal screenshot: live capture on the Raspberry Pi's Wi-Fi interface, showing messages published by the lab's connected devices.`,
        usage_replay: `Terminal screenshot: replaying a capture file, without any privileges.`,
        usage_record: `Terminal screenshot: recording starts, followed by the list of pcap files, named by date and readable by their owner only.`,
        usage_anomaly: `Terminal screenshot: a malformed packet is reported as an anomaly, with the reference of the violated specification requirement.`,
        usage_wireshark: `A file recorded by rnifler, opened in Wireshark.`,
        library: `Diagram: the rnifler library turns network frames into events; today the command-line interface displays them, tomorrow the lab's IDS will analyze them.`,
        journey: `Diagram: the journey of a packet, from the network card to rnifler, through four steps: capture, put the pieces back together, understand, keep a record.`,
        bpf: `Diagram: all the interface's traffic reaches the kernel filter, which only lets MQTT traffic through to rnifler.`,
        split_message: `Diagram: two TCP segments, each containing part of a message, are put back together into a single MQTT message.`,
        gap: `Diagram: three cases of segment arrival: in order, with a missing segment, then with a late segment, and the tool's reaction to each.`,
        split_capture: `Terminal screenshot: two TCP segments are displayed, followed by a single decoded MQTT message.`,
        restransmission_capture: `Termial screenshot: warning and retransmission`,
        publish_bytes: `Diagram: an MQTT PUBLISH message broken down byte by byte: type, remaining length, topic length, topic and value.`,
        lying_length: `Terminal screenshot: a topic announcing 200 bytes while the packet only contains two is reported as an anomaly, and the rest of the stream is ignored.`,
        rotation: `Diagram: recording files following one another, each limited to 100 MB and named after the time of its first frame.`,
        pcap_files: `Terminal screenshot: list of recorded pcap files, with owner-only permissions.`,
        threats: `Diagram: four threats and their countermeasures: lying lengths, escape sequences, fake packets and memory exhaustion.`,
        insertion: `Diagram: an attacker sends a fake packet with a wrong checksum; the broker rejects it, while a tool that checks nothing accepts it.`,
        trapped_topic: `Terminal screenshot: a booby-trapped topic displayed in a harmless form, the escape sequence being shown instead of executed.`,
        offload: `Diagram: an outgoing packet is captured before its checksum is computed by the network card, while an incoming packet is captured with its real checksum.`,
        cargo_test: `Terminal screenshot: result of cargo test, with all tests passing.`,
        insertion_replay: `Two terminal screenshots side by side: without checksum checking, the fake message is displayed; with it, the fake packet is ignored and the real message is displayed.`,
        ci_cd: `Diagram of the CI/CD pipeline: a push runs the tests; a version tag runs the tests on PC and ARM, then builds and publishes the binaries with their SHA-256 fingerprint.`,
        release: `Screenshot of a GitHub release page with the binaries for both architectures and their fingerprints.`,
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
        p1: `rnifler, de « renifleur », la traduction française de « sniffer », avec le r de Rust, est un sniffer réseau défensif écrit en Rust. Il écoute le trafic MQTT, le protocole de messagerie de nombreux objets connectés, et le décode en clair : qui se connecte, avec quels identifiants, quelles valeurs sont publiées, quelles commandes sont envoyées.`,
        p2: `Plutôt que d'utiliser Wireshark, j'en ai recodé la logique couche par couche : capturer les paquets, recoller les morceaux de chaque conversation TCP, puis décoder chaque message à partir de la spécification officielle de MQTT. Comme il lit des données qui peuvent venir d'un attaquant, chaque étape a été pensée pour résister aux paquets piégés.`,
    },

    features: {
        title: `Ce que fait l'outil`,
        intro: `rnifler se lance en une commande et couvre quatre usages :`,
        items: [
            `Observer en direct : le trafic d'une interface réseau s'affiche message par message, avec le sens de chaque échange et son horodatage à la microseconde.`,
            `Rejouer une capture : un fichier enregistré, par rnifler, tcpdump ou Wireshark, se relit exactement comme le trafic en direct, sans aucun privilège.`,
            `Enregistrer : le trafic brut est sauvegardé dans des fichiers au format pcap, que Wireshark ouvre directement.`,
            `Signaler les anomalies : tout message qui viole la spécification MQTT est repéré et expliqué, avec la règle précise qu'il enfreint.`,
        ],
        p: `Chaque version publiée fournit des binaires prêts à l'emploi pour PC (x86_64) et pour Raspberry Pi (ARM 64 bits).`,
    },

    independent: {
        title: `Une brique indépendante`,
        p1: `Dans l'IoT, MQTT circule souvent sans chiffrement : un capteur publie une température, un actionneur reçoit l'ordre de s'allumer, et tout passe en clair sur le réseau. Pour défendre une telle infrastructure, il faut d'abord voir ce qui y circule.`,
        p2: `rnifler a été conçu pour le laboratoire de cybersécurité IoT que je construis, mais volontairement découplé de ce dernier. Toute sa logique vit dans une bibliothèque qui observe et signale ce qu'elle voit sous forme d'événements (un message décodé, un paquet perdu, une anomalie) ; l'interface en ligne de commande n'est qu'un utilisateur de cette bibliothèque, qui se contente de les afficher.`,
        p3: `Ce découpage permet de réutiliser l'outil dans d'autres contextes, et c'est précisément ce que fera le laboratoire : la même bibliothèque servira de base à son futur système de détection d'intrusion (IDS), qui appliquera ses propres règles aux mêmes événements.`,
    },

    journey: {
        title: `Le trajet d'un paquet`,
        intro: `Entre l'antenne et l'écran, un message MQTT traverse quatre étapes. Chacune répond à un problème précis.`,

        capture: {
            title: `1. Capturer`,
            p1: `Une carte réseau voit passer tout le trafic de la machine : SSH, DNS, web... Copier chaque paquet vers le programme pour n'en garder qu'une infime partie serait coûteux. rnifler confie donc le tri au noyau : un petit filtre (BPF), compilé par la bibliothèque libpcap, ne laisse remonter que le trafic MQTT.`,
            p2: `Écouter le réseau demande des privilèges, mais pas tous ceux d'un administrateur. Le programme ne reçoit qu'une seule capacité du système, celle d'ouvrir une socket de capture (CAP_NET_RAW), au lieu de tourner avec tous les droits de root. Et pour rejouer un fichier, aucun privilège n'est nécessaire.`,
            p3: `Chaque paquet retenu est ensuite découpé couche par couche, Ethernet, puis IP, puis TCP, pour en extraire les adresses, les ports et les données qu'il transporte. Cette étape bien connue est confiée à une bibliothèque éprouvée (etherparse) : la vraie difficulté du projet se trouve dans la suite.`,
        },

        reassembly: {
            title: `2. Recoller les morceaux`,
            p1: `TCP ne transporte pas des messages, mais un flux d'octets. Un même message MQTT peut donc arriver coupé en plusieurs morceaux (segments), deux messages peuvent partager un même segment, et un segment peut être renvoyé, perdu ou arriver en retard. Décoder chaque segment isolément produirait de fausses alertes.`,
            p2: `rnifler reconstitue donc chaque conversation, dans chaque sens, en remettant les octets dans l'ordre grâce à leur numéro de séquence. Les doublons sont écartés, un segment manquant est signalé, et le décodage se resynchronise sur le message suivant. Une connexion déjà ouverte au démarrage de l'outil est reprise en cours de route, sans fausse anomalie.`,
            p3: `Le tout sans recopier les données : les messages complets sont décodés directement dans les octets capturés, et seul le début d'un message coupé est mis de côté en attendant la suite. La mémoire est bornée : au plus 256 conversations suivies, et 64 Mo au total pour les messages incomplets.`,
            callout: {
                label: `Zoom technique`,
                title: `Zéro copie, zéro risque`,
                p: `En C, garder un pointeur vers les octets d'un paquet après être passé au suivant est une erreur classique : la mémoire a été réutilisée, et le programme lit des données qui ne sont plus les bonnes (use-after-free). En Rust, chaque message décodé est lié par une durée de vie aux octets d'où il vient : le compilateur refuse tout code qui tenterait de l'utiliser après eux. Le zéro-copie devient ainsi une garantie vérifiée à la compilation, et non une discipline à respecter à la main.`,
            },
        },

        decoding: {
            title: `3. Comprendre`,
            p1: `Il existe des bibliothèques MQTT, mais elles sont faites pour des clients : face à un paquet invalide, elles le rejettent. Un outil de défense doit faire l'inverse : expliquer pourquoi le paquet est invalide, car c'est justement ce qui distingue un objet mal programmé d'une tentative d'attaque. J'ai donc écrit le décodeur à la main, à partir de la spécification officielle d'OASIS.`,
            p2: `Chaque message commence par un en-tête qui annonce son type et sa longueur restante, codée sur un à quatre octets. C'est cette longueur qui permet de savoir où s'arrête un message dans le flux. Toutes les lectures passent ensuite par un même point de contrôle, qui vérifie qu'un champ ne dépasse jamais la fin du paquet avant de le lire.`,
            p3: `Le décodeur reconnaît les 14 types de paquets de MQTT 3.1.1 et détecte 19 sortes d'anomalies : drapeaux réservés, qualité de service interdite, texte mal encodé, longueurs mensongères... Chacune est expliquée, avec la référence de l'exigence de la spécification qu'elle viole lorsqu'il en existe une.`,
        },

        recording: {
            title: `4. Garder une trace`,
            p1: `Pour analyser un incident après coup, rnifler peut enregistrer le trafic brut, avant toute analyse, dans des fichiers au format pcap, le format standard que lisent tcpdump et Wireshark. Un nouveau fichier commence tous les 100 Mo, et chacun est nommé d'après l'heure UTC de sa première trame, à la milliseconde.`,
            p2: `Ces fichiers sont sensibles : en MQTT non chiffré, ils contiennent les identifiants en clair. Ils ne sont donc lisibles que par leur propriétaire, un fichier existant n'est jamais écrasé, et chaque trame est écrite sur le disque dès sa réception, pour ne rien perdre en cas d'arrêt brutal.`,
        },
    },

    hostile: {
        title: `Un outil qui lit des données hostiles`,
        intro: `Un sniffer lit des données envoyées par n'importe qui sur le réseau, attaquants compris. Il est donc lui-même une cible. Quatre menaces ont guidé sa conception.`,

        lengths: {
            title: `Les longueurs mensongères`,
            p: `Un champ annonce sa propre longueur : 200 octets, alors que le paquet n'en contient que deux. C'est le principe de la faille Heartbleed, qui a fait fuiter la mémoire de nombreux serveurs en 2014. Dans rnifler, chaque longueur est comparée aux données réellement présentes avant toute lecture : le paquet est signalé comme anomalie, et rien d'autre n'est lu.`,
        },

        terminal: {
            title: `Le terminal piégé`,
            p: `Certaines suites de caractères ne s'affichent pas : le terminal les exécute comme des commandes, pour effacer l'écran ou réécrire des lignes. Un client malveillant pourrait en glisser dans le nom d'un topic, pour effacer de l'écran les traces de son attaque (CWE-150). rnifler neutralise toute chaîne venue du réseau avant de l'afficher. Les mots de passe, eux, sont masqués par défaut.`,
        },

        insertion: {
            title: `Voir ce que voit le destinataire`,
            p: `Un outil d'analyse peut être trompé s'il ne traite pas les paquets exactement comme la machine qu'il surveille. Un attaquant envoie un faux paquet dont le checksum, la valeur censée détecter les corruptions, est volontairement faux : le système du broker le rejette, mais un outil qui ne vérifie rien l'accepte, et affiche un message que le broker n'a jamais reçu. Cette attaque par insertion a été décrite par Ptacek et Newsham en 1998. rnifler vérifie donc les checksums, et accepte les coupures de connexion (RST) selon les mêmes règles que Linux.`,
        },

        memory: {
            title: `L'épuisement de la mémoire`,
            p: `La longueur d'un message MQTT peut atteindre 256 Mo. Un attaquant pourrait en annoncer un, puis l'envoyer octet par octet, pour faire gonfler la mémoire de l'outil jusqu'à le faire tomber. rnifler refuse tout message de plus de 1 Mo dès la lecture de son en-tête, sans attendre ses données, et plafonne la mémoire totale qu'il consacre aux messages incomplets.`,
        },

        offload: {
            label: `Zoom technique`,
            title: `Pourquoi ne vérifier que les paquets reçus`,
            p: `Pour soulager le processeur, la carte réseau calcule elle-même les checksums des paquets qui sortent (offload). Or la capture a lieu avant ce calcul : vus par le sniffer, les paquets émis par la machine portent un checksum incomplet, qui semblerait faux. rnifler ne vérifie donc que les paquets reçus par la machine, dont le checksum est réel. Sur l'interface locale (loopback), qui ne calcule jamais ce checksum, la vérification est désactivée automatiquement.`,
        },

        rst: {
            label: `Zoom technique`,
            title: `Le RST forgé`,
            p: `Un paquet RST coupe brutalement une connexion TCP. Depuis 2012, Linux n'accepte un RST que si son numéro de séquence est exactement celui attendu, comme le prévoit la RFC 5961. rnifler applique la même règle : un attaquant qui enverrait un faux RST, au numéro approximatif, ne peut pas faire croire à l'outil qu'une connexion est terminée alors que le broker continue de la recevoir.`,
        },
    },

    proof: {
        title: `Tester, rejouer, publier`,

        test: {
            title: `Tester`,
            p: `Une seule commande, cargo test, lance 138 tests (121 tests unitaires et 17 tests d'intégration), sans réseau ni privilèges. Ils partent de trames réellement capturées, couvrent chacune des 19 anomalies avec des contre-tests qui s'assurent qu'un paquet valide n'est jamais rejeté à tort, et comparent le calcul des checksums à celui d'une bibliothèque de référence sur des dizaines de trames.`,
        },

        replay: {
            title: `Rejouer`,
            p: `Une autre commande génère neuf captures qui reproduisent des situations précises : message coupé, paquet perdu, segments dans le désordre, paquet malformé, longueur mensongère, RST forgé, topic piégé, insertion, connexion déjà ouverte. Chacun peut les rejouer avec rnifler ou les ouvrir dans Wireshark. Le scénario d'insertion est le plus parlant : sans vérification des checksums, l'outil affiche le faux message ; avec, il affiche le vrai.`,
        },

        publish: {
            title: `Publier`,
            p: `Les tests tournent automatiquement à chaque modification du code (intégration continue). Pour publier une version, il suffit de poser une étiquette : les tests sont relancés sur PC et sur ARM, puis les binaires des deux architectures sont compilés et publiés avec leur empreinte SHA-256, qui permet à chacun de s'assurer que le fichier téléchargé est intact. Le pipeline lui-même est durci : chaque action externe est figée sur une version précise, et le jeton du pipeline n'a que les droits strictement nécessaires.`,
        },
    },

    limits: {
        title: `Limites connues`,
        p1: `rnifler ne lit que le MQTT en clair. Une fois le trafic chiffré par TLS, les messages deviennent illisibles pour tout observateur du réseau, et c'est le but : seul le broker, qui les déchiffre, garde alors la vision des messages.`,
        p2: `Quand un segment arrive dans le désordre, rnifler ne le met pas en attente : il signale le trou et se resynchronise sur le message suivant. C'est un choix de simplicité, qui peut faire perdre un message lors d'une rafale sur un réseau Wi-Fi instable. La resynchronisation reste par ailleurs une heuristique : une suite d'octets quelconque peut, rarement, ressembler à un message valide.`,
        p3: `Seule la version 3.1.1 de MQTT est prise en charge, la plus répandue, et non la version 5.`,
        p4: `Enfin, vérifier les checksums ne ferme pas toutes les portes à l'insertion : le système du broker peut rejeter un paquet pour d'autres raisons, comme un numéro de séquence hors de sa fenêtre de réception, que l'outil ne reproduit pas.`,
    },

    next: {
        title: `Et ensuite`,
        p: `rnifler servira de base au système de détection d'intrusion du laboratoire de sécurité IoT. Les messages qu'il décode déjà, comme une connexion anonyme, un abonnement refusé ou un paquet malformé, deviendront la matière première de règles de détection.`,
    },

    links: {
        title: `Liens`,
        github: `Voir le code sur GitHub`,
    },

    references: {
        title: `Références`,
        mqtt: `OASIS - MQTT Version 3.1.1 : la spécification à partir de laquelle le décodeur a été écrit.`,
        ptacek: `Ptacek et Newsham — Insertion, Evasion, and Denial of Service : l'article fondateur sur les attaques contre les outils d'analyse réseau.`,
        rfc5961: `RFC 5961 : la règle d'acceptation des RST appliquée par Linux.`,
        cwe150: `MITRE CWE-150 : l'injection de séquences d'échappement.`,
        rust_book: `The Rust Programming Language : la documentation officielle de Rust.`,
    },

    related: {
        title: `Projets liés`,
        empty: `Aucun projet ne correspond à votre recherche.`,
    },

    // textes alternatifs des images
    alts: {
        session: `Capture du terminal : rnifler rejoue une session MQTT enregistrée, de l'ouverture de la connexion à sa fermeture, avec le mot de passe masqué.`,
        usage_live: `Capture du terminal : capture en direct sur l'interface Wi-Fi du Raspberry Pi, avec les messages publiés par les objets connectés du laboratoire.`,
        usage_replay: `Capture du terminal : rejeu d'un fichier de capture, sans aucun privilège.`,
        usage_record: `Capture du terminal : démarrage de l'enregistrement, suivi de la liste des fichiers pcap, nommés par date et lisibles par leur seul propriétaire.`,
        usage_anomaly: `Capture du terminal : un paquet malformé est signalé comme anomalie, avec la référence de l'exigence de la spécification qu'il viole.`,
        usage_wireshark: `Un fichier enregistré par rnifler, ouvert dans Wireshark.`,
        library: `Schéma : la bibliothèque rnifler transforme les trames réseau en événements ; aujourd'hui l'interface en ligne de commande les affiche, demain l'IDS du laboratoire les analysera.`,
        journey: `Schéma : le trajet d'un paquet, de la carte réseau jusqu'à rnifler, en quatre étapes : capturer, recoller les morceaux, comprendre, garder une trace.`,
        bpf: `Schéma : tout le trafic de l'interface arrive au filtre du noyau, qui ne laisse passer que le trafic MQTT vers rnifler.`,
        split_message: `Schéma : deux segments TCP, contenant chacun une partie d'un message, sont recollés en un seul message MQTT.`,
        restransmission_capture: `Terminal: alerte et retransmission d'un message en direct`,
        gap: `Schéma : trois cas d'arrivée des segments, dans l'ordre, avec un segment manquant, puis avec un segment en retard, et la réaction de l'outil à chacun.`,
        split_capture: `Capture du terminal : deux segments TCP s'affichent, suivis d'un seul message MQTT décodé.`,
        publish_bytes: `Schéma : un message MQTT PUBLISH décomposé octet par octet : type, longueur restante, longueur du topic, topic et valeur.`,
        lying_length: `Capture du terminal : un topic qui annonce 200 octets alors que le paquet n'en contient que deux est signalé comme anomalie, et la suite du flux est ignorée.`,
        rotation: `Schéma : des fichiers d'enregistrement qui se succèdent, chacun limité à 100 Mo et nommé d'après l'heure de sa première trame.`,
        pcap_files: `Capture du terminal : liste des fichiers pcap enregistrés, avec des droits réservés à leur propriétaire.`,
        threats: `Schéma : quatre menaces et leurs parades : longueurs mensongères, séquences d'échappement, faux paquets et épuisement de la mémoire.`,
        insertion: `Schéma : un attaquant envoie un faux paquet au checksum invalide ; le broker le rejette, alors qu'un outil qui ne vérifie rien l'accepte.`,
        trapped_topic: `Capture du terminal : un topic piégé affiché sous une forme inoffensive, la séquence d'échappement étant montrée au lieu d'être exécutée.`,
        offload: `Schéma : un paquet émis est capturé avant le calcul de son checksum par la carte réseau, alors qu'un paquet reçu est capturé avec son checksum réel.`,
        cargo_test: `Capture du terminal : résultat de cargo test, avec tous les tests réussis.`,
        insertion_replay: `Deux captures du terminal côte à côte : sans vérification des checksums, le faux message s'affiche ; avec, le faux paquet est ignoré et le vrai message s'affiche.`,
        ci_cd: `Schéma du pipeline CI/CD : un push lance les tests ; une étiquette de version lance les tests sur PC et sur ARM, puis compile et publie les binaires avec leur empreinte SHA-256.`,
        release: `Capture d'une page de release GitHub, avec les binaires des deux architectures et leurs empreintes.`,
    },
};

export const RNIFLER_TEXTS = { en, fr };