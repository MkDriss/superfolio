import { Component, computed, inject } from '@angular/core';
import { RNIFLER } from './rnifler.project';
import { Router } from '@angular/router';
import { Project, PROJECT_CATEGORY_LABELS, PROJECT_TYPE_LABELS } from '../../model/project.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RMAP } from '../rmap/rmap.project';
import { SECURITY_LAB_IOT_IAM } from '../security-lab-iot-iam/security-lab-iot.iam.project';
import { LanguageService } from '../../services/language-service/language';
import { RNIFLER_TEXTS } from './rnifler.texts';
import { GalleryPicture, ProjectGallery } from '../../components/project-gallery/project-gallery';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { RevealDirective } from '../../directives/reveal.directive';
import { PictureLightbox } from '../../components/picture-lightbox/picture-lightbox';
import { ProjectCard } from '../../components/project-card/project-card';


const PICTURES_PATH = 'projects/rnifler/pictures/';
const picture = (file: string, alt: string): GalleryPicture => ({ src: PICTURES_PATH + file, alt });

// Schéma : une version par langue, par exemple schema-trajet.fr.png et schema-trajet.en.png.
// Les captures du terminal, elles, n'existent qu'en une version (picture).
const schema = (name: string, lang: string, alt: string): GalleryPicture =>
  picture(`${name}.${lang}.png`, alt);


@Component({
  selector: 'app-rnifler',
  imports: [RevealDirective, ProjectPopUp, PictureLightbox, ProjectCard, ProjectGallery],
  templateUrl: './rnifler.html',
  styleUrl: './rnifler.scss',
})
export class Rnifler {

  public readonly rnifler: Project = RNIFLER;
  private readonly router: Router = inject(Router);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  public readonly other_projects = [RMAP, SECURITY_LAB_IOT_IAM];

  public readonly PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_LABELS;
  public readonly PROJECT_TYPE_LABELS = PROJECT_TYPE_LABELS;

  // ---------- Langue ----------

  public readonly language = inject(LanguageService);

  /** Les textes de la page dans la langue affichée. */
  public readonly texts = computed(() => RNIFLER_TEXTS[this.language.lang()]);

  // ---------- Galeries : une liste par endroit de la page ----------
  // computed : les textes alternatifs et les schémas changent avec la langue,
  // les captures du terminal restent les mêmes.

  public readonly pictures = computed(() => {
    const alt = this.texts().alts;
    const lang = this.language.lang();
    return {
      session: [picture('session-complete.png', alt.session)],
      features: [
        picture('usage-direct.png', alt.usage_live),
        picture('usage-rejeu.png', alt.usage_replay),
        picture('usage-enregistrement.png', alt.usage_record),
        picture('usage-anomalie.png', alt.usage_anomaly),
        picture('usage-wireshark.png', alt.usage_wireshark),
      ],
      library: [schema('schema-bibliotheque', lang, alt.library)],
      journey: [schema('schema-trajet', lang, alt.journey)],
      bpf: [schema('schema-filtre-bpf', lang, alt.bpf)],
      reassembly: [
        schema('schema-message-coupe', lang, alt.split_message),
        schema('schema-trou-resynchronisation-1', lang, alt.gap),
        schema('schema-trou-resynchronisation-2', lang, alt.gap),
        schema('schema-trou-resynchronisation-3', lang, alt.gap),
        picture('capture-message-coupe.png', alt.split_capture),
        picture('capture-retransmission-reelle.png', alt.restransmission_capture)
      ],
      decoding: [schema('schema-publish-octets', lang, alt.publish_bytes)],
      recording: [schema('schema-rotation', lang, alt.rotation)],
      threats: [schema('schema-menaces-parades', lang, alt.threats)],
      lying_length: [picture('capture-longueur-mensongere.png', alt.lying_length)],
      trapped_topic: [picture('capture-topic-piege.png', alt.trapped_topic)],
      insertion: [schema('schema-insertion', lang, alt.insertion)],
      offload: [schema('schema-offload', lang, alt.offload)],
      tests: [picture('capture-cargo-test.png', alt.cargo_test)],
      replay: [picture('capture-insertion-avant-apres.png', alt.insertion_replay)],
      publish: [
        schema('schema-ci-cd', lang, alt.ci_cd),
        picture('capture-release.png', alt.release),
      ],
    };
  });

  // ---------- Image affichée en grand ----------

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

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
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

}