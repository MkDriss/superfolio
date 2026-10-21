import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language-service/language';
import { WORK_IN_PROGRESS_TEXTS } from './work-in-progress.texts';

@Component({
  selector: 'app-work-in-progress',
  imports: [],
  templateUrl: './work-in-progress.html',
  styleUrl: './work-in-progress.scss',
})
export class WorkInProgress {

  private readonly router: Router = inject(Router);

  private readonly language: LanguageService = inject(LanguageService);

  public readonly texts = computed(() => WORK_IN_PROGRESS_TEXTS[this.language.lang()]);

  public random_idx: number = 0;

  constructor() {
    const min_length = Math.min(this.PICTURES_DESKTOP.length, this.PICTURES_MOBILE.length);
    this.random_idx = Math.floor(Math.random() * min_length);
  }

  public PICTURES_DESKTOP = [
    "/wallpapers/landscape/bear.png",
    "/wallpapers/landscape/cow.jpg",
    "/wallpapers/landscape/white-fox.png",
    "/wallpapers/landscape/lion.png"
  ]

  public PICTURES_MOBILE = [
    "/wallpapers/portrait/mobile-bear.png",
    "/wallpapers/portrait/mobile-cow.png",
    "/wallpapers/portrait/mobile-white-fox.png",
    "/wallpapers/landscape/lion.png"
  ]



  home() {
    this.router.navigate(['/home']);
  }
}
