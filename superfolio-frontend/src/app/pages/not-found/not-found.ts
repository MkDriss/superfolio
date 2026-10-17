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
    "/not-found-background.jpg",
    "/not-found-dear.png"
  ]

  public get random_idx():number{
    return Math.floor(Math.random()*this.PICTURES.length);
  }

  home() {
    this.router.navigate(['/home']);
  }
}
