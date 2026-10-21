import { Component, computed, inject } from '@angular/core';
import { Project, PROJECT_CATEGORY_LABELS, PROJECT_TYPE_LABELS } from '../../model/project.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProjectCard } from '../../components/project-card/project-card';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { GalleryPicture, ProjectGallery } from '../../components/project-gallery/project-gallery';
import { PictureLightbox } from '../../components/picture-lightbox/picture-lightbox';
import { LanguageService } from '../../services/language-service/language';
import { SNELL_TEXTS } from './snell.texts';
import { SNELL } from './snell.project';
import { OCTAVE } from '../octave/octave.project';
import { NAS_HOME_SERVER } from '../nas-home-server/nas-home-server.project';

const PICTURES_PATH = 'projects/snell/pictures/';
const picture = (file: string, alt: string): GalleryPicture => ({ src: PICTURES_PATH + file, alt });

@Component({
  selector: 'app-snell',
  imports: [RevealDirective, ProjectCard, ProjectPopUp, ProjectGallery, PictureLightbox],
  templateUrl: './snell.html',
  styleUrl: './snell.scss',
})
export class Snell {
  public readonly snell: Project = SNELL;
  private readonly router: Router = inject(Router);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  public readonly other_projects = [OCTAVE, NAS_HOME_SERVER];

  public readonly PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_LABELS;
  public readonly PROJECT_TYPE_LABELS = PROJECT_TYPE_LABELS;

  // ---------- Langue ----------

  public readonly language = inject(LanguageService);

  /** Les textes de la page dans la langue affichée. */
  public readonly texts = computed(() => SNELL_TEXTS[this.language.lang()]);

  // ---------- Galeries : une liste par endroit de la page ----------
  // computed : les textes alternatifs changent avec la langue, les images restent les mêmes.

  public readonly pictures = computed(() => {
    const alt = this.texts().alts;
    return {
      home: [picture('home-page.png', alt.home)],
      local_game: [picture('local-1vs1-page.png', alt.local_game)],
      architecture: [picture('architecture.jpg', alt.architecture)],
      tutorial: [
        picture('tutorial.png', alt.tutorial),
        picture('tutorial-hint.png', alt.tutorial_hint),
      ],
      puzzles: [
        picture('puzzles.png', alt.puzzles),
        picture('puzzle-game.png', alt.puzzle_game),
        picture('puzzle-game-hint.png', alt.puzzle_hint),
      ],
      ai: [
        picture('ais-page.png', alt.ais),
        picture('ai-game.png', alt.ai_game),
        picture('ai-game-2.png', alt.ai_game_2),
      ],
      multiplayer: [
        picture('multiplayer-wait.png', alt.multiplayer_wait),
        picture('multiplayer-game.png', alt.multiplayer_game),
      ],
      engine: [picture('bits-repartition.jpg', alt.engine)],
      review: [picture('review-game.png', alt.review)],
      progression: [
        picture('profile-page.png', alt.profile),
        picture('inventory-page.png', alt.inventory),
      ],
      honesty: [
        picture('honesty-quiz.png', alt.honesty_1),
        picture('honesty-quiz-2.png', alt.honesty_2),
      ],
      mobile: [
        picture('mobile-home-page.png', alt.mobile_home),
        picture('mobile-login.png', alt.mobile_login),
        picture('mobile-shop.png', alt.mobile_shop),
        picture('mobile-ais.png', alt.mobile_ais),
        picture('mobile-ai-game.png', alt.mobile_ai_game),
        picture('mobile-friends.png', alt.mobile_friends),
        picture('mobile-puzzles.png', alt.mobile_puzzles),
        picture('mobile-puzzle-game.png', alt.mobile_puzzle_game),
        picture('mobile-tutorial.png', alt.mobile_tutorial),
        picture('mobile-profile.png', alt.mobile_profile),
      ],
      monitoring: [picture('monitoring.png', alt.monitoring)],
      deployment: [picture('snell-cloudflare-archi.jpg', alt.deployment)],
    };
  });

  // ---------- Image affichée en grand ----------

  public selected_picture: GalleryPicture | null = null;

  public open_picture(picture: GalleryPicture): void {
    this.selected_picture = picture;
  }

  public close_picture(): void {
    this.selected_picture = null;
  }

  // ---------- Navigation ----------

  public home(): void {
    this.router.navigate(["/home"]);
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  // ---------- Pop-up des projets liés ----------

  public show_project_pop_up: boolean = false;

  public selected_project: Project | null = null;

  public open_project_pop_up(project_id: number) {
    const project: Project | undefined = this.other_projects.find(p => p.id === project_id);
    if (project) {
      this.selected_project = project;
      this.show_project_pop_up = true;
    } else {
      this.selected_project = null;
      this.show_project_pop_up = false;
      console.error("Failed to display project with id", project_id);
    }
  }

  public on_backdrop_click(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close_project_pop_up();
    }
  }

  public close_project_pop_up() {
    this.show_project_pop_up = false;
    this.selected_project = null;
  }
}