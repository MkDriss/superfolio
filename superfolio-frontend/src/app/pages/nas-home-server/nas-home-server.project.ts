import { cloudflare, raspberry_pi, linux, docker } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";

export const NAS_HOME_SERVER = {
    id: -1,
    name: "NAS Home Server",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "",
    project_ico: "/projects/nas-home-server/nas-home-server.png",
    overview_pictures: ["/projects/nas-home-server/nas-home-server.png"],
    description: {
        en: `A home made and self-hosted NAS built from scratch around a Raspberry Pi.

            The hardware pairs two 6 TB NAS-grade drives in replication, for 6 TB of usable storage, with an NVMe M.2 SSD dedicated to running the services, so they stay fast and don't compete with the data drives.

            It runs on Raspberry Pi OS Lite, with Open Media Vault handling disk management. On top of the replication, dedicated backup protocols mean a failing drive doesn't mean lost data.

            Everything is deployed as containerized services with Docker, including a personal cloud, a Jellyfin media server and several others.

            On the security side, all traffic goes through a Cloudflare Tunnel, so no port is ever exposed on my home router.`,

        fr: `Un NAS fait maison et auto-hébergé, construit de zéro autour d'un Raspberry Pi.

            Le matériel associe deux disques de 6 To de qualité NAS en réplication, soit 6 To de stockage utile, à un SSD NVMe M.2 dédié aux services, pour qu'ils restent rapides et ne concurrencent pas les disques de données.

            Il tourne sous Raspberry Pi OS Lite, avec Open Media Vault pour la gestion des disques. En plus de la réplication, des protocoles de sauvegarde dédiés font qu'un disque défaillant ne signifie pas des données perdues.

            Tout est déployé sous forme de services conteneurisés avec Docker, dont un cloud personnel, un serveur multimédia Jellyfin et plusieurs autres.

            Côté sécurité, tout le trafic passe par un tunnel Cloudflare, si bien qu'aucun port n'est jamais exposé sur ma box.`,
    },
    banner: "",
    technologies: [
        cloudflare,
        raspberry_pi,
        linux,
        docker,
    ],
    path: "nas-home-server"
}