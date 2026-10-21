import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../services/language-service/language';


// Le bouton propose toujours l'AUTRE langue, écrite dans cette langue :
// un francophone qui arrive sur la version anglaise doit reconnaître « Français ».
const TEXTS = {
    en: { target_code: 'FR', target_name: 'Français', target_lang: 'fr' },
    fr: { target_code: 'EN', target_name: 'English', target_lang: 'en' },
};

/** Bouton de changement de langue, fixé en bas à droite. À placer une seule fois, dans app.html. */
@Component({
    selector: 'app-lang-switch',
    imports: [],
    templateUrl: './lang-switch.html',
    styleUrl: './lang-switch.scss',
})
export class LangSwitch {

    public readonly language = inject(LanguageService);

    public readonly texts = computed(() => TEXTS[this.language.lang()]);
}