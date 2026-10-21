import { Component, computed, inject, Input } from '@angular/core';
import { LanguageService } from '../../services/language-service/language';
import { ABOUT_ME_CARD_TEXTS } from './about-me-card-texts';

@Component({
  selector: 'app-about-me-card',
  imports: [],
  templateUrl: './about-me-card.html',
  styleUrl: './about-me-card.scss',
})
export class AboutMeCard {

  private readonly language: LanguageService = inject(LanguageService);

  public readonly texts = computed(() => ABOUT_ME_CARD_TEXTS[this.language.lang()]);

  @Input()
  type: string = "study"

}
