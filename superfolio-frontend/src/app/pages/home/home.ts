import { Component } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { ProjectService } from '../../services/project-service/project-service';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { Project } from '../../model/project.model';

@Component({
  selector: 'app-home',
  imports: [ProjectCard, ProjectPopUp],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  public show_project_pop_up: boolean = false;

  public selected_project: Project | null = null;

  constructor(private projectsService: ProjectService) {

  }

  public open_project_pop_up(project_id: number) {
    const project: Project | undefined = this.projectsService.get_project_by_id(project_id);
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

  public close_project_pop_up() {
    this.show_project_pop_up = false;
    this.selected_project = null;
  }

  public get_projects() { return this.projectsService.get_projects(); }
}
