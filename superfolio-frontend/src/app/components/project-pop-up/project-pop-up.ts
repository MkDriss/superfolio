import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../model/project.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-project-pop-up',
  imports: [],
  templateUrl: './project-pop-up.html',
  styleUrl: './project-pop-up.scss',
})
export class ProjectPopUp {
  @Input()
  project!: Project;

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }

  current_picture_index: number = 0;

  public get current_picture() {
    return this.project.overview_pictures[this.current_picture_index];
  }

  public get project_overview_pictures() {
    return [{ id: 0, path: "" }]
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  public trigger_close() {
    this.close.emit();
  }

}
