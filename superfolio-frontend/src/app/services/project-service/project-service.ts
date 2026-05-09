import { Injectable } from '@angular/core';
import { Project } from '../../model/project.model';
import { PROJECTS_MOCK } from '../../mocks/project.mock';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private projects: Project[] = PROJECTS_MOCK;


  public get_projects() {
    return this.projects;
  }

  public get_project_by_id(project_id: number) {
    return this.projects.find(p => p.id === project_id);
  }

}
