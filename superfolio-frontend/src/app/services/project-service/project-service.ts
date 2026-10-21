import { Injectable } from '@angular/core';
import { Project } from '../../model/project.model';
import { ProjectFilters } from '../../model/project-filters.model';
import { PROJECTS } from '../../mocks/project.mock';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private projects: Project[] = PROJECTS;

  public get_projects() {
    return this.projects;
  }

  public get_project_by_id(project_id: number) {
    return this.projects.find(p => p.id === project_id);
  }

  // Un groupe vide ne filtre rien. Dans un même groupe, il suffit qu'une valeur corresponde.
  public search_projects(query: string, filters: ProjectFilters): Project[] {
    const q = query.trim().toLowerCase();

    return this.projects.filter(project =>
      (q === ''
        || project.name.toLowerCase().includes(q))
      && (filters.categories.length === 0 || filters.categories.includes(project.category))
      && (filters.types.length === 0 || filters.types.includes(project.type))
      // remplace .some par .every pour exiger TOUTES les technologies cochées
      && (filters.technologies.length === 0
        || filters.technologies.some(id => project.technologies.some(t => t.id === id)))
    );
  }

    public get_mention_place(project:Project): string {
    if (project.award) {
      switch (project.award.place) {
        case 1: return "🥇";
        case 2: return "🥈";
        case 3: return "🥉";
        default: return "";
      }
    } else return "";
  }

}