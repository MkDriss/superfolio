import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-first-page',
  imports: [],
  templateUrl: './first-page.html',
  styleUrl: './first-page.scss',
})
export class FirstPage {
  @Output()
  send_to:EventEmitter<string> = new EventEmitter<string>();
}
