import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Project } from '../../model/project.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-project-pop-up',
  imports: [],
  templateUrl: './project-pop-up.html',
  styleUrl: './project-pop-up.scss',
})
export class ProjectPopUp implements OnInit, OnDestroy {
  @Input()
  project!: Project;

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  current_picture_index: number = 0;

  public get current_picture() {
    return this.project.overview_pictures[this.current_picture_index];
  }

  ngOnInit(): void {
    this.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  @HostListener('document:keydown.escape')
  public on_escape(): void {
    this.trigger_close();
  }

  public trigger_close() {
    this.close.emit();
  }


}