import { Component, computed, inject } from '@angular/core';
import { RMAP } from './rmap.project';
import { Router } from '@angular/router';
import { Project, PROJECT_CATEGORY_LABELS, PROJECT_TYPE_LABELS } from '../../model/project.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SECURITY_LAB_IOT_IAM } from '../security-lab-iot-iam/security-lab-iot.iam.project';
import { LanguageService } from '../../services/language-service/language';
import { RMAP_TEXTS } from './rmap.texts';
import { GalleryPicture, ProjectGallery } from '../../components/project-gallery/project-gallery';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { RevealDirective } from '../../directives/reveal.directive';
import { PictureLightbox } from '../../components/picture-lightbox/picture-lightbox';
import { ProjectCard } from '../../components/project-card/project-card';


const PICTURES_PATH = 'projects/rmap/pictures/';
const picture = (file: string, alt: string): GalleryPicture => ({ src: PICTURES_PATH + file, alt });


@Component({
  selector: 'app-rmap',
  imports: [RevealDirective, ProjectPopUp, PictureLightbox, ProjectCard, ProjectGallery],
  templateUrl: './rmap.html',
  styleUrl: './rmap.scss',
})
export class Rmap {

  public readonly rmap: Project = RMAP;
  private readonly router: Router = inject(Router);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  public readonly other_projects = [SECURITY_LAB_IOT_IAM];

  public readonly PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_LABELS;
  public readonly PROJECT_TYPE_LABELS = PROJECT_TYPE_LABELS;

  // ---------- Langue ----------

  public readonly language = inject(LanguageService);

  /** Les textes de la page dans la langue affichée. */
  public readonly texts = computed(() => RMAP_TEXTS[this.language.lang()]);

  // ---------- Galeries : une liste par endroit de la page ----------
  // computed : les textes alternatifs changent avec la langue, les images restent les mêmes.

  public readonly pictures = computed(() => {
    const alt = this.texts().alts;
    return {
      open_port: [picture("open-port-tcp.png", alt.open_port)],
      closed_port: [picture("closed-port-tcp.png", alt.closed_port)],
      filtered_port: [picture("filtered-port-tcp.png", alt.filtered_port)],
      scan_steps: [picture("scan-steps.png", alt.scan_steps)],
      sequential_scan: [picture("sequential-scan.png", alt.sequential_scan)],
      parallel_scan: [picture("parallel-scan.png", alt.parallel_scan)],
      semaphore: [picture("semaphore.png", alt.semaphore)],
      discovery: [picture("discovery.png", alt.discovery)],
      after_fix: [picture("rmap-after.png", alt.after_fix)],
      before_fix: [picture("rmap-before.png", alt.before_fix)]
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
