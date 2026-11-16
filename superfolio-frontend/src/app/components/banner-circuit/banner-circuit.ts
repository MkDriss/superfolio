import {
  AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, ViewChild, inject,
} from '@angular/core';

type Pt = [number, number];
interface Path { pts: Pt[]; delay: number; dur: number; padi: number; }
interface Pad { x: number; y: number; lit: number; }
interface Pulse { pi: number; sp: number; off: number; last: number; }

/**
 * Bannière animée "carte mère" (ratio 1920x400, fixe).
 *
 * Circuit DÉTERMINISTE (même dessin à chaque chargement, via une graine) :
 * des pistes orthogonales denses sortent de pads disposés autour d'une fenêtre
 * centrale, cheminent à angle droit avec des coudes multiples et rejoignent les
 * bords. Des impulsions parcourent les pistes et s'éteignent aux pads, qu'elles
 * font scintiller. À l'apparition du titre, une onde de choc part du centre.
 * Ensuite la boucle d'impulsions tourne en intensité réduite (lente, discrète).
 *
 * La densité est constante quelle que soit la taille (grille proportionnelle à
 * la largeur), et le ratio ne change pas sur mobile : la bannière rétrécit sans
 * se déformer. Le titre est en HTML par-dessus, dimensionné en container
 * queries et borné à la fenêtre centrale laissée libre par les pads.
 *
 * Déclinable :
 *   - Volet 1 offensif : accent rouge, direction "inward", graine A.
 *   - Volet 2 défensif : accent bleu, direction "outward", graine B.
 *
 * Respecte prefers-reduced-motion (circuit statique + titre immédiat).
 */
@Component({
  selector: 'app-banner-circuit',
  imports: [],
  templateUrl: './banner-circuit.html',
  styleUrl: './banner-circuit.scss',
})
export class BannerCircuit implements AfterViewInit, OnDestroy {

  @Input() accent = '#e24b4a';
  @Input() accentLight = '#f09595';
  @Input() accentDark = '#993c1d';
  @Input() direction: 'inward' | 'outward' = 'inward';

  @Input() kicker = 'PART 1 / OFFENSIVE';
  @Input() title = 'IoT Security Lab';
  @Input() subtitle = 'Breaking Trust';

  /** Graine du circuit : fixe le dessin. Une valeur différente par volet. */
  @Input() seed = 12345;
  /** Nombre de pistes en haut/bas puis sur chaque côté. */
  @Input() densityTB = 16;
  @Input() densityLR = 5;
  /** Largeur et hauteur de la fenêtre centrale (fraction de la bannière). */
  @Input() centerWidth = 0.50;
  @Input() centerHeight = 0.50;

  @ViewChild('cv', { static: true }) cvRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stage', { static: true }) stageRef!: ElementRef<HTMLDivElement>;
  @ViewChild('titleEl', { static: true }) titleRef!: ElementRef<HTMLDivElement>;

  private readonly zone = inject(NgZone);
  private ctx!: CanvasRenderingContext2D;
  private W = 0; private H = 0;
  private cx = 0; private cy = 0;
  private bx = 0; private by = 0; private bw = 0; private bh = 0;
  private paths: Path[] = [];
  private pads: Pad[] = [];
  private pulses: Pulse[] = [];
  private raf = 0;
  private start = 0;
  private shock = 0;
  private titleShown = false;
  private ro?: ResizeObserver;
  private safety?: ReturnType<typeof setTimeout>;
  private reduced = false;

  ngAfterViewInit(): void {
    this.ctx = this.cvRef.nativeElement.getContext('2d')!;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.size();
    this.build();

    if (this.reduced) {
      this.drawStatic();
      this.showTitle();
      return;
    }

    this.ro = new ResizeObserver(() => { this.size(); this.build(); });
    this.ro.observe(this.stageRef.nativeElement);

    // Filet de sécurité : le titre s'affiche de toute façon.
    this.safety = setTimeout(() => this.showTitle(), 1400);

    this.zone.runOutsideAngular(() => {
      this.start = 0;
      this.raf = requestAnimationFrame((t) => this.frame(t));
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    if (this.safety) clearTimeout(this.safety);
  }

  /** Affiche le titre sans dépendre de la détection de changements (DOM direct). */
  private showTitle(): void {
    if (this.titleShown) return;
    this.titleShown = true;
    this.titleRef.nativeElement.classList.add('bc-title--on');
  }

  /** PRNG déterministe (mulberry32) : même graine = même circuit. */
  private makeRng(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  private size(): void {
    const r = this.stageRef.nativeElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = this.cvRef.nativeElement.width = Math.max(1, r.width * dpr);
    this.H = this.cvRef.nativeElement.height = Math.max(1, r.height * dpr);
    this.cx = this.W / 2;
    this.cy = this.H / 2;
  }

  private plen(pts: Pt[]): number {
    let l = 0;
    for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    return l;
  }

  private ptAt(pts: Pt[], f: number): Pt {
    const d = f * this.plen(pts); let acc = 0;
    for (let i = 1; i < pts.length; i++) {
      const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (acc + seg >= d) {
        const t = (d - acc) / seg;
        return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
      }
      acc += seg;
    }
    return pts[pts.length - 1];
  }

  /** Routage orthogonal dense, déterministe. Grille proportionnelle à la largeur. */
  private build(): void {
    const rnd = this.makeRng(this.seed);
    const g = this.W / 64;
    this.bw = this.W * this.centerWidth;
    this.bh = this.H * this.centerHeight;
    this.bx = (this.W - this.bw) / 2;
    this.by = (this.H - this.bh) / 2;
    this.pads = [];
    this.paths = [];
    this.pulses = [];
    this.shock = 0;

    const sides: [string, number][] = [
      ['t', this.densityTB], ['b', this.densityTB], ['l', this.densityLR], ['r', this.densityLR],
    ];
    for (const [k, n] of sides) {
      for (let i = 0; i < n; i++) {
        let px: number, py: number, dir: Pt;
        if (k === 't') { px = this.bx + ((i + 0.5) / n) * this.bw; py = this.by; dir = [0, -1]; }
        else if (k === 'b') { px = this.bx + ((i + 0.5) / n) * this.bw; py = this.by + this.bh; dir = [0, 1]; }
        else if (k === 'l') { px = this.bx; py = this.by + ((i + 0.5) / n) * this.bh; dir = [-1, 0]; }
        else { px = this.bx + this.bw; py = this.by + ((i + 0.5) / n) * this.bh; dir = [1, 0]; }
        this.pads.push({ x: px, y: py, lit: 0 });
        const padi = this.pads.length - 1;

        const sx = px + dir[0] * g * 1.2;
        const sy = py + dir[1] * g * 1.2;
        const pts: Pt[] = [[px, py], [sx, sy]];
        let ppx = sx, ppy = sy;
        const steps = 3 + ((rnd() * 4) | 0);
        for (let s = 0; s < steps; s++) {
          if (dir[0] !== 0) { ppx += dir[0] * g; if (rnd() < 0.5) ppy += (rnd() < 0.5 ? 1 : -1) * g; }
          else { ppy += dir[1] * g; if (rnd() < 0.5) ppx += (rnd() < 0.5 ? 1 : -1) * g; }
          pts.push([ppx, ppy]);
        }
        let ex: number, ey: number;
        if (dir[0] !== 0) { ex = dir[0] < 0 ? 0 : this.W; ey = ppy; } else { ex = ppx; ey = dir[1] < 0 ? 0 : this.H; }
        pts.push([ex, ey]);

        this.paths.push({ pts: pts.reverse(), delay: rnd() * 0.4, dur: 0.6, padi });
      }
    }
    for (let j = 0; j < this.paths.length; j++) {
      if (rnd() < 0.55) this.pulses.push({ pi: j, sp: 0.4 + rnd() * 0.35, off: rnd() * 2, last: 0 });
    }
  }

  private pulseFraction(f: number): number {
    return this.direction === 'inward' ? f : 1 - f;
  }

  private drawPaths(buildProgress: number): number {
    const ctx = this.ctx;
    ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    let done = 0;
    for (const p of this.paths) {
      const pr = Math.max(0, Math.min(1, (buildProgress - p.delay) / p.dur));
      if (pr >= 1) done++;
      const tot = p.pts.length - 1, fp = pr * tot, sg = fp | 0, fr = fp - sg;
      ctx.strokeStyle = this.rgba(this.accentDark, 0.24 + 0.3 * pr);
      ctx.beginPath(); ctx.moveTo(p.pts[0][0], p.pts[0][1]);
      for (let j = 1; j <= sg && j < p.pts.length; j++) ctx.lineTo(p.pts[j][0], p.pts[j][1]);
      if (sg < tot) { const a = p.pts[sg], b = p.pts[sg + 1]; ctx.lineTo(a[0] + (b[0] - a[0]) * fr, a[1] + (b[1] - a[1]) * fr); }
      ctx.stroke();
    }
    return done;
  }

  private drawPads(on: number): void {
    const ctx = this.ctx;
    for (const pd of this.pads) {
      pd.lit *= 0.92;
      const glow = Math.min(1, 0.4 * on + pd.lit);
      ctx.fillStyle = this.rgba(this.accent, glow);
      ctx.fillRect(pd.x - 5, pd.y - 5, 10, 10);
      if (pd.lit > 0.05) {
        ctx.fillStyle = this.rgba(this.accentLight, pd.lit * 0.5);
        ctx.beginPath(); ctx.arc(pd.x, pd.y, 14 * pd.lit, 0, 7); ctx.fill();
      }
    }
  }

  private drawPulses(el: number, intensity: number): void {
    const ctx = this.ctx;
    for (const pu of this.pulses) {
      const pp = this.paths[pu.pi];
      const raw = ((el - 0.9) * pu.sp + pu.off) % 1.2;
      if (raw > 1 || raw < 0) { pu.last = raw; continue; }
      const f = this.pulseFraction(raw);
      const pos = this.ptAt(pp.pts, f);
      const fade = (raw < 0.85 ? 1 : (1 - (raw - 0.85) / 0.15)) * intensity;
      ctx.fillStyle = this.rgba(this.accentLight, fade);
      ctx.beginPath(); ctx.arc(pos[0], pos[1], 4, 0, 7); ctx.fill();
      const tr = this.ptAt(pp.pts, this.pulseFraction(Math.max(0, raw - 0.09)));
      ctx.strokeStyle = this.rgba(this.accent, 0.55 * fade);
      ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(tr[0], tr[1]); ctx.lineTo(pos[0], pos[1]); ctx.stroke();
      if (pu.last < 0.85 && raw >= 0.85) this.pads[pp.padi].lit = 1;
      pu.last = raw;
    }
  }

  /** Onde de choc depuis le centre, déclenchée à la révélation du titre. */
  private drawShock(): void {
    if (this.shock <= 0) return;
    const ctx = this.ctx;
    this.shock += 0.022;
    const rad = this.shock * this.W * 0.7;
    const a1 = Math.max(0, 0.45 - this.shock * 0.9);
    ctx.strokeStyle = this.rgba(this.accent, a1);
    ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(this.cx, this.cy, rad, 0, 7); ctx.stroke();
    const a2 = Math.max(0, 0.25 - this.shock * 0.7);
    ctx.strokeStyle = this.rgba(this.accentLight, a2);
    ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(this.cx, this.cy, rad * 0.7, 0, 7); ctx.stroke();
    if (this.shock > 1) this.shock = 0;
  }

  private drawStatic(): void {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.drawPaths(10);
    this.drawPads(1);
  }

  private frame(ts: number): void {
    if (!this.start) this.start = ts;
    const el = (ts - this.start) / 1000;
    this.ctx.clearRect(0, 0, this.W, this.H);

    const done = this.drawPaths(el);
    this.drawPads(Math.max(0, Math.min(1, (el - 0.5) / 0.6)));

    if (el > 0.9) {
      const intensity = el < 2.8 ? 1 : 0.5;
      this.drawPulses(el, intensity);
    }

    if (done > this.paths.length * 0.7 && !this.titleShown) {
      this.showTitle();
      this.shock = 0.001; // amorce l'onde de choc
    }
    this.drawShock();

    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  private rgba(hex: string, a: number): string {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
}