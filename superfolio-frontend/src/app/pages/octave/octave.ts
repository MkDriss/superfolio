import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProjectCard } from '../../components/project-card/project-card';
import { PictureLightbox } from '../../components/picture-lightbox/picture-lightbox';
import { GalleryPicture, ProjectGallery } from '../../components/project-gallery/project-gallery';
import { ProjectPopUp } from '../../components/project-pop-up/project-pop-up';
import { RevealDirective } from '../../directives/reveal.directive';
import { Project, PROJECT_CATEGORY_LABELS, PROJECT_TYPE_LABELS } from '../../model/project.model';
import { LanguageService } from '../../services/language-service/language';
import { OCTAVE_TEXTS } from './octave.texts';
import { OCTAVE } from './octave.project';
import { SNELL } from '../snell/snell.project';

const PICTURES_PATH = 'projects/octave/pictures/';
const picture = (file: string, alt: string): GalleryPicture => ({ src: PICTURES_PATH + file, alt });

@Component({
  selector: 'app-octave',
  imports: [RevealDirective, RouterLink, ProjectCard, ProjectPopUp, ProjectGallery, PictureLightbox],
  templateUrl: './octave.html',
  styleUrl: './octave.scss',
})
export class Octave {

  public readonly octave: Project = OCTAVE;
  private readonly router: Router = inject(Router);
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  public readonly related_projects = [SNELL];
  
  public readonly PROJECT_CATEGORY_LABELS = PROJECT_CATEGORY_LABELS;
  public readonly PROJECT_TYPE_LABELS = PROJECT_TYPE_LABELS;

  // ---------- Langue ----------

  public readonly language = inject(LanguageService);

  /** Les textes de la page dans la langue affichée. */
  public readonly texts = computed(() => OCTAVE_TEXTS[this.language.lang()]);

  // ---------- Galeries : une liste par endroit de la page ----------
  // computed : les textes alternatifs changent avec la langue, les images restent les mêmes.

  public readonly pictures = computed(() => {
    const alt = this.texts().alts;
    return {
      home: [
        picture('home-page.png', alt.home_page),
        picture('solo-game.png', alt.solo_game),
      ],

      diagrams: [
        picture('use-case-diag.png', alt.use_case),
        picture('diag-sequence-therapeute.png', alt.sequence_staff),
        picture('diag-sequence-user.png', alt.sequence_participant),
      ],

      model: [
        picture('octave-maquette.png', alt.mockup_home),
        picture('solo-game-maquette.png', alt.mockup_solo),
        picture('octave-config-maquette.png', alt.mockup_config),
        picture('statistique-utilisateur-maquette.png', alt.mockup_participant_stats_1),
        picture('statistique-utilisateur-maquette-2.png', alt.mockup_participant_stats_2),
        picture('statistique-utilisateur-maquette-3.png', alt.mockup_participant_stats_3),
        picture('quiz-score-maquette.png', alt.mockup_quiz_score),
        picture('statistic-quiz-maquette.png', alt.mockup_quiz_stats),
        picture('matrio.png', alt.matrio),
      ],

      play_without_frustration: [
        picture('solo-game.png', alt.solo_hint),
        picture('game-solo-good-answer.png', alt.solo_right_answer),
        picture('game-solo-answer-removed.png', alt.solo_answer_removed),
        picture('game-solo-rappel.png', alt.solo_reminder),
        picture('game-solo-congrats.png', alt.solo_congrats),
      ],

      configuration: [
        picture('panel-page.png', alt.admin_panel),
        picture('patient-list.png', alt.participant_list),
        picture('patient-edit.png', alt.participant_edit),
        picture('patient-config.png', alt.participant_config),
        picture('add-patient.png', alt.participant_add),
        picture('admin-quiz-list.png', alt.quiz_list),
        picture('admin-quiz-edit.png', alt.quiz_edit),
      ],

      multiplayer_game_setup: [
        picture('multiplayer-lobby.png', alt.mp_lobby),
        picture('join-multiplayer-page.png', alt.mp_join),
        picture('players-in-the-room.png', alt.mp_players),
      ],

      multiplayer_in_game: [
        picture('multiplayer-game.png', alt.mp_host),
        picture('multi-quiz-admin-view-hints.png', alt.mp_host_hints),
        picture('multiplayer-game-right.png', alt.mp_right),
        picture('multiplayer-failed.png', alt.mp_wrong),
      ],

      multiplayer_game_end: [
        picture('multiquiz-end.png', alt.mp_end),
        picture('replay-1.png', alt.mp_replay),
        picture('multiplayer-game-leaderboard.png', alt.mp_leaderboard),
      ],

      quiz_stats: [
        picture('quiz-stats-page.png', alt.quiz_stats),
        picture('multiplayer-session-stats.png', alt.session_stats),
        picture('multiplayer-leader-board.png', alt.session_leaderboard),
      ],

      participant_stats: [
        picture('patient-stats.png', alt.participant_global),
        picture('patient-evolution-stats.png', alt.participant_evolution),
        picture('patient-quiz-history.png', alt.participant_history),
      ],
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