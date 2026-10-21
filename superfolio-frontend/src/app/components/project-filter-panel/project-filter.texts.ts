import { technologies } from "../../mocks/technology.mock"

const en = {
    title: "Filters",
    category: "Category",
    type: "Type",
    technologies: "Technologies",
    clear: "Clear all",
    search: "search"
}

const fr: typeof en = {
    title: "Filtres",
    category: "Categorie",
    type: "Type",
    technologies: "Technologies",
    clear: "Effacer tout",
    search: "Rechercher"
}

export const PROJECT_FILTERS_TEXTS = { en, fr }