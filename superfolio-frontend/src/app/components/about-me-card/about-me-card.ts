import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-me-card',
  imports: [],
  templateUrl: './about-me-card.html',
  styleUrl: './about-me-card.scss',
})
export class AboutMeCard {

  @Input()
  type:string = "study"

}
