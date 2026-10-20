import { Component, inject } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { OCTAVE, SNELL } from '../../mocks/project.mock';
import { PictureLightbox } from '../../components/picture-lightbox/picture-lightbox';
import { GalleryPicture, ProjectGallery } from '../../components/project-gallery/project-gallery';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { RevealDirective } from '../../directives/reveal.directive';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../model/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-octave',
  imports: [RevealDirective, ProjectCard, ProjectPopUp, ProjectGallery, PictureLightbox],
  templateUrl: './octave.html',
  styleUrl: './octave.scss',
})
export class Octave {

  public readonly octave: Project = OCTAVE;
  private readonly router: Router = inject(Router);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  public readonly related_projects = [SNELL];

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
    const project: Project | undefined = this.related_projects.find(p => p.id === project_id);
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
