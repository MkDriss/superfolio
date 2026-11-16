import { Component, computed, inject } from '@angular/core';
import { BREAKING_TRUST } from './breaking-trust.project';
import { Router } from '@angular/router';
import { PictureLightbox } from '../../../components/picture-lightbox/picture-lightbox';
import { ProjectCard } from '../../../components/project-card/project-card';
import { GalleryPicture, ProjectGallery } from '../../../components/project-gallery/project-gallery';
import { ProjectPopUp } from '../../../components/project-pop-up/project-pop-up';
import { GalleryVideo, VideoGallery } from '../../../components/video-gallery/video-gallery';
import { RevealDirective } from '../../../directives/reveal.directive';
import { Project, PROJECT_CATEGORY_LABELS, PROJECT_TYPE_LABELS } from '../../../model/project.model';
import { LanguageService } from '../../../services/language-service/language';
import { RMAP } from '../../rmap/rmap.project';
import { RNIFLER } from '../../rnifler/rnifler.project';
import { IOT_SECURITY_LAB_TEXTS } from './breaking-trust.texts';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BannerCircuit } from '../../../components/banner-circuit/banner-circuit';


const PICTURES_PATH = 'projects/iot-security-lab/breaking-trust/pictures/';
const VIDEOS_PATH = 'projects/iot-security-lab/breaking-trust/videos/';
const POSTER_PATH = 'projects/iot-security-lab/breaking-trust/videos/posters/'
const SCHEMAS_PATH = 'projects/iot-security-lab/breaking-trust/schemas/';

const picture = (file: string, alt: string): GalleryPicture => ({ src: PICTURES_PATH + file, alt });

// Schéma : une version par langue, par exemple schema-kill-chain.fr.png et .en.png.
const schema = (name: string, lang: string, alt: string): GalleryPicture =>
    ({ src: `${SCHEMAS_PATH}${name}.${lang}.png`, alt });

// Vidéo : src obligatoire, poster optionnel (sinon tuile de repli), label d'onglet
// utile seulement dans une galerie à plusieurs vidéos.
const video = (file: string, alt: string, opts: { label?: string; poster?: string } = {}): GalleryVideo =>
    ({ src: VIDEOS_PATH + file, alt, label: opts.label, poster: opts.poster ? POSTER_PATH + opts.poster : undefined });


@Component({
    selector: 'app-iot-security-lab-breaking-trust',
    imports: [RevealDirective, ProjectPopUp, PictureLightbox, ProjectCard, ProjectGallery, VideoGallery, BannerCircuit],
    templateUrl: './breaking-trust.html',
    styleUrl: './breaking-trust.scss',
})
export class BreakingTrust {

    public readonly breaking_trust: Project = BREAKING_TRUST;
    private readonly router: Router = inject(Router);

    public readonly other_projects = [RMAP, RNIFLER];

    public readonly project_id_rmap = RMAP.id;
    public readonly project_id_rnifler = RNIFLER.id;

    public readonly PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_LABELS;
    public readonly PROJECT_TYPE_LABELS = PROJECT_TYPE_LABELS;

    private readonly sanitizer: DomSanitizer = inject(DomSanitizer);


    // ---------- Langue ----------

    public readonly language = inject(LanguageService);

    /** Les textes de la page dans la langue affichée. */
    public readonly texts = computed(() => IOT_SECURITY_LAB_TEXTS[this.language.lang()]);

    // ---------- Galeries d'images : une liste par endroit de la page ----------
    // computed : les textes alternatifs et les schémas changent avec la langue,
    // les captures du terminal restent les mêmes.

    public readonly pictures = computed(() => {
        const alt = this.texts().alts;
        const lang = this.language.lang();
        return {
            kill_chain: [schema('schema-kill-chain', lang, alt.kill_chain)],
            architecture: [schema('schema-architecture-lab', lang, alt.architecture)],
            lab_photo: [picture('full-lab.jpg', alt.lab_photo)],
            isolation: [
                picture('isolation-proof.png', alt.isolation_proof),
                picture('isolation-firewall-rules.png', alt.isolation_rules),
            ],
            wifi: [
                picture('iot-lab-scan-highlight.png', alt.wifi_scan),
                picture('wireshark-eapol.png', alt.handshake),
                picture('key-found.png', alt.key_found),
            ],
            rmap: [picture('rmap-scan.png', alt.rmap_scan)],
            rnifler: [picture('rnifler-mqtt.png', alt.rnifler_mqtt)],
            reverse: [
                picture('dumping.png', alt.dump),
                picture('ghidra-clientId-found.png', alt.ghidra),
                picture('ghidra-clientId-usage.png', alt.ghidra_usage),
                picture('strings-clientId.png', alt.strings_clientid),
            ],
            schema_mitm: [schema('schema-mitm', lang, alt.schema_mitm)],
            schema_proxy: [schema('schema-proxy-transparent', lang, alt.schema_proxy)],
        };
    });

    // ---------- Galeries de vidéos ----------
    // L'insertion regroupe actionneur + capteur dans une galerie à deux onglets ;
    // les autres sont des vidéos seules (galerie à un élément, sans barre d'onglets).

    public readonly videos = computed(() => {
        const alt = this.texts().alts;
        const t = this.texts();
        return {
            camera: [video('camera-stream.mp4', alt.camera_video, { poster: 'camera-stream-poster.png'})],
            insertion: [
                video('insertion-actuator.mp4', alt.insertion_actuator, { poster: 'insertion-actuator-poster.png' }),
                video('insertion-sensor.mp4', alt.insertion_sensor, { poster: 'insertion-sensor-poster.png' }),
            ],
            onpath: [video('onpath-interception.mp4', alt.onpath, { poster: 'onpath-interception-poster.png' })],
            alter: [video('alteration-simple.mp4', alt.alter, { poster: 'alteration-simple-poster.png' })],
            blind: [video('supervision-blinded.mp4', alt.blind, { poster: 'supervision-blinded-poster.png' })],
        };
    });

    // ---------- Image affichée en grand (lightbox images uniquement) ----------
    // Les vidéos se lisent sur place, sans lightbox ni overlay.

    public selected_picture: GalleryPicture | null = null;

    public open_picture(picture: GalleryPicture): void {
        this.selected_picture = picture;
    }

    public close_picture(): void {
        this.selected_picture = null;
    }

    // ---------- Navigation ----------

    public home(): void {
        this.router.navigate(["/home"]);
    }

    public go_to_part_two(): void {
        this.router.navigate(["/",]);
    }

    // ---------- Pop-up des projets liés ----------

    public show_project_pop_up: boolean = false;

    public selected_project: Project | null = null;

    public open_project_pop_up(project_id: number) {
        const project: Project | undefined = this.other_projects.find(p => p.id === project_id);
        if (project) {
            this.selected_project = project;
            this.show_project_pop_up = true;
        } else {
            this.selected_project = null;
            this.show_project_pop_up = false;
            console.error("Failed to display project with id", project_id);
        }
    }

    public on_backdrop_click(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.close_project_pop_up();
        }
    }

    public close_project_pop_up() {
        this.show_project_pop_up = false;
        this.selected_project = null;
    }

    sanitizeSvg(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }

}
