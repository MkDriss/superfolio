import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { ProjectPopUp } from '../project-pop-up/project-pop-up';
import { ProjectService } from '../../services/project-service/project-service';
import { technologies } from '../../mocks/technology.mock';
import { Project } from '../../model/project.model';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, ProjectPopUp],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
})
export class ProjectList {

  private readonly projectService: ProjectService = inject(ProjectService);

  public show_project_pop_up: boolean = false;

  public selected_project: Project | null = null;

  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();


  public open_project_pop_up(project_id: number) {
    const project: Project | undefined = this.projectService.get_project_by_id(project_id);
    if (project) {
      this.selected_project = project;
      this.show_project_pop_up = true;
      console.log("project displayed: ", project);
    } else {
      this.selected_project = null;
      this.show_project_pop_up = false;
      console.error("Failed to dsplay project with id", project_id)
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

  public get projects() { return this.projectService.get_projects(); }

  public get technologies() { return technologies.sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })) }
}
