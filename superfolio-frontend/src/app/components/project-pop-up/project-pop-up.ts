import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Project } from '../../model/project.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project-service/project-service';

@Component({
  selector: 'app-project-pop-up',
  imports: [],
  templateUrl: './project-pop-up.html',
  styleUrl: './project-pop-up.scss',
})
export class ProjectPopUp implements OnInit, OnDestroy {
  private readonly projectService: ProjectService = inject(ProjectService)

  @Input()
  project!: Project;

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  private readonly router: Router = inject(Router);

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
  
  @HostListener('document:keydown.ArrowRight')
  public right_image(): void {
    if (this.current_picture_index + 1 < this.project.overview_pictures.length) this.current_picture_index += 1;
  }

  @HostListener('document:keydown.ArrowLeft')
  public left_image(): void {
    if (this.current_picture_index - 1 >= 0) this.current_picture_index -= 1;
  }

  public trigger_close() {
    this.close.emit();
  }


  public navigate_to(path: string) {
    this.router.navigate(["my-projects/" + path]);
  }

}