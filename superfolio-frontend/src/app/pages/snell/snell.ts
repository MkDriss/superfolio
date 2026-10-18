import { Component, inject } from '@angular/core';
import { NAS_HOME_SERVER, OCTAVE, SNELL } from '../../mocks/project.mock';
import { Project } from '../../model/project.model';
import { RevealDirective } from '../../directives/reveal.directive';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProjectCard } from '../../components/project-card/project-card';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { GalleryPicture, ProjectGallery } from '../../components/project-gallery/project-gallery';
import { PictureLightbox } from '../../components/picture-lightbox/picture-lightbox';

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

  // ---------- Galeries : une liste par endroit de la page ----------

  public readonly pictures = {
    home: [picture('home-page.png', 'Snell home page')],
    local_game: [picture('local-1vs1-page.png', 'Local game between two players')],
    architecture: [picture('architecture.jpg', 'Microservice architecture of Snell')],
    tutorial: [
      picture('tutorial.png', 'Interactive tutorial with Coach Bae'),
      picture('tutorial-hint.png', 'Tutorial step with highlighted cells'),
    ],
    puzzles: [
      picture('puzzles.png', 'Puzzle selection'),
      picture('puzzle-game.png', 'Puzzle in progress'),
      picture('puzzle-game-hint.png', 'Puzzle with a hint displayed'),
    ],
    ai: [
      picture('ais-page.png', 'AI opponent selection'),
      picture('ai-game.png', 'Game against the AI'),
      picture('ai-game-2.png', 'Another game against the AI'),
    ],
    multiplayer: [
      picture('multiplayer-wait.png', 'Matchmaking waiting screen'),
      picture('multiplayer-game.png', 'Online multiplayer game'),
    ],
    engine: [picture('bits-repartition.jpg', 'Encoding of a piece on a single byte')],
    review: [picture('review-game.png', 'Game review with the advantage indicator')],
    progression: [
      picture('profile-page.png', 'Player profile'),
      picture('inventory-page.png', 'Player inventory'),
    ],
    honesty: [
      picture('honesty-quiz.png', 'Honesty test: declaring whether you are honest'),
      picture('honesty-quiz-2.png', 'Honesty test: sorting the statements'),
    ],
    mobile: [
      picture('mobile-home-page.png', 'Mobile app: home page'),
      picture('mobile-login.png', 'Mobile app: login'),
      picture('mobile-shop.png', 'Mobile app: shop'),
      picture('mobile-ais.png', 'Mobile app: AI selection'),
      picture('mobile-ai-game.png', 'Mobile app: game against the AI'),
      picture('mobile-friends.png', 'Mobile app: friends'),
      picture('mobile-puzzles.png', 'Mobile app: puzzle selection'),
      picture('mobile-puzzle-game.png', 'Mobile app: puzzle in progress'),
      picture('mobile-tutorial.png', 'Mobile app: tutorial'),
      picture('mobile-profile.png', 'Mobile app: profile'),
    ],
    monitoring: [picture('monitoring.png', 'Monitoring dashboard')],
    deployment: [picture('snell-cloudflare-archi.jpg', 'Self-hosted deployment through a Cloudflare Tunnel')],
  };

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