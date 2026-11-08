import { rust } from "../../mocks/technology.mock";
import { ProjectCategory, ProjectType } from "../../model/project.model";

export const RNIFLER = {
    id: -1,
    name: "Rnifler",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "2026",
    project_ico: "/projects/rnifler/rnifler-logo-colored.png",
    overview_pictures: [
        "/projects/rnifler/rnifler-logo-colored.png",
        "/projects/rnifler/pictures/session-complete.png",
        "/projects/rnifler/pictures/usage-direct.png",
        "/projects/rnifler/pictures/capture-message-coupe.png",
        "/projects/rnifler/pictures/capture-insertion-avant-apres.png",
    ],
    description: {
        en: `rnifler, from « renifleur », the French word for « sniffer », is a defensive network sniffer written from scratch in Rust: it listens to the MQTT traffic of connected devices and decodes every message in plain text.

            It puts each TCP conversation back together, even when a message arrives in several pieces, then decodes it with a parser written by hand from the official specification, which explains every anomaly it finds.

            Since it reads data that may come from an attacker, it was designed to withstand booby-trapped packets: lying lengths, terminal injection, fake packets and memory exhaustion.

            Built as a standalone building block, it will serve as the foundation of the intrusion detection system of the IoT security lab I am building on my own 🔍`,

        fr: `rnifler, de « renifleur », la traduction française de « sniffer », est un sniffer réseau défensif écrit de zéro en Rust : il écoute le trafic MQTT des objets connectés et décode chaque message en clair.

            Il reconstitue chaque conversation TCP, même quand un message arrive en plusieurs morceaux, puis le décode grâce à un analyseur écrit à la main à partir de la spécification officielle, qui explique chaque anomalie qu'il rencontre.

            Comme il lit des données qui peuvent venir d'un attaquant, il a été pensé pour résister aux paquets piégés : longueurs mensongères, injection dans le terminal, faux paquets et épuisement de la mémoire.

            Conçu comme une brique indépendante, il servira de base au système de détection d'intrusion du labo de sécurité IoT que je construis moi-même 🔍`,
    },

    banner: "/projects/rnifler/banner.png",
    technologies: [rust],
    path: "rnifler",
};