import { ProjectCategory, ProjectType } from './project.model';

export interface ProjectFilters {
    technologies: number[];
    types: ProjectType[];
    categories: ProjectCategory[];
}

export function create_empty_filters(): ProjectFilters {
    return { technologies: [], types: [], categories: [] };
}

export function count_active_filters(filters: ProjectFilters): number {
    return filters.technologies.length + filters.types.length + filters.categories.length;
}