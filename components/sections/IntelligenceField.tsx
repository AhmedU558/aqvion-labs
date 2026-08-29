"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brandAssets } from "@/data/site";
import {
  buildField,
  DEPTH_PLATES,
  DESKTOP_PATHS,
  MOBILE_PATHS,
  pointAt,
  RING_ARCS,
  RING_TICKS,
  type BuiltPath,
  type FieldLayout,
  type Vec2,
} from "@/lib/intelligence-field";

/* ---------------------------------------------------------------- palette --
   Colours are read from the design tokens rather than restated here, so the
   canvas and the DOM can never drift apart. */

type RGB = [number, number, number];

function hexToRgb(hex: string, fallback: RGB): RGB {
  const value = hex.trim().replace("#", "");
  if (value.length !== 6) return fallback;
  const n = Number.parseInt(value, 16);
  if (Number.isNaN(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Palette = {
  primary: RGB;
  secondary: RGB;
  accent: RGB;
  silver: RGB;
};

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: RGB) => hexToRgb(s.getPropertyValue(name), fallback);

  return {
    primary: read("--color-primary", [21, 82, 240]),
    secondary: read("--color-secondary", [139, 79, 248]),
    accent: read("--color-accent", [47, 184, 255]),
    silver: read("--color-silver", [201, 208, 221]),
  };
}

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

type Pulse = { path: BuiltPath; d: number; out: boolean };
type Rect = [number, number, number, number];

const HEAD_SPRITE = 22;
const MAX_PARALLAX = 11;

/* ------------------------------------------------------------- structure -- */

/**
 * Paints every static element of the field. Runs once per layout change and
 * never during animation — afterwards this canvas is a pure composited layer.
 */
function drawStructure(
  ctx: CanvasRenderingContext2D,
  layout: FieldLayout,
  palette: Palette,
  width: number,
  height: number,
) {
  const { cx, cy, r, paths, nodes } = layout;
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;

  /* Layer 3 — depth planes. Trapezoids read as surfaces at a shallow angle. */
  for (const plate of DEPTH_PLATES) {
    ctx.beginPath();
    plate.points.forEach(([ux, uy], i) => {
      const x = cx + ux * r;
      const y = cy + uy * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = rgba(palette.primary, 0.014 * plate.alpha);
    ctx.fill();
    ctx.strokeStyle = rgba(palette.primary, 0.1 * plate.alpha);
    ctx.stroke();
  }

  /* Alignment arcs around the emblem. */
  for (const [radius, from, to] of RING_ARCS) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius * r, (from * Math.PI) / 180, (to * Math.PI) / 180);
    ctx.strokeStyle = rgba(palette.silver, radius > 1.5 ? 0.09 : 0.15);
    ctx.stroke();
  }

  /* Instrumentation ticks — long every 45°, short every 7.5°. */
  const tickR = RING_TICKS * r;
  for (let deg = 0; deg < 360; deg += 7.5) {
    const major = deg % 45 === 0;
    const len = major ? r * 0.11 : r * 0.045;
    const a = (deg * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    ctx.beginPath();
    ctx.moveTo(cx + cos * tickR, cy + sin * tickR);
    ctx.lineTo(cx + cos * (tickR + len), cy + sin * (tickR + len));
    ctx.strokeStyle = rgba(palette.silver, major ? 0.2 : 0.075);
    ctx.stroke();
  }

  /* Frame brackets, anchored to the canvas rather than to the emblem. */
  const insetX = width * 0.045;
  const insetY = height * 0.07;
  const arm = Math.min(34, width * 0.03);
  ctx.strokeStyle = rgba(palette.silver, 0.13);
  const corners: [number, number, number, number][] = [
    [insetX, insetY, 1, 1],
    [width - insetX, insetY, -1, 1],
    [insetX, height - insetY, 1, -1],
    [width - insetX, height - insetY, -1, -1],
  ];
  for (const [x, y, sx, sy] of corners) {
    ctx.beginPath();
    ctx.moveTo(x + sx * arm, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + sy * arm);
    ctx.stroke();
  }

  /* Layer 4 — data paths. Each fades in from the outside and brightens towards
     the emblem, so the direction of flow reads even when nothing is moving. */
  for (const path of paths) {
    const tail = path.pts[0];
    const head = path.pts[path.pts.length - 1];
    const tone = path.flow === "out" ? palette.secondary : palette.primary;
    const tip = path.flow === "out" ? palette.secondary : palette.accent;

    const gradient = ctx.createLinearGradient(tail[0], tail[1], head[0], head[1]);
    gradient.addColorStop(0, rgba(tone, 0));
    gradient.addColorStop(0.35, rgba(tone, 0.13 * path.intensity));
    gradient.addColorStop(1, rgba(tip, 0.4 * path.intensity));

    ctx.beginPath();
    ctx.moveTo(tail[0], tail[1]);
    for (let i = 1; i < path.pts.length; i += 1) ctx.lineTo(path.pts[i][0], path.pts[i][1]);
    ctx.strokeStyle = gradient;
    ctx.stroke();
  }

  /* Layer 5 — junction and terminal nodes. */
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.terminal ? 3.2 : 2.4, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(palette.silver, node.terminal ? 0.3 : 0.18);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = rgba(node.terminal ? palette.accent : palette.silver, 0.42);
    ctx.fill();
  }
}

/** Pre-rendered pulse head — cheaper and crisper than a per-frame gradient. */
function makeHead(color: RGB, dpr: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = HEAD_SPRITE * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.scale(dpr, dpr);
  const mid = HEAD_SPRITE / 2;
  const g = ctx.createRadialGradient(mid, mid, 0, mid, mid, mid);
  g.addColorStop(0, rgba(color, 0.95));
  g.addColorStop(0.2, rgba(color, 0.45));
  g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, HEAD_SPRITE, HEAD_SPRITE);
  return canvas;
}

/* -------------------------------------------------------------- component -- */

export function IntelligenceField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const emblemInnerRef = useRef<HTMLDivElement>(null);
  const structureRef = useRef<HTMLCanvasElement>(null);
  const flowRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const structure = structureRef.current;
    const flow = flowRef.current;
    const emblem = emblemRef.current;
    if (!root || !structure || !flow || !emblem) return;

    const sctx = structure.getContext("2d");
    const fctx = flow.getContext("2d");
    if (!sctx || !fctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const palette = readPalette();
    const dpr = Math.min(window.devicePixelRatio || 1, compact.matches ? 1.5 : 2);
    const heads = { in: makeHead(palette.accent, dpr), out: makeHead(palette.secondary, dpr) };

    let layout: FieldLayout | null = null;
    let pulses: Pulse[] = [];
    let dirty: Rect[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let running = false;
    let parallaxOn = finePointer.matches && !reduceMotion;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    /* --- layout ---------------------------------------------------------- */

    const measure = (): boolean => {
      const rect = root.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width === 0 || height === 0) return false;

      for (const canvas of [structure, flow]) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mark = emblem.getBoundingClientRect();
      const radius = mark.width / 2;
      if (radius < 8) return false;

      layout = buildField(
        compact.matches ? MOBILE_PATHS : DESKTOP_PATHS,
        mark.left - rect.left + radius,
        mark.top - rect.top + radius,
        radius,
        width,
        height,
      );

      pulses = [];
      for (const path of layout.paths) {
        for (let i = 0; i < path.pulses; i += 1) {
          pulses.push({ path, d: (path.length / path.pulses) * i, out: path.flow === "out" });
        }
      }

      drawStructure(sctx, layout, palette, width, height);
      fctx.clearRect(0, 0, width, height);
      dirty = [];
      return true;
    };

    /* --- flow ------------------------------------------------------------ */

    const drawPulse = (pulse: Pulse) => {
      const { path } = pulse;
      /* Outbound pulses run backwards along the authored point order, because
         paths are always authored outermost-first. */
      const head = pulse.out ? path.length - pulse.d : pulse.d;
      const steps = 6;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      const track = (p: Vec2) => {
        if (p[0] < minX) minX = p[0];
        if (p[1] < minY) minY = p[1];
        if (p[0] > maxX) maxX = p[0];
        if (p[1] > maxY) maxY = p[1];
      };

      let previous = pointAt(path, head);
      track(previous);

      fctx.lineWidth = 1.4;
      fctx.lineCap = "round";
      const tone = pulse.out ? palette.secondary : palette.accent;

      for (let i = 1; i <= steps; i += 1) {
        const back = (path.trail / steps) * i;
        const d = pulse.out ? head + back : head - back;
        if (d < 0 || d > path.length) break;

        const point = pointAt(path, d);
        fctx.beginPath();
        fctx.moveTo(previous[0], previous[1]);
        fctx.lineTo(point[0], point[1]);
        fctx.strokeStyle = rgba(tone, 0.5 * (1 - i / steps) ** 1.6);
        fctx.stroke();
        previous = point;
        track(point);
      }

      const hp = pointAt(path, head);
      fctx.drawImage(
        pulse.out ? heads.out : heads.in,
        hp[0] - HEAD_SPRITE / 2,
        hp[1] - HEAD_SPRITE / 2,
        HEAD_SPRITE,
        HEAD_SPRITE,
      );
      dirty.push([minX - 14, minY - 14, maxX - minX + 28, maxY - minY + 28]);

      /* Nodes acknowledge a pulse passing — the system reacting to itself. */
      if (layout) {
        for (const node of layout.nodes) {
          if (Math.abs(node.x - hp[0]) < 16 && Math.abs(node.y - hp[1]) < 16) node.glow = 1;
        }
      }
    };

    const drawNodeGlow = (dt: number) => {
      if (!layout) return;
      for (const node of layout.nodes) {
        if (node.glow <= 0.02) continue;
        node.glow = Math.max(0, node.glow - dt * 1.4);

        const radius = 8;
        const g = fctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
        g.addColorStop(0, rgba(node.terminal ? palette.accent : palette.silver, 0.5 * node.glow));
        g.addColorStop(1, rgba(palette.accent, 0));
        fctx.fillStyle = g;
        fctx.fillRect(node.x - radius, node.y - radius, radius * 2, radius * 2);
        dirty.push([node.x - radius - 2, node.y - radius - 2, radius * 2 + 4, radius * 2 + 4]);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      /* Only the regions touched last frame are cleared — the field never
         repaints as a whole. */
      for (const rect of dirty) fctx.clearRect(rect[0], rect[1], rect[2], rect[3]);
      dirty = [];

      if (parallaxOn) {
        current.x += (target.x - current.x) * 0.06;
        current.y += (target.y - current.y) * 0.06;
        const shift = (el: HTMLElement | null, factor: number) => {
          if (el) {
            el.style.transform = `translate3d(${current.x * factor}px, ${current.y * factor}px, 0)`;
          }
        };
        shift(gridRef.current, 0.35);
        shift(planeRef.current, 0.75);
        shift(emblemInnerRef.current, 1.2);
      }

      for (const pulse of pulses) {
        pulse.d += pulse.path.speed * dt;
        if (pulse.d > pulse.path.length) pulse.d = 0;
        drawPulse(pulse);
      }
      drawNodeGlow(dt);

      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    /** Reduced motion still gets a composed field — it simply does not move. */
    const drawStill = () => {
      for (const pulse of pulses) drawPulse(pulse);
      dirty = [];
    };

    /* --- lifecycle -------------------------------------------------------- */

    const ready = measure();
    if (ready) {
      if (reduceMotion) drawStill();
      else start();
    } else {
      /* Layout can settle a frame late; try once more before giving up. */
      window.requestAnimationFrame(() => {
        if (!measure()) return;
        if (reduceMotion) drawStill();
        else start();
      });
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!parallaxOn || event.pointerType !== "mouse") return;
      target.x = (event.clientX / window.innerWidth - 0.5) * 2 * MAX_PARALLAX;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2 * MAX_PARALLAX;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const relayout = () => {
      if (measure() && reduceMotion) drawStill();
    };

    const resizeObserver = new ResizeObserver(relayout);
    resizeObserver.observe(root);

    /* Nothing animates while the hero is scrolled away or the tab is hidden. */
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    intersectionObserver.observe(root);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerCapability = () => {
      parallaxOn = finePointer.matches && !reduceMotion;
      if (parallaxOn) return;
      for (const el of [gridRef.current, planeRef.current, emblemInnerRef.current]) {
        if (el) el.style.transform = "";
      }
    };
    finePointer.addEventListener("change", onPointerCapability);
    compact.addEventListener("change", relayout);

    /* The activation sequence plays once per session; clearing the flag once it
       has finished stops it replaying on a client-side return to this route. */
    const introTimer = window.setTimeout(() => {
      delete document.documentElement.dataset.heroIntro;
    }, 2600);

    return () => {
      stop();
      window.clearTimeout(introTimer);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      finePointer.removeEventListener("change", onPointerCapability);
      compact.removeEventListener("change", relayout);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="hero-field">
      {/* Layer 2 — the technical substrate. */}
      <div ref={gridRef} className="hero-field__grid" />

      {/* Layers 3–5 — structures, data paths and nodes. */}
      <div ref={planeRef} className="hero-field__plane">
        <canvas ref={structureRef} className="hero-field__canvas" />
        <canvas ref={flowRef} className="hero-field__canvas" />
      </div>

      {/* Focal layer — the emblem, and the activation that resolves around it. */}
      <div ref={emblemRef} className="hero-field__emblem">
        <div ref={emblemInnerRef} className="hero-field__emblem-inner">
          <span className="hero-field__halo" />
          <span className="hero-field__spark" />
          <span className="hero-field__scan hero-field__scan--a" />
          <span className="hero-field__scan hero-field__scan--b" />
          <Image
            src={brandAssets.mark}
            alt=""
            width={brandAssets.intrinsicSize}
            height={brandAssets.intrinsicSize}
            priority
            sizes="(max-width: 767px) 140px, (max-width: 1279px) 224px, 288px"
            className="hero-field__mark"
          />
          <span className="hero-field__sweep" />
        </div>
      </div>
    </div>
  );
}
