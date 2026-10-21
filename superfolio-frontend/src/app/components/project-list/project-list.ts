import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { ProjectPopUp } from '../project-pop-up/project-pop-up';
import { ProjectFilterPanel } from '../project-filter-panel/project-filter-panel';
import { RevealDirective } from '../../directives/reveal.directive';
import { ProjectService } from '../../services/project-service/project-service';
import { technologies } from '../../mocks/technology.mock';
import { Project } from '../../model/project.model';
import { Technology } from '../../model/technology.model';
import { ProjectFilters, count_active_filters, create_empty_filters } from '../../model/project-filters.model';
import { LanguageService } from '../../services/language-service/language';
import { PROJECT_LIST_TEXTS } from './project-list.texts';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, ProjectPopUp, ProjectFilterPanel, RevealDirective],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
})
export class ProjectList {

  private readonly projectService: ProjectService = inject(ProjectService);

  private readonly language: LanguageService = inject(LanguageService);

  public readonly texts = computed(() => PROJECT_LIST_TEXTS[this.language.lang()]);

  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();

  // ---------- Pop-up projet ----------

  public show_project_pop_up: boolean = false;

  public selected_project: Project | null = null;

  public open_project_pop_up(project_id: number) {
    const project: Project | undefined = this.projectService.get_project_by_id(project_id);
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

  // ---------- Recherche et filtres ----------

  public show_filter_panel: boolean = false;

  // filtres en cours d'édition dans le panneau, appliqués au clic sur "rechercher"
  public filters: ProjectFilters = create_empty_filters();

  public displayed_projects: Project[] = this.projectService.get_projects();

  // trié une seule fois (l'ancien getter re-triait le mock à chaque détection de changement)
  public readonly technologies: Technology[] = [...technologies]
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));

  public get active_filter_count(): number {
    return count_active_filters(this.filters);
  }

  public open_filter_panel() {
    this.show_filter_panel = true;
  }

  public close_filter_panel() {
    this.show_filter_panel = false;
  }

  public search(query: string) {
    this.displayed_projects = this.projectService.search_projects(query, this.filters);
    this.show_filter_panel = false;
  }
}