import { Component, EventEmitter, Output } from '@angular/core';
import { AboutMeCard } from '../about-me-card/about-me-card';

@Component({
  selector: 'app-about-me',
  imports: [AboutMeCard],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
export class AboutMe {
  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();

  
}
