import { Component, inject, Input } from '@angular/core';
import { Project } from '../../model/project.model';
import { ProjectService } from '../../services/project-service/project-service';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {

  private readonly projectService:ProjectService = inject(ProjectService);

  @Input()
  project!: Project


  public get mention_place(){
    return this.projectService.get_mention_place(this.project);
  }
}
