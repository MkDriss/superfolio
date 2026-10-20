import { Component, inject } from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { OCTAVE, SNELL } from '../../mocks/project.mock';
import { PictureLightbox } from '../../components/picture-lightbox/picture-lightbox';
import { GalleryPicture, ProjectGallery } from '../../components/project-gallery/project-gallery';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { RevealDirective } from '../../directives/reveal.directive';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Project } from '../../model/project.model';
import { Router } from '@angular/router';

const PICTURES_PATH = 'projects/octave/pictures/';
const picture = (file: string, alt: string): GalleryPicture => ({ src: PICTURES_PATH + file, alt });

@Component({
  selector: 'app-octave',
  imports: [RevealDirective, ProjectCard, ProjectPopUp, ProjectGallery, PictureLightbox],
  templateUrl: './octave.html',
  styleUrl: './octave.scss',
})


export class Octave {

  public readonly octave: Project = OCTAVE;
  private readonly router: Router = inject(Router);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  public readonly related_projects = [SNELL];

  public readonly pictures = {
    home: [picture("home-page.png", "Home page"),
    picture("solo-game.png", "Game Solo")
    ],

    diagrams: [
      picture("use-case-diag.png", "Use case diagram"),
      picture("diag-sequence-therapeute.png", "therapists Sequence diagram"),
      picture("diag-sequence-user.png", "Participant sequence diagram")
    ],

    model: [
      picture("octave-maquette.png", "Octave Model"),
      picture("solo-game-maquette.png", "Solo Game Model"),
      picture("octave-config-maquette.png", "Octave Config Model"),
      picture("statistique-utilisateur-maquette.png", "User statistics Model"),
      picture("statistique-utilisateur-maquette-2.png", "User statistics Model 2"),
      picture("statistique-utilisateur-maquette-3.png", "User statistics Model 3"),
      picture("quiz-score-maquette.png", "Quiz Score Model"),
      picture("statistic-quiz-maquette.png", "Quiz Statistics Model"),
      picture("matrio.png", "Matrio"),
    ],

    play_without_frustration: [
      picture("solo-game.png", "Game solo with hint displayed"),
      picture("game-solo-good-answer.png", "Game solo good answer"),
      picture("game-solo-answer-removed.png", "Answer got removed in game"),
      picture("game-solo-rappel.png", "Game solo recall to the user"),
      picture("game-solo-congrats.png", "Game congrats the user for reaching the end of the quiz"),
    ],

    configuration: [
      picture("panel-page.png", "Admin Panel view"),
      picture("patient-list.png", "Participant list from admin panel view"),
      picture("patient-edit.png", "Editing the infos of a participant"),
      picture("patient-config.png", "Editing the in game configurations of a participant"),
      picture("add-patient.png", "Add participant form"),
      picture("admin-quiz-list.png", "Quiz list"),
      picture("admin-quiz-edit.png", "Quiz editing"),
    ],


    multiplayer_game_setup: [
      picture("multiplayer-lobby.png", "Multiplayer game lobby"),
      picture("join-multiplayer-page.png", "Joining a multiplayer quiz via the code"),
      picture("players-in-the-room.png", "Multiplayer player in the lobby"),
    ],

    multiplayer_in_game: [
      picture("multiplayer-game.png", "Multiplayer game host view"),
      picture("multi-quiz-admin-view-hints.png", "Mutilplayer Host view with hints displayed"),
      picture("multiplayer-game-right.png", "Multiplayer right answer given"),
      picture("multiplayer-failed.png", "Multiplayer wrong answer given"),
    ],

    multiplayer_game_end: [
      picture("multiquiz-end.png", "Multiplayer end game"),
      picture("replay-1.png", "Multiplayer game replay"),
      picture("multiplayer-game-leaderboard.png", "Multiplayer leaderboard"),
    ],

    quiz_stats: [
      picture("quiz-stats-page.png", "Quiz statistics"),
      picture("multiplayer-session-stats.png", "Multiplayer session statistics"),
      picture("multiplayer-leader-board.png", "Multiplayer session leader board"),
    ],

    participant_stats: [
      picture("patient-stats.png", "Participent global statistics"),
      picture("patient-evolution-stats.png", "Participent evolution statistics"),
      picture("patient-quiz-history.png", "Participant quiz history"),
    ]
  }

  // picture("multiplayer-session-stats.png", "Multiplayer end game"),

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
    const project: Project | undefined = this.related_projects.find(p => p.id === project_id);
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
