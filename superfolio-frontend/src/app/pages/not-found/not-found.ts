import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  private readonly router: Router = inject(Router);

  public PICTURES:string[] = [
    "/wallpapers/landscape/not-found-background.jpg",
    "/wallpapers/landscape/not-found-dear.png",
    "/wallpapers/landscape/road-in-the-woods.png"
  ]

  public get random_idx():number{
    return Math.floor(Math.random()*this.PICTURES.length);
  }

  home() {
    this.router.navigate(['/home']);
  }
}
