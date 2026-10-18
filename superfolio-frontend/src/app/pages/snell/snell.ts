import { Component, inject } from '@angular/core';
import { NAS_HOME_SERVER, OCTAVE, PROJECTS, SNELL } from '../../mocks/project.mock';
import { Project } from '../../model/project.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProjectCard } from '../../components/project-card/project-card';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
@Component({
  selector: 'app-snell',
  imports: [RevealDirective, ProjectCard, ProjectPopUp],
  templateUrl: './snell.html',
  styleUrl: './snell.scss',
})
export class Snell {
  public readonly snell: Project = SNELL;
  private readonly router: Router = inject(Router);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer)

  public readonly other_projects = [OCTAVE, NAS_HOME_SERVER];

  public home(): void {
    this.router.navigate(["/home"])
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

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
