import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { AboutMeCard } from '../about-me-card/about-me-card';
import { RevealDirective } from '../../directives/reveal.directive';
import { LanguageService } from '../../services/language-service/language';
import { ABOUT_ME_TEXTS } from './about-me-texts';

@Component({
  selector: 'app-about-me',
  imports: [AboutMeCard, RevealDirective],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  public readonly language: LanguageService = inject(LanguageService);

  public texts = computed(() => ABOUT_ME_TEXTS[this.language.lang()]);

  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();


}
