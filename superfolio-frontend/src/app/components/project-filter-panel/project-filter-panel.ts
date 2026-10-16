import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProjectCategory, ProjectType } from '../../model/project.model';
import { Technology } from '../../model/technology.model';
import { ProjectFilters, count_active_filters, create_empty_filters } from '../../model/project-filters.model';

@Component({
  selector: 'app-project-filter-panel',
  imports: [],
  templateUrl: './project-filter-panel.html',
  styleUrl: './project-filter-panel.scss',
})
export class ProjectFilterPanel implements OnInit, OnDestroy {

  @Input({ required: true })
  filters!: ProjectFilters;

  @Input()
  technologies: Technology[] = [];

  @Output()
  filters_change: EventEmitter<ProjectFilters> = new EventEmitter();

  @Output()
  search: EventEmitter<void> = new EventEmitter();

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  // les const enum n'existent pas à l'exécution : on liste les valeurs à la main
  public readonly categories: ProjectCategory[] = [ProjectCategory.DEV, ProjectCategory.CYBER];
  public readonly types: ProjectType[] = [ProjectType.SCHOOL, ProjectType.HOME];

  constructor(@Inject(DOCUMENT) private document: Document) { }

  // le panneau est créé et détruit par le @if de la liste : on bloque le scroll de la page pendant ce temps
  ngOnInit(): void {
    this.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  public on_escape(): void {
    this.close.emit();
  }

  public get active_count(): number {
    return count_active_filters(this.filters);
  }

  public toggle_category(category: ProjectCategory): void {
    this.filters_change.emit({ ...this.filters, categories: toggle(this.filters.categories, category) });
  }

  public toggle_type(type: ProjectType): void {
    this.filters_change.emit({ ...this.filters, types: toggle(this.filters.types, type) });
  }

  public toggle_technology(technology_id: number): void {
    this.filters_change.emit({ ...this.filters, technologies: toggle(this.filters.technologies, technology_id) });
  }

  public reset(): void {
    this.filters_change.emit(create_empty_filters());
  }
}

// ajoute la valeur si elle est absente, la retire sinon
function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
}