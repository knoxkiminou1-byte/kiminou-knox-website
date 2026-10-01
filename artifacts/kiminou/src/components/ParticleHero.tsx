import { useEffect, useRef } from "react";

/**
 * ParticleHero — Kiminou Knox's signature particle portrait.
 *
 * Ported from the static concept site (kiminou-knox-site/js/hero-face.js).
 * Thousands of 2D-canvas particles fly in and build his chest-up portrait,
 * wave hi, freeze — then the visitor can tap (explode / vortex / wave) or
 * drag to spin it. 2D canvas by design: keeps the single-WebGL-context rule.
 * Reduced-motion visitors get the clean still portrait. No WebGL, no libs.
 */
export default function ParticleHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const still = stillRef.current;
    const replayBtn = replayRef.current;
    const skipBtn = skipRef.current;
    if (!stage || !canvas) return;

    const reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stageEl: HTMLDivElement = stage;
    const canvasEl: HTMLCanvasElement = canvas;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) {
      if (still) still.hidden = false;
      canvasEl.style.display = "none";
      return;
    }
    // Non-null alias: narrowing is lost inside nested function declarations.
    const paint: CanvasRenderingContext2D = ctx;

    interface Particle {
      tx: number; ty: number; nx: number; ny: number; arm: number;
      ax: number; ay: number;
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      delay: number; c: string; s: number;
    }

    let P: Particle[] = [];
    let W = 0, H = 0, DPR = 1, CX = 0, CY = 0, UNIT = 0, CELL = 1;
    let phase: "idle" | "assemble" | "wave" | "freeze" | "play" = "idle";
    let phaseT = 0, running = false, started = false, visible = true;
    let playT = 0;
    let figW = 1, figS = 1;
    let rx = 0, ry = 0, trx = 0, try_ = 0;
    let effect: "idle" | "explode" | "vortex" | "wavefx" | "reform" = "idle";
    let effectT = 0;
    const cycle = ["explode", "vortex", "wavefx"] as const;
    let cycleI = 0;
    let floatT = 0;
    let raf = 0;
    let disposed = false;

    function size() {
      const r = stageEl.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvasEl.width = Math.round(W * DPR);
      canvasEl.height = Math.round(H * DPR);
      paint.setTransform(DPR, 0, 0, DPR, 0, 0);
      CX = W / 2; CY = H / 2; UNIT = Math.min(W, H);
    }

    function build(src: HTMLImageElement): boolean {
      const coarse =
        (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) || W < 480;
      // Adaptive particle budget: don't punish weaker phones.
      // high-end → full portrait · mid → reduced · low → (handled by still fallback)
      let SW = 112;
      try {
        const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
        const cores = navigator.hardwareConcurrency || 8;
        if ((mem && mem <= 4) || cores <= 4) SW = 80;
        if ((mem && mem <= 2) || cores <= 2) SW = 64;
        else if (coarse && SW > 80) SW = 80;
      } catch { SW = coarse ? 80 : 112; }
      const SH = Math.max(1, Math.round((SW * src.height) / src.width));
      const off = document.createElement("canvas");
      off.width = SW; off.height = SH;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return false;
      octx.imageSmoothingEnabled = true;
      octx.drawImage(src, 0, 0, SW, SH);
      let data: Uint8ClampedArray;
      try {
        data = octx.getImageData(0, 0, SW, SH).data;
      } catch {
        return false;
      }
      const S = H * 0.94, half = S / 2;
      const figW_ = S * (SW / SH);
      void half;
      CELL = figW_ / SW;
      figW = figW_; figS = S;
      P = [];
      for (let y = 0; y < SH; y++) {
        for (let x = 0; x < SW; x++) {
          const i = (y * SW + x) * 4;
          if (data[i + 3] < 128) continue;
          const tx = (x / (SW - 1) - 0.5) * figW_;
          const ty = (y / (SH - 1) - 0.5) * S;
          const nx = x / (SW - 1), ny = y / (SH - 1);
          const arm =
            nx >= 0.075 && nx <= 0.315 && ny >= 0.44 && ny < 0.65 ? 1
            : nx >= 0.085 && nx <= 0.27 && ny >= 0.64 ? 2 : 0;
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          const R = H * (0.55 + Math.random() * 0.6);
          P.push({
            tx, ty, nx, ny, arm,
            ax: tx, ay: ty,
            x: R * Math.sin(ph) * Math.cos(th),
            y: R * Math.sin(ph) * Math.sin(th),
            z: R * Math.cos(ph),
            vx: 0, vy: 0, vz: 0,
            delay: (y / SH) * 0.6 + Math.random() * 0.15,
            c: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`,
            s: 0.85 + Math.random() * 0.35,
          });
        }
      }
      return P.length > 200;
    }

    function easeIO(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    const SH_J = { x: 0.183, y: 0.5 }, EL_J = { x: 0.163, y: 0.621 };
    const RAISE = (120 * Math.PI) / 180, WAVAMP = (22 * Math.PI) / 180;
    function waveAngles() {
      let A = 0, B = 0;
      if (phase === "wave") {
        const t = phaseT;
        if (t < 0.6) A = RAISE * easeIO(t / 0.6);
        else if (t < 1.9) { A = RAISE; B = Math.sin((t - 0.6) * Math.PI * 5) * WAVAMP; }
        else { A = RAISE; B = Math.sin(1.3 * Math.PI * 5) * WAVAMP * Math.max(0, 1 - (t - 1.9) / 0.4); }
      } else if (phase === "freeze") { A = RAISE; B = 0; }
      else if (phase === "play" && playT < 1.2) { A = RAISE * (1 - easeIO(playT / 1.2)); }
      else if (effect === "wavefx") {
        const e = effectT;
        if (e < 0.4) A = RAISE * easeIO(e / 0.4);
        else if (e < 1.6) { A = RAISE; B = Math.sin((e - 0.4) * Math.PI * 5) * WAVAMP; }
        else A = RAISE * (1 - easeIO(Math.min(1, (e - 1.6) / 0.6)));
      }
      return { A, B };
    }
    function poseArm(A: number, B: number) {
      const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
      const Epx = (EL_J.x - SH_J.x) * cA - (EL_J.y - SH_J.y) * sA + SH_J.x;
      const Epy = (EL_J.x - SH_J.x) * sA + (EL_J.y - SH_J.y) * cA + SH_J.y;
      for (const p of P) {
        if (!p.arm) continue;
        const px = p.nx - SH_J.x, py = p.ny - SH_J.y;
        let qx = px * cA - py * sA + SH_J.x;
        let qy = px * sA + py * cA + SH_J.y;
        if (p.arm === 2) {
          const fx = qx - Epx, fy = qy - Epy;
          qx = fx * cB - fy * sB + Epx;
          qy = fx * sB + fy * cB + Epy;
        }
        p.ax = (qx - 0.5) * figW;
        p.ay = (qy - 0.5) * figS;
      }
    }

    let cosY = 1, sinY = 0, cosX = 1, sinX = 0;
    const tmp = { x: 0, y: 0, s: 1 };
    function rot(px: number, py: number, pz: number) {
      const x1 = px * cosY + pz * sinY, z1 = -px * sinY + pz * cosY;
      const y1 = py * cosX - z1 * sinX, z2 = py * sinX + z1 * cosX;
      const f = 900, sc = f / (f + z2 + 300);
      tmp.x = CX + x1 * sc; tmp.y = CY + y1 * sc; tmp.s = sc;
    }

    function draw() {
      paint.clearRect(0, 0, W, H);
      cosY = Math.cos(ry); sinY = Math.sin(ry);
      cosX = Math.cos(rx); sinX = Math.sin(rx);
      for (const p of P) {
        rot(p.x, p.y, p.z);
        const sz = Math.max(0.6, CELL * p.s * tmp.s);
        paint.fillStyle = p.c;
        paint.fillRect(tmp.x - sz / 2, tmp.y - sz / 2, sz, sz);
      }
    }

    function stepAssemble(dt: number) {
      phaseT += dt;
      let done = true;
      for (const p of P) {
        const lt = (phaseT - p.delay) / 2.4;
        if (lt < 1) done = false;
        const k = easeIO(Math.min(Math.max(lt, 0), 1));
        p.x += (p.tx - p.x) * Math.min(1, dt * 3 * k + (k >= 1 ? 1 : 0));
        p.y += (p.ty - p.y) * Math.min(1, dt * 3 * k + (k >= 1 ? 1 : 0));
        p.z += (0 - p.z) * Math.min(1, dt * 3 * k + (k >= 1 ? 1 : 0));
        if (k >= 1) { p.x = p.tx; p.y = p.ty; p.z = 0; }
      }
      if (done || phaseT > 3.6) { phase = "wave"; phaseT = 0; }
    }

    function physics(dt: number) {
      floatT += dt;
      const waving =
        phase === "wave" || phase === "freeze" || effect === "wavefx" ||
        (phase === "play" && playT < 1.2);
      const wa = waving ? waveAngles() : null;
      if (wa && (wa.A !== 0 || wa.B !== 0)) poseArm(wa.A, wa.B);
      const k = 0.055, d = 0.9;
      // finger-repel, computed once per frame while touching
      const repelling = repel.active && phase === "play" && effect !== "explode" && effect !== "vortex";
      const RR = H * 0.16, RF = H * 0.09;
      for (const p of P) {
        if (repelling) {
          const rdx = p.x - repel.x, rdy = p.y - repel.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy) + 1;
          if (rdist < RR) {
            const f = (1 - rdist / RR) * RF;
            p.vx += (rdx / rdist) * f;
            p.vy += (rdy / rdist) * f;
          }
        }
        if (effect === "explode") {
          // FULL SEPARATION, Megamind-style: the portrait truly dissolves —
          // particles fly far in every direction, hang scattered, then reform.
          p.vx *= 0.985; p.vy *= 0.985; p.vz *= 0.985; // light brake: let them travel
          p.vy += H * 0.0016 * dt; // faint gravity while scattered
        } else if (effect === "vortex") {
          const dx = p.x, dy = p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 1;
          const tang = H * 0.4 * dt, inward = 1.2 * dt;
          p.vx += (-dy / dist) * tang - dx * inward;
          p.vy += (dx / dist) * tang - dy * inward;
          p.vx *= 0.94; p.vy *= 0.94;
        } else if (wa && p.arm && (wa.A !== 0 || wa.B !== 0)) {
          p.vx += (p.ax - p.x) * 0.22; p.vy += (p.ay - p.y) * 0.22; p.vz += (0 - p.z) * 0.22;
          p.vx *= 0.62; p.vy *= 0.62; p.vz *= 0.62;
        } else {
          const bx = p.tx, by = p.ty + Math.sin(floatT * 1.6 + p.tx * 0.02) * H * 0.004;
          p.vx += (bx - p.x) * k; p.vy += (by - p.y) * k; p.vz += (0 - p.z) * k;
          p.vx *= d; p.vy *= d; p.vz *= d;
        }
        p.x += p.vx * 60 * dt; p.y += p.vy * 60 * dt; p.z += p.vz * 60 * dt;
      }
      if (effect === "explode" && effectT > 2.4) effect = "idle";
      if (effect === "vortex" && effectT > 1.7) effect = "idle";
      if (effect === "wavefx" && effectT > 2.2) effect = "idle";
    }

    function trigger() {
      if (phase !== "play") return;
      if (reduced) {
        trx = 0.14; try_ = -0.14;
        setTimeout(() => { trx = 0; try_ = 0; }, 600);
        return;
      }
      const fx = cycle[cycleI % cycle.length];
      cycleI++;
      effect = fx; effectT = 0;
      if (fx === "explode") {
        // full-separation launch: fast radial burst in all three axes
        for (const p of P) {
          const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z) + 1;
          const sp = H * (0.022 + Math.random() * 0.034);
          p.vx = (p.x / dist) * sp;
          p.vy = (p.y / dist) * sp - H * 0.006;
          p.vz = (p.z / dist) * sp + (Math.random() - 0.5) * H * 0.02;
        }
      }
    }

    // Finger-repel: dragging through the portrait pushes particles away live.
    // World-space pointer (stage coords centered); active while pressed.
    const repel = { x: 0, y: 0, active: false };
    function repelPoint(e: PointerEvent) {
      const r = stageEl.getBoundingClientRect();
      repel.x = e.clientX - r.left - r.width / 2;
      repel.y = e.clientY - r.top - r.height / 2;
    }

    let pdown: { x: number; y: number; t: number; moved: boolean } | null = null;
    const onPointerDown = (e: PointerEvent) => {
      pdown = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
      repelPoint(e);
      repel.active = true;
      try { stageEl.setPointerCapture(e.pointerId); } catch { /* noop */ }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pdown) return;
      repelPoint(e);
      const dx = e.clientX - pdown.x, dy = e.clientY - pdown.y;
      if (Math.abs(dx) + Math.abs(dy) > 8) pdown.moved = true;
      if (pdown.moved && phase === "play") {
        try_ = Math.max(-0.9, Math.min(0.9, try_ + dx * 0.004));
        trx = Math.max(-0.9, Math.min(0.9, trx + dy * 0.004));
        pdown.x = e.clientX; pdown.y = e.clientY;
      }
    };
    const onPointerUp = () => {
      if (!pdown) return;
      const quick = performance.now() - pdown.t < 350;
      if (!pdown.moved && quick) trigger();
      pdown = null;
      repel.active = false;
    };
    const onPointerCancel = () => { pdown = null; repel.active = false; };
    const onReplay = (e: MouseEvent) => {
      e.stopPropagation();
      startIntro();
    };
    const onSkip = (e: MouseEvent) => {
      e.stopPropagation();
      snapToPlay();
    };

    stageEl.addEventListener("pointerdown", onPointerDown);
    stageEl.addEventListener("pointermove", onPointerMove);
    stageEl.addEventListener("pointerup", onPointerUp);
    stageEl.addEventListener("pointercancel", onPointerCancel);
    if (replayBtn) replayBtn.addEventListener("click", onReplay);
    if (skipBtn) skipBtn.addEventListener("click", onSkip);

    let last = 0;
    function frame(now: number) {
      if (!running || disposed) return;
      raf = requestAnimationFrame(frame);
      if (!visible) { last = now; return; }
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      rx += (trx - rx) * Math.min(1, dt * 8);
      ry += (try_ - ry) * Math.min(1, dt * 8);
      if (!reduced) {
        if (phase === "assemble") stepAssemble(dt);
        else if (phase === "wave") {
          phaseT += dt; physics(dt);
          if (phaseT > 2.3) { phase = "freeze"; phaseT = 0; }
        } else if (phase === "freeze") {
          phaseT += dt; physics(dt);
          if (phaseT > 0.8) {
            phase = "play"; effect = "idle"; playT = 0;
            if (replayBtn) replayBtn.hidden = false;
            if (skipBtn) skipBtn.hidden = true;
            markSeen();
          }
        } else if (phase === "play") { effectT += dt; playT += dt; physics(dt); }
      } else if (phase === "play") {
        physics(dt * 0.3);
      }
      draw();
    }

    function markSeen() {
      try { localStorage.setItem("kk-hero-seen", "1"); } catch { /* noop */ }
    }
    function hasSeen() {
      try { return localStorage.getItem("kk-hero-seen") === "1"; } catch { return false; }
    }

    // Jump straight to the assembled portrait ("welcome back" for returners,
    // or when the visitor skips the intro performance).
    function snapToPlay() {
      for (const p of P) { p.x = p.tx; p.y = p.ty; p.z = 0; p.vx = p.vy = p.vz = 0; }
      rx = ry = trx = try_ = 0;
      effect = "idle"; cycleI = 0;
      phase = "play"; phaseT = 0; playT = 99; // 99: no auto re-wave on arrival
      if (replayBtn) replayBtn.hidden = false;
      if (skipBtn) skipBtn.hidden = true;
      markSeen();
    }

    function startIntro() {
      for (const p of P) {
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        const R = H * (0.55 + Math.random() * 0.6);
        p.x = R * Math.sin(ph) * Math.cos(th);
        p.y = R * Math.sin(ph) * Math.sin(th);
        p.z = R * Math.cos(ph);
        p.vx = p.vy = p.vz = 0;
      }
      rx = ry = trx = try_ = 0;
      effect = "idle"; cycleI = 0;
      // Returning visitor: first load was the "wow", this one is "welcome back".
      if (!reduced && hasSeen()) { snapToPlay(); return; }
      phase = reduced ? "play" : "assemble";
      phaseT = 0;
      playT = reduced ? 99 : 0;
      if (replayBtn) replayBtn.hidden = true;
      if (skipBtn) skipBtn.hidden = reduced;
      if (reduced) {
        for (const p of P) { p.x = p.tx; p.y = p.ty; p.z = 0; }
        if (replayBtn) replayBtn.hidden = false;
      }
    }

    const onResize = () => size();

    function boot() {
      if (started || disposed) return;
      started = true;
      size();
      const img = new Image();
      img.onload = () => {
        if (disposed) return;
        if (!build(img)) {
          if (still) still.hidden = false;
canvasEl.style.display = "none";
          return;
        }
        window.addEventListener("resize", onResize);
        startIntro();
        running = true;
        raf = requestAnimationFrame((n) => { last = n; frame(n); });
      };
      img.onerror = () => {
        if (still) still.hidden = false;
canvasEl.style.display = "none";
      };
      img.src = "/hero/avatar-bust.png";
    }

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (es) => es.forEach((en) => { visible = en.isIntersecting; }),
        { threshold: 0.05 }
      );
      observer.observe(stage);
    }

    // Boot once the hero is on screen (or immediately if already visible).
    let booted = false;
    const bootHolder: { ob: IntersectionObserver | null } = { ob: null };
    bootHolder.ob =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (es) => {
              if (es.some((en) => en.isIntersecting) && !booted) {
                booted = true;
                boot();
                bootHolder.ob?.disconnect();
              }
            },
            { threshold: 0.01 }
          )
        : null;
    if (bootHolder.ob) bootHolder.ob.observe(stageEl);
    else boot();
    const fallback = window.setTimeout(() => { if (!booted) { booted = true; boot(); } }, 4000);

    // Pause the loop when the tab is hidden (not just when scrolled away).
    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!disposed && started) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      if (observer) observer.disconnect();
      if (bootHolder.ob) bootHolder.ob.disconnect();
      stageEl.removeEventListener("pointerdown", onPointerDown);
      stageEl.removeEventListener("pointermove", onPointerMove);
      stageEl.removeEventListener("pointerup", onPointerUp);
      stageEl.removeEventListener("pointercancel", onPointerCancel);
      if (replayBtn) replayBtn.removeEventListener("click", onReplay);
      if (skipBtn) skipBtn.removeEventListener("click", onSkip);
    };
  }, []);

  return (
    <section className="kk-hero" aria-label="Kiminou Knox">
      <p className="kk-eyebrow">AUTHOR&nbsp;&nbsp;·&nbsp;&nbsp;ATHLETE&nbsp;&nbsp;·&nbsp;&nbsp;BUILDER</p>
      <div className="kk-face-stage" ref={stageRef}>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
        />
        <img
          ref={stillRef}
          className="kk-face-still"
          src="/hero/avatar-bust.webp"
          alt="Chest-up pixel portrait of Kiminou Knox"
          width={492}
          height={660}
          fetchPriority="high"
          hidden
        />
        <noscript>
          <img
            className="kk-face-still"
            src="/hero/avatar-bust.webp"
            alt="Chest-up pixel portrait of Kiminou Knox"
            width={492}
            height={660}
          />
        </noscript>
        <button ref={replayRef} className="kk-face-replay" type="button" hidden>
          REPLAY
        </button>
        <button ref={skipRef} className="kk-face-skip" type="button" hidden>
          SKIP INTRO
        </button>
      </div>
      <h1 className="kk-hero-title">
        <span className="kk-hero-line">KIMINOU</span>
        <span className="kk-hero-line kk-hero-knox">
          <em>Knox</em>
          <svg className="kk-scribble" viewBox="0 0 220 60" aria-hidden="true">
            <path
              d="M8 44 C 60 8, 120 8, 212 38 M 30 50 C 90 30, 150 26, 200 44"
              fill="none"
              style={{ stroke: "var(--kk-gold-deep)" }}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>
      <p className="kk-hero-sub">
        10 books. Basketball. Business.
      </p>
      <p className="kk-hero-tag">
        Creating the next chapter in public.
      </p>
    </section>
  );
}
