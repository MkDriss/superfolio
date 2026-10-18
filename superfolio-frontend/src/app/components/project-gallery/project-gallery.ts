import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

export interface GalleryPicture {
  src: string;
  alt: string;
}

/**
 * Une image principale et, s'il y en a plusieurs, leurs miniatures en dessous.
 * Un clic sur une miniature remplace l'image principale ; un clic sur l'image
 * principale demande à la page de l'afficher en grand (événement `enlarge`).
 */
@Component({
  selector: 'app-project-gallery',
  imports: [],
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.scss',
})
export class ProjectGallery {

  @Input({ required: true })
  pictures: GalleryPicture[] = [];

  /** Captures de téléphone : le téléphone à gauche, les miniatures à droite. */
  @Input({ transform: booleanAttribute })
  mobile = false;

  @Output()
  enlarge: EventEmitter<GalleryPicture> = new EventEmitter();

  public current_index: number = 0;

  public get current_picture(): GalleryPicture {
    return this.pictures[this.current_index];
  }
}