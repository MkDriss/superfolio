import { Component, Input } from '@angular/core';
import { Project } from '../../model/project.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {

  @Input()
  project!: Project

}
