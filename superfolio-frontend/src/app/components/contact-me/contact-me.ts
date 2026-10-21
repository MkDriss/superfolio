import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { LanguageService } from '../../services/language-service/language';
import { CONTACT_ME_TEXTS } from './contact-me.texts';

@Component({
  selector: 'app-contact-me',
  imports: [],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss',
})
export class ContactMe {

  public readonly language: LanguageService = inject(LanguageService)
  public readonly texts = computed(() => CONTACT_ME_TEXTS[this.language.lang()])

  @Output()
  home: EventEmitter<void> = new EventEmitter<void>();

}
;