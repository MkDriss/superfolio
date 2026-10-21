import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangSwitch } from './components/lang-switch/lang-switch';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LangSwitch],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('superfolio-frontend');
}
