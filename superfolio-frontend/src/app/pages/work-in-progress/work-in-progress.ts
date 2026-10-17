import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-in-progress',
  imports: [],
  templateUrl: './work-in-progress.html',
  styleUrl: './work-in-progress.scss',
})
export class WorkInProgress {

  private readonly router: Router = inject(Router);

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
  ]

  public get random_idx(): number {
    const max = this.PICTURES_DESKTOP.length;
    return Math.floor(Math.random() * max);
  }

  home() {
    this.router.navigate(['/home']);
  }
}
