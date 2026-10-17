import { Component, inject, Input } from '@angular/core';
import { Project } from '../../model/project.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-project-header',
  imports: [],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
})
export class ProjectHeader {

  private sanitizer: DomSanitizer = inject(DomSanitizer);

  @Input() project!: Project

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

}
