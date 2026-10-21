import { effect, Injectable, signal } from '@angular/core';
import { Localized } from '../../model/localized.model';

export type Lang = 'en' | 'fr';


const STORAGE_KEY = 'superfolio-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  /** Langue affichée. Tout ce qui la lit se met à jour automatiquement quand elle change. */
  public readonly lang = signal<Lang>(this.initial_lang());

  constructor() {
    // à chaque changement : on mémorise le choix et on met à jour <html lang="...">
    effect(() => {
      const lang = this.lang();
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    });
  }

  public toggle(): void {
    this.lang.set(this.lang() === 'en' ? 'fr' : 'en');
  }

  /** Renvoie la version d'un texte dans la langue affichée. */
  public pick(text: Localized): string {
    return text[this.lang()];
  }

  // le choix enregistré, sinon la langue du navigateur
  private initial_lang(): Lang {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') return saved;
    return navigator.language.startsWith('fr') ? 'fr' : 'en';
  }
}