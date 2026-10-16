import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

type RevealDirection = 'up' | 'left' | 'right';

/**
 * Joue une animation d'apparition (fondu + glissement) la première fois
 * que l'élément entre dans l'écran, puis le laisse affiché.
 *
 * Usage : <div appReveal [revealDelay]="150"></div>
 *
 * Éléments en verre dépoli (backdrop-filter) : ne fais jamais passer l'opacité d'un PARENT
 * en dessous de 1. Un parent à opacité < 1 devient la "racine" du flou, et le verre n'a plus
 * rien à flouter tant que l'animation n'est pas finie. Utilise alors `revealTarget` pour
 * animer directement l'élément en verre :
 *
 *   <app-about-me-card appReveal revealTarget=".card-container"></app-about-me-card>
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {

  @Input()
  revealDelay: number = 0; // en ms : sert à décaler les éléments les uns des autres

  @Input()
  revealDirection: RevealDirection = 'up';

  @Input()
  revealDistance: number = 30; // en px

  @Input()
  revealThreshold: number = 0.15; // part de l'élément visible qui déclenche l'animation (0 à 1)

  @Input()
  revealTarget?: string; // sélecteur CSS de l'élément à animer, à la place de l'hôte

  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const host = this.host.nativeElement;
    const target = (this.revealTarget ? host.querySelector<HTMLElement>(this.revealTarget) : null) ?? host;

    // rendu serveur, vieux navigateur ou animations réduites : l'élément reste simplement visible
    if (
      typeof IntersectionObserver === 'undefined'
      || typeof target.animate !== 'function'
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    target.style.opacity = '0'; // caché jusqu'à l'arrivée à l'écran

    // on observe l'hôte (qui ne bouge pas), on anime la cible
    this.observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      this.observer?.disconnect(); // une seule fois
      this.play(target);
    }, { threshold: this.revealThreshold });

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private play(target: HTMLElement): void {
    const distance = this.revealDistance;
    const offsets: Record<RevealDirection, string> = {
      up: `translateY(${distance}px)`,
      left: `translateX(${-distance}px)`,
      right: `translateX(${distance}px)`,
    };

    target.style.opacity = ''; // l'animation prend le relais

    target.animate(
      [
        { opacity: 0, transform: offsets[this.revealDirection] },
        { opacity: 1, transform: 'none' },
      ],
      {
        duration: 600,
        delay: this.revealDelay,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        // "backwards" : l'élément reste caché pendant le délai, puis l'animation le lâche à la fin.
        // Rien ne bloque donc un :hover ou un transform défini en CSS (contrairement à "forwards").
        fill: 'backwards',
      },
    );
  }
}