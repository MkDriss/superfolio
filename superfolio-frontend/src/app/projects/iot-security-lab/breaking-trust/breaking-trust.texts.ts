// Textes de la page " IoT Security Lab - Breaking Trust " (Volet 1 : Offensif).
// Bilingue FR / EN, sur le modele de rnifler.texts.ts.
// Le contenu technique s'appuie sur les fiches LAB-STORY et les captures reelles
// du labo (IP, identifiants, messages du proxy).

const en = {
  ui: {
    back: "My projects",
    related_projects: "Related projects"
  },

  header: {
    category: `Category`,
    type: `Type`,
    technologies: `Technologies`,
    github: `View on Github`,
  },

  hero: {
    title: `IoT Security Lab - Part 1: Offensive`,
    lead: `An isolated IoT lab, built from the ground up, and the offensive half of a two-part story. Here, "Breaking Trust": a campaign that runs across the lab end to end. Getting onto the network, mapping the devices, listening to the traffic, recovering a hard-coded identity, then stepping into the middle to hijack a physical device. Part 2, "Rebuilding Trust", puts back what this one takes apart.`,
    thesis: `The thread is one sentence: in IoT, being on the network is enough to compromise everything. Every flaw along the way shows why trust should not rest on network location, but on a proven identity. It is the problem that IAM solves, and the subject of Part 2.`,
    legal:
    {
      title: "Legal framework",
      text: `Every attack described here was carried out solely on my own isolated lab, which I own, for educational purposes. No device is exposed to the Internet.`
    },
  },

  cia: {
    title: 'Three devices, three pillars of security',
    intro: `The lab is not a random pile of devices. Each one is the archetype of a real category and carries a distinct class of vulnerability. Together, they cover the Confidentiality, Integrity and Availability triad. This is a design choice, meant to demonstrate threat-model reasoning rather than a collection of attacks.`,
    camera_title: 'Camera (ESP32-CAM)',
    camera_desc: `Archetype of IP cameras and video intercoms. Its stream is reachable without authentication: it threatens Confidentiality.`,
    sensor_title: 'Sensor (ESP32 + DHT22)',
    sensor_desc: `Archetype of home and industrial telemetry. Its readings travel in clear text with no proof of origin: it threatens Integrity (and Confidentiality).`,
    actuator_title: 'Actuator (ESP32 + LED/button)',
    actuator_desc: `Archetype of smart locks, relays and breakers. It obeys any order it receives, with a direct physical impact: it threatens Availability and Integrity.`,
  },

  lab: {
    title: 'The playground',
    intro: `Before breaking anything, I had to build. The lab brings together an OpenWrt router, a Raspberry Pi 4 hosting the Mosquitto MQTT broker, and three deliberately vulnerable ESP32 devices. Everything runs on a dedicated Wi-Fi network, "IoT-Lab" (192.168.50.0/24).`,
    segmentation_title: 'A network segmented by firewall zones',
    segmentation_desc: `The router does more than hand out Wi-Fi: its firewall sorts the network into zones and enforces a directional policy. The IoT zone cannot reach the trusted network (iot -> lan: blocked), but the trusted network can administer the devices (lan -> iot: allowed). The devices get only the bare minimum from the router, DHCP and DNS. This is defence in depth: a compromised device cannot spread to the rest.`,
    proof_caption: `Proof by test: from the IoT zone, the broker reaches neither the router nor the trusted network (100% loss). From the trusted network, the admin machine reaches the broker with no trouble (0% loss).`,
    vuln_note_title: `Embraced vulnerabilities`,
    vuln_note: `On the device side, the vulnerabilities are deliberate and documented: the Mosquitto 2.0 broker accepts anonymous, clear-text connections on port 1883, the camera stream opens with no password, and each device publishes or obeys without checking who is talking to it. These are not oversights, but the lab's study material.`,
  },

  act1: {
    kicker: 'Act I',
    title: 'Get in',
    intro: `The attacker starts outside, with no access at all. The network's only wall is the "IoT-Lab" Wi-Fi, protected by WPA2 with a shared password.`,
    what_title: 'What I did',
    what_desc: `I put the laptop's Wi-Fi card into monitor mode (Intel chipset, confirmed after checking the card supports it), located the IoT-Lab network and its channel with the aircrack-ng suite, then captured the WPA2 handshake. Rather than forcing a disconnection, I simply rebooted an ESP32: as it reconnects, it replays the handshake. All that was left was to crack it offline, by dictionary.`,
    result_caption_scan: `Locating the target: the IoT-Lab network identified by airodump-ng, with its BSSID and channel.`,
    result_caption_handshake: `The four EAPOL messages of the WPA2 handshake, captured and verified in Wireshark.`,
    result_caption_key: `The password recovered offline by aircrack-ng: a guessable passphrase (a "word + year" pattern).`,
    lesson_title: 'What it shows',
    lesson_desc: `A network protected by a single shared secret is only a perimeter, and a perimeter is worth no more than the strength of its secret. Because the WPA2 handshake allows passwords to be tested offline, without limit or detection, any guessable passphrase collapses. Network access should therefore never grant trust over the devices it contains. This is already zero-trust reasoning in embryo.`,
    owasp: 'OWASP IoT I1 - Weak, guessable, or hard-coded passwords',
  },

  act2: {
    kicker: 'Act II',
    title: 'Understand',
    intro: `Once on the network, everything is reachable. This act is about reconnaissance: seeing what is there, listening to what flows, and understanding how the devices are built.`,

    camera_title: 'The camera, turned against the lab',
    camera_desc: `The scan (above) reveals a device exposing a web server on port 80: the camera, at 192.168.50.217. I type its address into a browser and its video stream opens, with no password at all. Beyond leaking images, the stream becomes a reconnaissance tool: it shows the Raspberry Pi, the sensor and the actuator laid out on the workbench. In a factory or warehouse, this would be enough to scope the premises and pick which device to tamper with physically. Here, we will extract the firmware from the actuator.`,
    camera_caption: `Direct access to the camera stream: just enter its IP address and start the stream, no authentication.`,
    camera_owasp: 'OWASP IoT I6 / I3 - Insufficient privacy protection, unauthenticated interface',

    map_title: 'Mapping with rmap',
    map_desc: `My port scanner, rmap (written in Rust), reduces a 256-address /24 to the handful of machines actually present, then lists their ports. It distinguishes three states: open, closed, filtered. The result draws the lab's map: the router, the broker (ports 22 and 1883), the camera (port 80), and the two other ESP32s.`,
    map_caption: `rmap scan of the network: five live machines, and the broker exposing its MQTT port 1883 in clear text.`,
    map_link_intro: `rmap is a standalone project, documented and published separately.`,
    map_owasp: 'OWASP IoT I2 - Insecure network services (revealed, not yet exploited)',

    listen_title: 'Listening with rnifler',
    listen_desc: `With the broker speaking in clear text, it is enough to listen. My sniffer rnifler (also in Rust) captures, reassembles and decodes the lab's MQTT traffic: sensor readings, actuator states, even the credentials of a connection, all readable to anyone watching the network. A visibility tool built for defence shows here, from an observer's side, just how much leaks without encryption.`,
    listen_caption: `rnifler decodes the lab's MQTT traffic in clear text, message by message.`,
    listen_link_intro: `rnifler is also a standalone project, with its own detailed page`,
    listen_owasp: 'OWASP IoT I7 / I9 - Insecure data transfer, insecure default settings',

    reverse_title: 'Analysing the firmware with Ghidra',
    reverse_desc: `That leaves the most interesting device to understand: the actuator (192.168.50.223). Physical access to the serial port is enough to extract its entire flash memory with esptool (as neither flash encryption nor Secure Boot is present). A simple strings pass already surfaces its identity in clear text. Ghidra confirms and completes the picture by reconstructing, inside the connection routine, the whole configuration: the client ID actionneur1, the broker address 192.168.50.182, and the topics labo/actionneur/commande and labo/actionneur/etat.`,
    reverse_caption_dump: `Full extraction of the actuator's flash memory with esptool, over the serial port.`,
    reverse_caption_ghidra: `In Ghidra, the client ID actionneur1 and its cross-references, at the heart of the MQTT connection routine.`,
    reverse_caption_usage: `The connection routine itself: the client ID is loaded right next to the hard-coded broker address.`,
    reverse_lesson: `Reading the flash yields more than an identifier: it yields everything needed to connect in the device's place, the broker address, the port, the topics. An identity based on a copyable string, on a service that verifies nothing, is not an identity: it is a label. That stolen label will be replayed in the next act.`,
    reverse_owasp: 'OWASP IoT I10 / I2 - Lack of physical hardening, insecure network service',
    reverse_note_title: `Technical point - I10/I2 instead of I1`,
    reverse_note: `Note: the client ID is deliberately classed as I10/I2 rather than I1. A client ID is not an authentication secret. The problem is not that it is "weak", but that it is extractable and accepted as-is by an anonymous broker.`,
  },

  act3: {
    kicker: 'Act III',
    title: 'Hijack',
    intro: `Knowing what flows is not enough to change it. This act shows a rise in sophistication across three tiers: first inject false messages, then alter the real traffic, finally decouple reality entirely from what the supervision sees.`,

    insertion_title: 'Tier 1 - Inject (simple insertion)',
    insertion_desc: `The broker requires no identity: being connected is enough to publish. A plain mosquitto_pub, indistinguishable from the owner's, sends a false "OFF" to the actuator or a false reading to the sensor. In the actuator video, a false "ON" lights the LED and the broker dutifully shows the new state. In the sensor one, a temperature is replaced by "PWND". Flow: attacker -> broker -> device.`,
    insertion_caption: `Insertion on an anonymous broker: the attacker's order is accepted like any legitimate one.`,
    insertion_label_actuator: 'Actuator',
    insertion_label_sensor: 'Sensor',

    onpath_title: 'Tier 2 - Get in position (ARP spoofing)',
    onpath_desc: `Injecting messages does not let you alter other people's: for that, you must be on the path. My ARP poisoning script (Python / scapy) makes the sensor and the broker each believe the attacker is the other, and relays traffic to stay transparent. The causality is blatant: rnifler, run on the attacker's side, shows nothing and then, the moment poisoning starts, the sensor's traffic appears, picked up mid-stream. It stops dead when the spoof stops.`,
    onpath_caption: `Before poisoning, the attacker sees none of the traffic between sensor and broker. During, everything passes through them.`,
    onpath_lesson: `Being on the network is not enough to see the traffic exchanged between two other hosts: you need a position. ARP authenticates nothing, so an ARP cache can be overwritten, and interception becomes trivial on an unprotected segment.`,
    onpath_nftables_label: `Technical point - relaying without cutting the traffic`,
    onpath_nftables: `Getting in the middle is not enough: you still have to relay the traffic to stay transparent. Enabling routing with "net.ipv4.ip_forward=1" does not suffice on a recent distribution, because the nftables FORWARD chain defaults to a "drop" policy (reinforced by firewalld and by Docker). The transit between the sensor and the broker must therefore be allowed explicitly, otherwise the ARP poisoning cuts the communication instead of intercepting it, which gives the attack away at once.`,
    onpath_callout_label: `The common thread comes full circle`,
    onpath_handshake_link: `A detail that closes the loop: the device now under surveillance (192.168.50.165) is exactly the sensor whose reboot had yielded the Wi-Fi handshake in Act I. The same device opened the door, then became the first one spied on.`,

    alter_title: 'Tier 3a - Alter the real traffic',
    alter_desc: `From this position, you no longer merely inject: you rewrite. The simplest alteration happens in flight, but it runs into a TCP constraint: you cannot change the payload length. Turning "OFF" into "ON" (three characters versus two) fails for that reason: the proxy reports "31 bytes in -> 30 out". The way past is a transparent proxy that terminates the connection and opens a fresh one to the broker. Since each TCP stack manages its own sequence numbers, length becomes free again.`,
    alter_caption: `The proxy rewrites the command in transit: "OFF" becomes "ON", and the LED lights up against the order that was sent.`,
    alter_proxy_label: `Technical point - recovering the real destination`,
    alter_proxy: `The transparent proxy relies on a redirection rule (REDIRECT) that diverts the device's connection to a local listener. The catch: the device thought it was talking to the broker, but the local socket no longer knows which address it was heading for. The proxy recovers that original destination through the "SO_ORIGINAL_DST" socket option, then opens its own connection to the real broker. It now holds both ends, and because each connection has its own TCP stack, it can change the payload length at will.`,

    blind_title: 'Tier 3b - Blind the supervision',
    blind_desc: `The full proxy strikes in both directions at once: it rewrites the command (broker -> device) and freezes the reported state (device -> broker). The result is a complete decoupling of physical reality from supervision: the LED is green, but the broker and so the operator permanently show "OFF". The client ID stolen in Act II is reused to stay undetectable at the application layer. This is the attack model of industrial systems, where you act on the world while reporting a normal state.`,
    blind_flow: `Flow: controller -> broker <-> attacker <-> device.`,
    blind_caption: `Reality / supervision decoupling: the proxy freezes the state at "OFF" while the LED actually obeys.`,
    blind_retain_label: `Technical point - why the illusion lasts`,
    blind_retain: `The actuator publishes its state with the "retain" flag set. The broker therefore keeps the last state it received and serves it to every new subscriber as soon as it connects. By freezing that retained state on "OFF", the proxy does not only fool the supervision at the moment of the attack: any console that connects afterwards also reads a lying "OFF", with no fresh message required.`,
    blind_lesson: `Altering the command attacks the action. Altering the state attacks the supervision. Combined, the two make the device act without the operator's knowledge, while reporting a falsified state. Once the attacker is on the path, the lack of encryption and authenticity makes the whole MQTT bus manipulable.`,
    act3_owasp: 'OWASP IoT I7 / I2 - Clear-text data open to tampering, network service without authentication',
    restore_lab_label: `Restoration of the lab`,
    restore_note: `After each attack, the lab is returned to its initial state: the proxy is stopped, the redirect rules removed, poisoning stopped with the ARP caches restored.`,
  },

  tools: {
    title: 'The tooling: hand-coded, or standard',
    intro: `The project's philosophy is to re-implement the logic in order to understand it, rather than bolt together ready-made tools. The distinction is deliberate and explicit.`,
    handmade_title: 'Hand-coded',
    standard_title: 'Standard tools (used as-is)',
    handmade: [
      { name: 'rmap', role: 'TCP port scanner (Rust), standalone project', linked: true },
      { name: 'rnifler', role: 'Defensive MQTT sniffer (Rust), standalone project', linked: true },
      { name: 'MITM proxy', role: 'Transparent TCP proxy and in-flight alteration (Python)', linked: false },
      { name: 'ARP spoofer', role: 'ARP cache poisoning (Python/scapy)', linked: false },
    ],
    standard: [
      { name: 'Ghidra', role: 'Static firmware analysis (Xtensa architecture)' },
      { name: 'aircrack-ng', role: 'WPA2 handshake capture and cracking' },
      { name: 'scapy', role: 'ARP packet crafting, readable and teachable' },
    ],
    note: `Re-implementing a WPA2 cracker or a disassembler would miss the point: the value is in understanding the chain, not in rewriting mature tools. Conversely, the scanner, the sniffer and the proxy were hand-written, because that is where the fine-grained understanding of the network is won.`,
  },

  summary: {
    title: 'What the lab demonstrates',
    body: `The full chain: get in, map, listen, analyse, get in position, hijack. It covers the three pillars of security across three devices chosen for exactly that. One flaw ties them all together: implicit trust. The devices trust whoever speaks on the network, the broker trusts whoever connects, the actuator trusts every order received. Identity and connectivity are conflated, when the first should be proven and the second should grant nothing. That is precisely what the IAM layer sets out to separate.`,
  },

  next: {
    title: 'What comes next ? Rebuilding Trust',
    body: `Part 2 rebuilds trust on verifiable ground: every message authenticated by mTLS, one certificate-based identity per device, short-lived tokens, and revocation triggered automatically by an intrusion detection system. The demonstration will come down to a before / after comparison: the false "OFF" that hijacks the actuator today will simply be rejected. Copying a firmware will no longer be enough to impersonate a device, because its private key would be required.`,
    link: 'Read Part 2 - Rebuilding Trust',
  },

  references: {
    title: 'References',
    owasp_iot: { name: 'OWASP Internet of Things - IoT Top 10 (2018)', url: 'https://owasp.org/www-project-internet-of-things/' },
    owasp_top_10_2018_final_pdf: { name: 'OWASP IoT Top 10 2018 - reference document (PDF)', url: 'https://owasp.org/www-pdf-archive/OWASP-IoT-Top-10-2018-final.pdf' },
    mqtt: { name: 'MQTT 3.1.1 specification (OASIS) - section 3.1.4, unique client identifier', url: 'http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html' },
    mosquitto: { name: 'Mosquitto - Migrating to version 2.0 (listener, allow_anonymous)', url: 'https://mosquitto.org/documentation/migrating-to-2-0/' },
    openwrt: { name: 'OpenWrt - Firewall configuration (zones, policies)', url: 'https://openwrt.org/docs/guide-user/firewall/firewall_configuration' },
  },

  alts: {
    kill_chain: `Diagram of the five-link attack chain: Wi-Fi crack, rmap mapping, rnifler listening, Ghidra analysis, MITM hijack, leading to the hijacked actuator, the falsified sensor and the blinded supervision.`,
    architecture: `Diagram of the lab: the OpenWrt router separates the IoT zone (broker and three ESP32 devices) from the trusted network. Traffic from the IoT zone to the trusted network is blocked.`,
    lab_photo: `Overview of the lab: two ESP32 boards on a breadboard, the ESP32-CAM, the Raspberry Pi and a battery pack, laid out on a workbench.`,
    isolation_proof: `Two side-by-side terminals: from the broker, pings to the router and the trusted network fail at 100%. From the admin machine, the ping to the broker succeeds at 100%.`,
    isolation_rules: `Output of the router's firewall rules showing the lan and iot zones and their reject-forwarding policy.`,
    wifi_scan: `airodump-ng output with the IoT-Lab network highlighted: its network identifier (BSSID), channel and WPA2 encryption.`,
    handshake: `Wireshark window showing the four EAPOL messages of the IoT-Lab WPA2 handshake.`,
    key_found: `aircrack-ng output showing "KEY FOUND" followed by the network password.`,
    camera_video: `Screenshot of a browser showing the camera's video stream after entering its IP address, with no authentication.`,
    rmap_scan: `Output of the rmap scanner listing five live machines and their open ports, including the broker on port 1883.`,
    rnifler_mqtt: `Terminal showing rnifler's output: the lab's MQTT messages decoded in clear text.`,
    dump: `Terminal showing esptool reading the ESP32's flash memory over the serial port.`,
    ghidra: `Ghidra window showing the string "actionneur1" and its cross-references in the disassembled firmware.`,
    ghidra_usage: `Ghidra window showing the client ID loaded into the MQTT connection routine, next to the hard-coded broker address.`,
    strings_clientid: `Output of the strings command on the firmware, surfacing in clear text the client ID, the topics and the broker address.`,
    insertion_actuator: `Video: the attacker publishes a false "ON" then "OFF" on the command topic. The actuator's LED obeys and the broker shows the new state.`,
    insertion_sensor: `Video: the attacker publishes "PWND" on the sensor's temperature topic. The false value appears on the broker side.`,
    onpath: `Video: rnifler shows nothing until ARP poisoning starts, after which the sensor's traffic appears, then stops when the attack stops.`,
    alter: `Video: the proxy rewrites the "OFF" command to "ON" in transit. The LED lights up opposite to the order sent by the controller.`,
    blind: `Video: the actuator's LED actually changes state while the broker's supervision stays frozen on "OFF".`,
    schema_mitm: `Diagram: before poisoning the attacker is off the path. After, all traffic between the device and the broker passes through them.`,
    schema_proxy: `Diagram comparing in-flight alteration, limited by a fixed packet length, with the transparent proxy that frees the length by reopening the connection.`,
  },
};

const fr: typeof en = {
  ui: {
    back: "Mes projets",
    related_projects: "Projets liés"
  },
  header: {
    category: `Catégorie`,
    type: `Type`,
    technologies: `Technologies`,
    github: `Voir sur GitHub`,
  },
  hero: {
    title: 'Labo de sécurité IoT - Volet 1 : Offensif',
    lead: `Un laboratoire IoT isolé, construit de A à Z, et le versant offensif d'un récit en deux volets. Ici, "Breaking Trust" : une campagne qui traverse le labo de bout en bout. Entrer sur le réseau, cartographier les objets, écouter le trafic, retrouver une identité codée en dur, puis se placer au milieu pour détourner un objet physique. Le Volet 2, "Rebuilding Trust", remet ce que celui-ci défait.`,
    thesis: `Le fil conducteur tient en une phrase : dans l'IoT, être sur le réseau suffit à tout compromettre. Chaque faille rencontrée illustre pourquoi la confiance ne devrait pas reposer sur la position réseau, mais sur une identité prouvée. C'est le problème que l'IAM résout, et l'objet du Volet 2.`,
    legal: {
      title: "Cadre légal",
      text: `Toutes les attaques décrites ont été menées uniquement sur mon propre laboratoire isolé, dont je suis propriétaire, à des fins pédagogiques. Aucun objet n'est exposé à Internet.`,
    },
  },

  cia: {
    title: 'Trois objets, trois piliers de la sécurité',
    intro: `Le labo n'est pas un assemblage d'objets au hasard. Chaque objet est l'archétype d'une catégorie réelle et porte une classe de vulnérabilité distincte. Ensemble, ils couvrent la triade Confidentialité, Intégrité et Disponibilité. C'est un choix d'architecture, pour démontrer un raisonnement par modèle de menaces plutôt qu'une collection d'attaques.`,
    camera_title: 'Caméra (ESP32-CAM)',
    camera_desc: `Archétype des caméras IP et interphones vidéo. Son flux est accessible sans authentification : elle menace la Confidentialité.`,
    sensor_title: 'Capteur (ESP32 + DHT22)',
    sensor_desc: `Archétype de la télémétrie domotique et industrielle. Ses mesures circulent en clair et sans preuve d'origine : elle menace l'Intégrité (et la Confidentialité).`,
    actuator_title: 'Actionneur (ESP32 + LED/bouton)',
    actuator_desc: `Archétype des serrures, relais et disjoncteurs. Il obéit à tout ordre reçu, avec un impact physique direct : il menace la Disponibilité et l'Intégrité.`,
  },

  lab: {
    title: 'Le terrain de jeu',
    intro: `Avant de casser quoi que ce soit, il a fallu construire. Le labo réunit un routeur OpenWrt, un Raspberry Pi 4 qui héberge le broker MQTT Mosquitto, et trois objets ESP32 volontairement vulnérables. Tout tient sur un réseau Wi-Fi dédié, "IoT-Lab" (192.168.50.0/24).`,
    segmentation_title: 'Un réseau segmenté par zones de pare-feu',
    segmentation_desc: `Le routeur ne se contente pas de distribuer le Wi-Fi : son pare-feu range le réseau en zones et applique une politique directionnelle. La zone IoT ne peut pas atteindre le réseau de confiance (iot -> lan : bloqué), mais le réseau de confiance peut administrer les objets (lan -> iot : autorisé). Les objets n'obtiennent du routeur que le strict nécessaire, DHCP et DNS. C'est de la défense en profondeur : un objet compromis ne contamine pas le reste.`,
    proof_caption: `La preuve par le test : depuis la zone IoT, le broker n'atteint ni le routeur ni le réseau de confiance (100 % de perte). Depuis le réseau de confiance, le poste d'administration joint le broker sans problème (0 % de perte).`,
    vuln_note_title: `Vulnérabilités assumées`,
    vuln_note: `Côté objets, les vulnérabilités sont assumées et documentées : le broker Mosquitto 2.0 accepte les connexions anonymes en clair sur le port 1883, le flux de la caméra s'ouvre sans mot de passe, et chaque objet publie ou obéit sans vérifier qui lui parle. Ce ne sont pas des oublis, mais la matière d'étude du labo.`,
  },

  act1: {
    kicker: 'Acte I',
    title: 'Entrer',
    intro: `L'attaquant part de l'extérieur, sans aucun accès. Le seul rempart du réseau est le Wi-Fi "IoT-Lab", protégé en WPA2 par un mot de passe partagé.`,
    what_title: 'Ce que j\'ai fait',
    what_desc: `J'ai mis la carte Wi-Fi du portable en mode monitor (chipset Intel, validé après vérification que la carte supporte ce mode), repéré le réseau IoT-Lab et son canal avec la suite aircrack-ng, puis capturé le handshake WPA2. Plutôt que de forcer une déconnexion, j'ai simplement redémarré un ESP32 : en se reconnectant, il rejoue le handshake. Il ne restait plus qu'à le casser hors ligne, par dictionnaire.`,
    result_caption_scan: `Repérage de la cible : le réseau IoT-Lab identifié par airodump-ng, avec son BSSID et son canal.`,
    result_caption_handshake: `Les quatre messages EAPOL du handshake WPA2 capturés et vérifiés dans Wireshark.`,
    result_caption_key: `Le mot de passe retrouvé hors ligne par aircrack-ng : une passphrase devinable (motif "mot + année").`,
    lesson_title: 'Ce que ça démontre',
    lesson_desc: `Un réseau protégé par un unique secret partagé n'est qu'un périmètre, et un périmètre ne vaut que la force de son secret. Comme le handshake WPA2 permet de tester les mots de passe hors ligne, sans limite ni détection, toute passphrase devinable s'effondre. L'accès au réseau ne devrait donc jamais valoir confiance sur les objets qu'il contient. C'est déjà un germe du raisonnement zero-trust.`,
    owasp: 'OWASP IoT I1 - Mots de passe faibles, devinables ou codés en dur',
  },

  act2: {
    kicker: 'Acte II',
    title: 'Comprendre',
    intro: `Une fois sur le réseau, tout devient atteignable. Cet acte est celui de la reconnaissance : voir ce qui est là, écouter ce qui circule, et comprendre comment les objets sont faits.`,

    camera_title: 'La caméra, retournée contre le labo',
    camera_desc: `Le scan (ci-dessus) révèle un objet qui expose un serveur web sur le port 80 : la caméra, à l'adresse 192.168.50.217. Je tape son adresse dans un navigateur et son flux vidéo s'ouvre, sans le moindre mot de passe. Au-delà de la fuite d'image, le flux devient un outil de reconnaissance : on y voit le Raspberry Pi, le capteur et l'actionneur posés sur le plan de travail. Dans une usine ou un entrepôt, ce serait de quoi repérer les lieux et choisir quel objet aller manipuler physiquement. Ici, c'est l'actionneur dont on va extraire le firmware.`,
    camera_caption: `Accès direct au flux de la caméra : il suffit de saisir son adresse IP et de lancer le stream, sans authentification.`,
    camera_owasp: 'OWASP IoT I6 / I3 - Protection insuffisante de la vie privée, interface non authentifiée',

    map_title: 'Cartographier avec rmap',
    map_desc: `Mon scanner de ports, rmap (codé en Rust), réduit un /24 de 256 adresses à la poignée de machines réellement présentes, puis liste leurs ports. Il distingue trois états : ouvert, fermé, filtré. Le résultat dresse la carte du labo : le routeur, le broker (ports 22 et 1883), la caméra (port 80), et les deux autres ESP32.`,
    map_caption: `Scan rmap du réseau : cinq machines vivantes, et le broker qui expose son port MQTT 1883 en clair.`,
    map_link_intro: `rmap est un projet à part entière, documenté et publié séparément.`,
    map_owasp: 'OWASP IoT I2 - Services réseau non sécurisés (révélés, pas encore exploités)',

    listen_title: 'Écouter avec rnifler',
    listen_desc: `Le broker parlant en clair, il suffit d'écouter. Mon sniffer rnifler (également en Rust) capture, réassemble et décode le trafic MQTT du labo : mesures des capteurs, états de l'actionneur, et même les identifiants d'une connexion, tout est lisible pour qui observe le réseau. Un outil de visibilité conçu pour la défense montre ici, du côté d'un observateur, l'ampleur de ce qui fuite sans chiffrement.`,
    listen_caption: `rnifler décode en clair le trafic MQTT du labo, message par message.`,
    listen_link_intro: `rnifler est lui aussi un projet à part entière, avec sa propre page détaillée.`,
    listen_owasp: 'OWASP IoT I7 / I9 - Transfert de données non sécurisé, réglages par défaut non sécurisés',

    reverse_title: 'Analyser le firmware avec Ghidra',
    reverse_desc: `Reste à comprendre l'objet le plus intéressant : l'actionneur (192.168.50.223). Un accès physique au port série suffit à extraire toute sa mémoire flash avec esptool (ni chiffrement de flash ni Secure Boot présent). Une simple passe de strings fait déjà sortir son identité en clair. Ghidra confirme et complète en reconstituant, dans la routine de connexion, toute la configuration : l'identifiant client actionneur1, l'adresse du broker 192.168.50.182, et les topics labo/actionneur/commande et labo/actionneur/etat.`,
    reverse_caption_dump: `Extraction complète de la mémoire flash de l'actionneur avec esptool, par le port série.`,
    reverse_caption_ghidra: `Dans Ghidra, l'identifiant client actionneur1 et ses références croisées, au cœur de la routine de connexion MQTT.`,
    reverse_caption_usage: `La routine de connexion elle-même : l'identifiant client y est chargé juste à côté de l'adresse du broker, codée en dur.`,
    reverse_lesson: `Lire la flash ne donne pas qu'un identifiant : elle donne tout le nécessaire pour se brancher à la place de l'objet, l'adresse du broker, le port, les topics. Une identité fondée sur une chaîne copiable, sur un service qui ne vérifie rien, n'est pas une identité : c'est une étiquette. Cette étiquette volée sera rejouée à l'acte suivant.`,
    reverse_owasp: 'OWASP IoT I10 / I2 - Absence de durcissement physique, service réseau non sécurisé',
    reverse_note_title: `Point technique - I10/I2 plutôt que I1`,
    reverse_note: `Note : l'identifiant client est délibérément classé en I10/I2 plutôt qu'en I1. Un identifiant client n'est pas un secret d'authentification. Le problème n'est pas qu'il soit "faible", mais qu'il soit extractible et accepté tel quel par un broker anonyme.`,
  },

  act3: {
    kicker: 'Acte III',
    title: 'Détourner',
    intro: `Savoir ce qui circule ne suffit pas à le changer. Cet acte montre une montée en sophistication en trois paliers : d'abord injecter de faux messages, puis altérer le vrai trafic, enfin découpler totalement la réalité de ce que voit la supervision.`,

    insertion_title: 'Palier 1 - Injecter (insertion simple)',
    insertion_desc: `Le broker n'exige aucune identité : être connecté suffit à publier. Un simple mosquitto_pub, indiscernable de celui du propriétaire, envoie un faux "OFF" à l'actionneur ou une fausse mesure au capteur. Dans la vidéo de l'actionneur, un faux "ON" allume la LED et le broker affiche docilement le nouvel état. Dans celle du capteur, une température est remplacée par "PWND". Flux : attaquant -> broker -> objet.`,
    insertion_caption: `Insertion sur un broker anonyme : l'ordre de l'attaquant est accepté comme n'importe quel ordre légitime.`,
    insertion_label_actuator: 'Actionneur',
    insertion_label_sensor: 'Capteur',

    onpath_title: 'Palier 2 - Se placer (ARP spoofing)',
    onpath_desc: `Injecter des messages ne permet pas d'altérer ceux des autres : pour cela, il faut être sur le chemin. Mon script d'empoisonnement ARP (Python / scapy) fait croire au capteur et au broker que l'attaquant est l'autre, et relaie le trafic pour rester transparent. La causalité est flagrante : rnifler, lancé côté attaquant, n'affiche rien. Puis dès que l'empoisonnement démarre, le trafic du capteur apparaît, repris en cours de route. Il s'arrête net à l'arrêt du spoof.`,
    onpath_caption: `Avant l'empoisonnement, l'attaquant ne voit rien du trafic entre le capteur et le broker. Pendant, tout transite par lui.`,
    onpath_lesson: `Être sur le réseau ne suffit pas à voir le trafic échangé entre deux autres hôtes : il faut une position. ARP n'authentifie rien, donc un cache ARP s'écrase, et l'interception devient triviale sur un segment non protégé.`,
    onpath_nftables_label: `Point technique - relayer sans couper le trafic`,
    onpath_nftables: `Se mettre au milieu ne suffit pas : encore faut-il relayer le trafic pour rester transparent. Activer le routage avec "net.ipv4.ip_forward=1" ne suffit pas sur une distribution récente, car la chaîne FORWARD de nftables est en politique "drop" par défaut (renforcée par firewalld et par Docker). Il faut donc autoriser explicitement le transit entre le capteur et le broker, sinon l'empoisonnement ARP coupe la communication au lieu de l'intercepter, ce qui trahit aussitôt l'attaque.`,
    onpath_callout_label: "Le fil rouge se referme",
    onpath_handshake_link: `Détail qui boucle le scénario : l'objet ainsi mis sur écoute (192.168.50.165) est précisément le capteur dont le redémarrage avait livré le handshake Wi-Fi de l'Acte I. Le même objet nous a ouvert la porte, puis a été le premier espionné.`,

    alter_title: 'Palier 3a - Altérer le vrai trafic',
    alter_desc: `Depuis cette position, on ne se contente plus d'injecter : on réécrit. L'altération la plus simple se fait en vol, mais elle bute sur une contrainte de TCP : on ne peut pas changer la longueur du contenu. Transformer "OFF" en "ON" (trois caractères contre deux) échoue ainsi : le proxy affiche "31 octets reçus -> 30 émis". Le franchissement passe par un proxy transparent qui termine la connexion et en rouvre une propre vers le broker. Chaque pile TCP gère ainsi ses propres numéros de séquence : la longueur redevient libre.`,
    alter_caption: `Le proxy réécrit la commande en transit : "OFF" devient "ON", la LED s'allume à l'inverse de l'ordre émis.`,
    alter_proxy_label: `Point technique - retrouver la vraie destination`,
    alter_proxy: `Le proxy transparent repose sur une règle de redirection (REDIRECT) qui dévie la connexion de l'objet vers un listener local. Le piège : l'objet croyait parler au broker, mais le socket local ne sait plus vers quelle adresse il allait. Le proxy récupère cette destination d'origine grâce à l'option de socket "SO_ORIGINAL_DST", puis ouvre sa propre connexion vers le vrai broker. Il tient alors les deux bouts, et comme chaque connexion a sa propre pile TCP, il peut changer la longueur du contenu à volonté.`,

    blind_title: 'Palier 3b - Aveugler la supervision',
    blind_desc: `Le proxy complet frappe sur les deux sens à la fois : il réécrit la commande (broker -> objet) et fige l'état remonté (objet -> broker). Résultat : un découplage total entre la réalité physique et la supervision. La LED est verte, mais le broker, et donc l'opérateur, affiche "OFF" en permanence. L'identifiant client volé à l'Acte II est réutilisé pour rester indétectable au niveau applicatif. C'est le modèle d'attaque des systèmes industriels, où l'on agit sur le monde tout en rapportant un état normal.`,
    blind_flow: `Flux : contrôleur -> broker <-> attaquant <-> objet.`,
    blind_caption: `Découplage réalité / supervision : le proxy fige l'état à "OFF" tandis que la LED, elle, obéit vraiment.`,
    blind_retain_label: `Point technique - pourquoi l'illusion tient dans la durée`,
    blind_retain: `L'actionneur publie son état avec le drapeau "retain" activé. Le broker conserve donc le dernier état reçu et le sert à tout nouvel abonné dès sa connexion. En figeant cet état retenu sur "OFF", le proxy ne trompe pas seulement la supervision à l'instant de l'attaque : toute console qui se connecte ensuite lit elle aussi un "OFF" mensonger, sans qu'aucun message frais ne soit nécessaire.`,
    blind_lesson: `Altérer la commande attaque l'action. Altérer l'état attaque la supervision. Combinées, les deux font agir l'objet à l'insu de l'opérateur, tout en lui rapportant un état falsifié. Une fois l'attaquant sur le chemin, l'absence de chiffrement et d'authenticité rend l'ensemble du bus MQTT manipulable.`,
    act3_owasp: 'OWASP IoT I7 / I2 - Données en clair manipulables, service réseau sans authentification',
    restore_lab_label: `Remise en état du labo`,
    restore_note: `Après chaque attaque, le labo est remis dans son état initial : arrêt du proxy, retrait des règles de redirection, arrêt de l'empoisonnement avec restauration des caches ARP.`,
  },

  tools: {
    title: 'L\'outillage : codé à la main, ou standard',
    intro: `La philosophie du projet est de recoder la logique pour la comprendre, plutôt que d'assembler des outils tout faits. La distinction est assumée et explicite.`,
    handmade_title: 'Codé à la main',
    standard_title: 'Outils standards (utilisés tels quels)',
    handmade: [
      { name: 'rmap', role: 'Scanner de ports TCP (Rust), projet à part entière', linked: true },
      { name: 'rnifler', role: 'Sniffer MQTT défensif (Rust), projet à part entière', linked: true },
      { name: 'Proxy MITM', role: 'Proxy TCP transparent et altération en vol (Python)', linked: false },
      { name: 'Spoofer ARP', role: 'Empoisonnement de caches ARP (Python / scapy)', linked: false },
    ],
    standard: [
      { name: 'Ghidra', role: 'Analyse statique du firmware (architecture Xtensa)' },
      { name: 'aircrack-ng', role: 'Capture et crack du handshake WPA2' },
      { name: 'scapy', role: 'Forge de paquets ARP, lisible et pédagogique' },
    ],
    note: `Recoder un cracker WPA2 ou un désassembleur serait hors sujet : la valeur est dans la compréhension de la chaîne, pas dans la réécriture d'outils matures. À l'inverse, le scanner, le sniffer et le proxy ont été écrits à la main, parce que c'est là que se joue la compréhension fine du réseau.`,
  },

  summary: {
    title: 'Ce que le labo démontre',
    body: `La chaîne complète : entrer, cartographier, écouter, analyser, se placer, détourner. Elle couvre les trois piliers de la sécurité sur trois objets choisis pour cela. Un même défaut les relie tous : la confiance implicite. Les objets font confiance à quiconque parle sur le réseau, le broker à quiconque s'y connecte, l'actionneur à tout ordre reçu. Identité et connectivité sont confondues, alors que la première devrait être prouvée et la seconde ne rien accorder. C'est précisément ce que la couche IAM vient dissocier.`,
  },

  next: {
    title: 'Et après ? Rebuilding Trust',
    body: `Le Volet 2 reconstruit la confiance sur des bases vérifiables : chaque message authentifié par mTLS, une identité par certificat et par objet, des jetons de courte durée, et une révocation déclenchée automatiquement par un système de détection d'intrusion. La démonstration tiendra en une comparaison avant / après : le faux "OFF" qui détourne aujourd'hui l'actionneur sera purement et simplement rejeté. Copier un firmware ne donnera plus de quoi usurper un objet, car il faudrait sa clé privée.`,
    link: 'Lire le Volet 2 - Rebuilding Trust',
  },

  references: {
    title: 'Références',
    owasp_iot: { name: 'OWASP Internet of Things - IoT Top 10 (2018)', url: 'https://owasp.org/www-project-internet-of-things/' },
    owasp_top_10_2018_final_pdf: { name: 'OWASP IoT Top 10 2018 - document de référence (PDF)', url: 'https://owasp.org/www-pdf-archive/OWASP-IoT-Top-10-2018-final.pdf' },
    mqtt: { name: 'Spécification MQTT 3.1.1 (OASIS) - section 3.1.4, identifiant client unique', url: 'http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html' },
    mosquitto: { name: 'Mosquitto - Migration vers la version 2.0 (listener, allow_anonymous)', url: 'https://mosquitto.org/documentation/migrating-to-2-0/' },
    openwrt: { name: 'OpenWrt - Configuration du pare-feu (zones, politiques)', url: 'https://openwrt.org/docs/guide-user/firewall/firewall_configuration' },
  },

  alts: {
    kill_chain: `Schéma de la chaîne d'attaque en cinq maillons : crack Wi-Fi, cartographie rmap, écoute rnifler, analyse Ghidra, détournement MITM, menant à l'actionneur détourné, au capteur falsifié et à la supervision aveuglée.`,
    architecture: `Schéma du labo : le routeur OpenWrt sépare la zone IoT (broker et trois objets ESP32) du réseau de confiance. Le flux de la zone IoT vers le réseau de confiance est bloqué.`,
    lab_photo: `Vue d'ensemble du laboratoire : deux ESP32 sur plaque d'essai, l'ESP32-CAM, le Raspberry Pi et une batterie, posés sur un plan de travail.`,
    isolation_proof: `Deux terminaux côte à côte : depuis le broker, les pings vers le routeur et le réseau de confiance échouent à 100 %. Depuis le poste d'administration, le ping vers le broker réussit à 100 %.`,
    isolation_rules: `Sortie des règles de pare-feu du routeur montrant les zones lan et iot et leur politique de rejet du transfert.`,
    wifi_scan: `Sortie d'airodump-ng avec le réseau IoT-Lab surligné : son identifiant réseau (BSSID), son canal et son chiffrement WPA2.`,
    handshake: `Fenêtre Wireshark affichant les quatre messages EAPOL du handshake WPA2 du réseau IoT-Lab.`,
    key_found: `Sortie d'aircrack-ng affichant "KEY FOUND" suivi du mot de passe du réseau.`,
    camera_video: `Capture d'écran d'un navigateur affichant le flux vidéo de la caméra après saisie de son adresse IP, sans authentification.`,
    rmap_scan: `Sortie du scanner rmap listant cinq machines vivantes et leurs ports ouverts, dont le broker sur le port 1883.`,
    rnifler_mqtt: `Terminal affichant la sortie de rnifler : des messages MQTT du labo décodés en clair.`,
    dump: `Terminal affichant esptool en train de lire la mémoire flash de l'ESP32 par le port série.`,
    ghidra: `Fenêtre Ghidra montrant la chaîne "actionneur1" et ses références croisées dans le firmware désassemblé.`,
    ghidra_usage: `Fenêtre Ghidra montrant l'identifiant client chargé dans la routine de connexion MQTT, à côté de l'adresse du broker codée en dur.`,
    strings_clientid: `Sortie de la commande strings sur le firmware, faisant apparaître en clair l'identifiant client, les topics et l'adresse du broker.`,
    insertion_actuator: `Vidéo : l'attaquant publie un faux "ON" puis "OFF" sur le topic de commande. La LED de l'actionneur obéit et le broker affiche le nouvel état.`,
    insertion_sensor: `Vidéo : l'attaquant publie "PWND" sur le topic de température du capteur. La fausse valeur apparaît côté broker.`,
    onpath: `Vidéo : rnifler n'affiche rien jusqu'au lancement de l'empoisonnement ARP, après quoi le trafic du capteur apparaît, puis s'arrête à l'arrêt de l'attaque.`,
    alter: `Vidéo : le proxy réécrit en transit la commande "OFF" en "ON". La LED s'allume à l'opposé de l'ordre émis par le contrôleur.`,
    blind: `Vidéo : la LED de l'actionneur change réellement d'état tandis que la supervision du broker reste figée sur "OFF".`,
    schema_mitm: `Schéma : avant l'empoisonnement l'attaquant est à l'écart du chemin. Après, tout le trafic entre l'objet et le broker transite par lui.`,
    schema_proxy: `Schéma comparant l'altération en vol, bridée par une longueur de paquet figée, et le proxy transparent qui, en rouvrant la connexion, libère la longueur.`,
  },
};

export const IOT_SECURITY_LAB_TEXTS = { en, fr };