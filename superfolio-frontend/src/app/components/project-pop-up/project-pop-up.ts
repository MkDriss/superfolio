import { Component, Input } from '@angular/core';
import { Project } from '../../model/project.model';

@Component({
  selector: 'app-project-pop-up',
  imports: [],
  templateUrl: './project-pop-up.html',
  styleUrl: './project-pop-up.scss',
})
export class ProjectPopUp {
  @Input()
  project!: Project;

  current_picture_index: number = 0;

  get_current_picture() {
    return this.project.overview_pictures[this.current_picture_index];
  }

  get_project_overview_pictures() {
    return [{ id: 0, path: "" }]
  }

}
