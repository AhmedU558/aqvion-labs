"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A drifting constellation, used as a band background.
 *
 * Deliberately much lighter than the hero's Intelligence Field: that one is the
 * signature composition and earns its cost; this is atmosphere behind a call to
 * action and must be nearly free. So —
 *
 *   - node count scales with width and is capped hard (24 on a phone, 46 wide);
 *   - links are only drawn between nodes already close together, found with a
 *     single O(n²) pass over a small n rather than any spatial index;
 *   - the loop runs only while the band is actually on screen and the tab is
 *     visible, and never at all under `prefers-reduced-motion`, which instead
 *     gets one static frame;
 *   - device pixel ratio is capped at 1.5 — this is a soft blue haze, and the
 *     extra samples of a 3x buffer would not be visible.
 */
export function NetworkBand({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const readRgb = (name: string, fallback: [number, number, number]) => {
      const hex = styles.getPropertyValue(name).trim().replace("#", "");
      if (hex.length !== 6) return fallback;
      const n = Number.parseInt(hex, 16);
      return Number.isNaN(n)
        ? fallback
        : ([(n >> 16) & 255, (n >> 8) & 255, n & 255] as [number, number, number]);
    };

    const primary = readRgb("--color-primary", [21, 82, 240]);
    const accent = readRgb("--color-accent", [47, 184, 255]);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    let raf = 0;
    let last = 0;
    let running = false;

    const LINK_DISTANCE = 132;

    /**
     * Peak drift, in px/sec. Each node takes a random velocity within ±DRIFT/2
     * on both axes, so this is the fastest any single node travels. Lifted
     * alongside the hero field's `PULSE_SPEED_SCALE` so the two read as one
     * site rather than a calm band beside a livelier hero. Frame cost is
     * unchanged — velocity does not affect how much gets drawn.
     */
    const DRIFT = 11;

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width === 0 || height === 0) return false;

      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(14, Math.min(46, Math.round(width / 34)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        /* Still slow enough to be felt rather than watched. */
        vx: (Math.random() - 0.5) * DRIFT,
        vy: (Math.random() - 0.5) * DRIFT,
      }));
      return true;
    }

    function draw(dt: number) {
      ctx!.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance > LINK_DISTANCE) continue;

          /* Links fade out as they stretch, so the mesh breathes. */
          const alpha = (1 - distance / LINK_DISTANCE) * 0.16;
          ctx!.strokeStyle = `rgba(${primary[0]},${primary[1]},${primary[2]},${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(nodes[j].x, nodes[j].y);
          ctx!.stroke();
        }
      }

      for (const node of nodes) {
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 1.3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},0.42)`;
        ctx!.fill();
      }
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
      raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      window.cancelAnimationFrame(raf);
    }

    if (build() && reduceMotion) draw(0);

    const resizeObserver = new ResizeObserver(() => {
      if (build() && reduceMotion) draw(0);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
