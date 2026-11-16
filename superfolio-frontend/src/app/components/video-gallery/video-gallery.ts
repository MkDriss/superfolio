import { Component, Input } from '@angular/core';

export interface GalleryVideo {
  /** Chemin du fichier .mp4. */
  src: string;
  /** Texte accessible décrivant la vidéo (toujours renseigné). */
  alt: string;
  /** Libellé de l'onglet quand la galerie contient plusieurs vidéos. */
  label?: string;
  /** Image d'aperçu optionnelle : sert d'affiche avant lecture et de miniature. */
  poster?: string;
}

/**
 * Une vidéo principale et, s'il y en a plusieurs, leurs onglets en dessous.
 * La vidéo se lit sur place avec les contrôles natifs du navigateur : pas de
 * plein écran forcé ni d'overlay. Changer d'onglet met en pause la vidéo
 * précédente et affiche la suivante (jamais deux lectures en même temps).
 *
 * À la différence de la galerie d'images, il n'y a pas d'événement « agrandir » :
 * le lecteur <video controls> offre déjà son propre bouton plein écran.
 */
@Component({
  selector: 'app-video-gallery',
  imports: [],
  templateUrl: './video-gallery.html',
  styleUrl: './video-gallery.scss',
})
export class VideoGallery {

  @Input({ required: true })
  videos: GalleryVideo[] = [];

  public current_index: number = 0;

  public get current_video(): GalleryVideo {
    return this.videos[this.current_index];
  }

  /**
   * Sélectionne une vidéo. On met d'abord en pause le lecteur courant pour
   * qu'une vidéo lancée ne continue pas à jouer quand on change d'onglet.
   */
  public select(index: number, player: HTMLVideoElement): void {
    if (index === this.current_index) return;
    player.pause();
    this.current_index = index;
  }
}