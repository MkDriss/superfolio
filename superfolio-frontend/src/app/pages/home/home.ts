import { Component } from '@angular/core';
import { ProjectList } from '../../components/project-list/project-list';
import { ContactMe } from '../../components/contact-me/contact-me';
import { AboutMe } from '../../components/about-me/about-me';
import { FirstPage } from '../../components/first-page/first-page';

@Component({
  selector: 'app-home',
  imports: [ProjectList, AboutMe, ContactMe, FirstPage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {


  scroll_to(section_id: string): void {

    const reduce_motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.getElementById(section_id)?.scrollIntoView({
      behavior: reduce_motion ? 'auto' : 'smooth',
      block: 'start',
    });
  }

}
