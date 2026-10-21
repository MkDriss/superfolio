import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language-service/language';
import { NOT_FOUND_TEXTS } from './note-found.texts';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  private readonly router: Router = inject(Router);

  private readonly language: LanguageService = inject(LanguageService);

  public readonly texts = computed(() => NOT_FOUND_TEXTS[this.language.lang()]);

  public PICTURES: string[] = [
    "/wallpapers/landscape/not-found-background.jpg",
    "/wallpapers/landscape/not-found-dear.png",
    "/wallpapers/landscape/road-in-the-woods.png"
  ]

  public get random_idx(): number {
    return Math.floor(Math.random() * this.PICTURES.length);
  }

  home() {
    this.router.navigate(['/home']);
  }
}
