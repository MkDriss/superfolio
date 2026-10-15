import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  imports: [],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.scss',
})
export class ContactMe {

  @Output()
  home:EventEmitter<void> = new EventEmitter<void>();

}
