import { Component, EventEmitter, Output } from '@angular/core';
import { AboutMeCard } from '../about-me-card/about-me-card';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about-me',
  imports: [AboutMeCard, RevealDirective],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();

  
}
