import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GalleryPicture } from '../project-gallery/project-gallery';

/**
 * Affiche une image en grand par-dessus la page.
 * Se ferme avec la croix, un clic à côté de l'image, ou la touche Échap.
 */
@Component({
  selector: 'app-picture-lightbox',
  imports: [],
  templateUrl: './picture-lightbox.html',
  styleUrl: './picture-lightbox.scss',
})
export class PictureLightbox implements OnInit, OnDestroy {

  @Input({ required: true })
  picture!: GalleryPicture;

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  private readonly document: Document = inject(DOCUMENT);

  // créé et détruit par le @if de la page : la page ne défile pas tant qu'il est ouvert
  ngOnInit(): void {
    this.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  public on_escape(): void {
    this.close.emit();
  }

  // ferme seulement si le clic tombe à côté de l'image, pas sur l'image elle-même
  public on_backdrop_click(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close.emit();
  }
}