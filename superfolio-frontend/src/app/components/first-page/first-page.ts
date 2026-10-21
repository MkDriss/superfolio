import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { LanguageService } from '../../services/language-service/language';
import { FIRST_PAGE_TEXT } from './first-page.texts';

@Component({
  selector: 'app-first-page',
  imports: [],
  templateUrl: './first-page.html',
  styleUrl: './first-page.scss',
})
export class FirstPage {

  public readonly language: LanguageService = inject(LanguageService);

  public readonly texts = computed(() => FIRST_PAGE_TEXT[this.language.lang()]);

  @Output()
  send_to: EventEmitter<string> = new EventEmitter<string>();
}
