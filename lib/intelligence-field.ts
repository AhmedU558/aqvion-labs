/**
 * AQVION INTELLIGENCE FIELD — geometry.
 *
 * The field is an architectural systems diagram, not a particle effect. Data
 * enters from the outside, converges on the emblem, and leaves as action:
 *
 *      DATA  ──▶  INTELLIGENCE  ──▶  ACTION
 *
 * Everything is authored in **emblem-radius units** with the origin at the
 * centre of the mark, so the whole composition scales with the emblem and holds
 * its proportions from 375px to 1440px. Segments are drawn on 0°, 45° and 90°
 * only — the angles of a circuit diagram, not of a doodle.
 */

export type Vec2 = [number, number];

/** Rings, in emblem-radius units. */
export const RING_INNER = 1.24;
export const RING_MID = 1.72;
export const RING_TICKS = 2.46;

export type PathSpec = {
  id: string;
  /** Vertices, outermost first, in emblem-radius units (y points down). */
  points: Vec2[];
  /** Trim the final vertex back onto this ring, preserving the segment angle. */
  dock?: number;
  /** Which way the pulses travel: into the emblem, or out of it. */
  flow: "in" | "out";
  /** 0–1 multiplier on the base stroke. */
  intensity?: number;
  pulses?: number;
  /** Emblem radii per second. Slow by design. */
  speed?: number;
};

/**
 * Desktop composition. The emblem sits right-of-centre, so the ingest paths run
 * in beneath the headline (where the canvas mask fades them almost to nothing)
 * and the emit paths leave to the right, into open space.
 */
export const DESKTOP_PATHS: PathSpec[] = [
  {
    id: "ingest-a",
    points: [
      [-6.6, 1.15],
      [-3.4, 1.15],
      [-1.3, -0.95],
    ],
    dock: RING_INNER,
    flow: "in",
    pulses: 2,
    speed: 0.52,
  },
  {
    id: "ingest-b",
    points: [
      [-6.6, -2.05],
      [-4.1, -2.05],
      [-1.6, 0.45],
    ],
    dock: RING_MID,
    flow: "in",
    speed: 0.44,
  },
  {
    id: "ingest-c",
    points: [
      [-6.6, 2.85],
      [-3.9, 2.85],
      [-1.45, 0.4],
    ],
    dock: RING_MID,
    flow: "in",
    intensity: 0.8,
    speed: 0.38,
  },
  {
    id: "ingest-d",
    points: [
      [-1.05, -3.5],
      [-1.05, -2.35],
      [0.25, -1.05],
    ],
    dock: RING_MID,
    flow: "in",
    intensity: 0.85,
    speed: 0.46,
  },
  {
    id: "emit-a",
    points: [
      [4.8, -2.1],
      [2.35, -2.1],
      [1.1, -0.85],
    ],
    dock: RING_INNER,
    flow: "out",
    pulses: 2,
    speed: 0.5,
  },
  {
    id: "emit-b",
    points: [
      [4.8, 2.45],
      [2.55, 2.45],
      [1.2, 1.1],
    ],
    dock: RING_INNER,
    flow: "out",
    speed: 0.42,
  },
  {
    id: "emit-c",
    points: [
      [1.35, 3.5],
      [1.35, 2.3],
      [0.45, 1.4],
    ],
    dock: RING_MID,
    flow: "out",
    intensity: 0.75,
    speed: 0.34,
  },
  /* Two structural buses. They belong to the architecture rather than to the
     emblem, so they pass through without docking. */
  {
    id: "bus-top",
    points: [
      [-7.2, -3.05],
      [1.55, -3.05],
      [2.65, -4.15],
    ],
    flow: "in",
    intensity: 0.5,
    speed: 0.3,
  },
  {
    id: "bus-bottom",
    points: [
      [-7.2, 3.35],
      [0.85, 3.35],
    ],
    flow: "in",
    intensity: 0.42,
    speed: 0.26,
  },
];

/**
 * Mobile composition. Fewer paths, lower density, and routed so the field reads
 * as a compact system beneath the copy rather than a shrunken desktop scene.
 */
export const MOBILE_PATHS: PathSpec[] = [
  {
    id: "m-ingest-a",
    points: [
      [-5.2, -1.2],
      [-2.4, -1.2],
      [-1.05, 0.15],
    ],
    dock: RING_INNER,
    flow: "in",
    speed: 0.46,
  },
  {
    id: "m-ingest-b",
    points: [
      [-0.1, -6.5],
      [-0.1, -2.8],
      [1.05, -1.65],
    ],
    dock: RING_MID,
    flow: "in",
    speed: 0.4,
  },
  {
    id: "m-ingest-c",
    points: [
      [-5.2, 2.6],
      [-2.2, 2.6],
      [-1.1, 1.5],
    ],
    dock: RING_MID,
    flow: "in",
    intensity: 0.75,
    speed: 0.34,
  },
  {
    id: "m-emit-a",
    points: [
      [2.2, 3.4],
      [0.95, 2.15],
      [0.95, 1.3],
    ],
    dock: RING_INNER,
    flow: "out",
    speed: 0.42,
  },
  {
    id: "m-bus",
    points: [
      [-5.2, -4.4],
      [0.6, -4.4],
      [1.6, -5.4],
    ],
    flow: "in",
    intensity: 0.4,
    speed: 0.24,
  },
];

/**
 * Layered depth planes. Trapezoids read as planes seen at a shallow angle,
 * which gives the composition depth without any 3D machinery.
 */
export const DEPTH_PLATES: { points: Vec2[]; alpha: number }[] = [
  {
    points: [
      [-3.5, -1.35],
      [3.2, -2.15],
      [3.2, 1.55],
      [-3.5, 2.35],
    ],
    alpha: 0.4,
  },
  {
    points: [
      [-2.4, -0.95],
      [2.3, -1.55],
      [2.3, 1.15],
      [-2.4, 1.75],
    ],
    alpha: 0.55,
  },
];

/** Arc segments on the alignment rings, as [radius, startDeg, endDeg]. */
export const RING_ARCS: [number, number, number][] = [
  [RING_INNER, -74, -18],
  [RING_INNER, 16, 68],
  [RING_INNER, 112, 168],
  [RING_INNER, 198, 250],
  [RING_MID, -58, 46],
  [RING_MID, 128, 224],
];

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

export type BuiltPath = {
  id: string;
  /** Vertices in canvas pixels. */
  pts: Vec2[];
  /** Cumulative distance to each vertex. */
  acc: number[];
  length: number;
  /** Length of a pulse's comet trail, in pixels. */
  trail: number;
  flow: "in" | "out";
  intensity: number;
  pulses: number;
  /** Pixels per second. */
  speed: number;
};

export type FieldNode = {
  x: number;
  y: number;
  /** Terminal nodes (where a path meets a ring) read slightly brighter. */
  terminal: boolean;
  /** 0–1, decays after a pulse passes. Mutated per frame. */
  glow: number;
};

/**
 * Moves `b` along the segment `a → b` until it sits exactly on the circle of
 * radius `r` centred on the origin. Trimming along the segment (rather than
 * snapping radially) keeps the authored 45° angles intact.
 */
function trimToCircle(a: Vec2, b: Vec2, r: number): Vec2 {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const qa = dx * dx + dy * dy;
  if (qa === 0) return b;

  const qb = 2 * (a[0] * dx + a[1] * dy);
  const qc = a[0] * a[0] + a[1] * a[1] - r * r;
  const disc = qb * qb - 4 * qa * qc;
  if (disc < 0) return b;

  const root = Math.sqrt(disc);
  const candidates = [(-qb - root) / (2 * qa), (-qb + root) / (2 * qa)].filter(
    (t) => t > 0 && t < 4,
  );
  if (candidates.length === 0) return b;

  /* Take the first crossing on the way in. */
  const t = Math.min(...candidates);
  return [a[0] + dx * t, a[1] + dy * t];
}

/** Extends the first vertex outward until it leaves the canvas. */
function extendToEdge(p0: Vec2, p1: Vec2, w: number, h: number): Vec2 {
  const dx = p0[0] - p1[0];
  const dy = p0[1] - p1[1];
  const len = Math.hypot(dx, dy);
  if (len === 0) return p0;

  /* The diagonal always clears the frame from any interior point. */
  const reach = Math.hypot(w, h);
  return [p0[0] + (dx / len) * reach, p0[1] + (dy / len) * reach];
}

export type FieldLayout = {
  paths: BuiltPath[];
  nodes: FieldNode[];
  cx: number;
  cy: number;
  r: number;
};

/**
 * Resolves the authored specs into canvas pixels for a given emblem position
 * and radius. Called once per resize — never per frame.
 */
export function buildField(
  specs: PathSpec[],
  cx: number,
  cy: number,
  r: number,
  width: number,
  height: number,
): FieldLayout {
  const paths: BuiltPath[] = [];
  const nodes: FieldNode[] = [];

  for (const spec of specs) {
    const units = spec.points.map((p) => [p[0], p[1]] as Vec2);

    if (spec.dock && units.length >= 2) {
      units[units.length - 1] = trimToCircle(
        units[units.length - 2],
        units[units.length - 1],
        spec.dock,
      );
    }

    const pts: Vec2[] = units.map(([ux, uy]) => [cx + ux * r, cy + uy * r]);
    pts[0] = extendToEdge(pts[0], pts[1], width, height);

    const acc: number[] = [0];
    for (let i = 1; i < pts.length; i += 1) {
      acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }

    paths.push({
      id: spec.id,
      pts,
      acc,
      length: acc[acc.length - 1],
      trail: r * 0.3,
      flow: spec.flow,
      intensity: spec.intensity ?? 1,
      pulses: spec.pulses ?? 1,
      speed: (spec.speed ?? 0.42) * r,
    });

    /* Interior vertices are junctions; the docked end is a terminal. */
    for (let i = 1; i < pts.length; i += 1) {
      const terminal = Boolean(spec.dock) && i === pts.length - 1;
      nodes.push({ x: pts[i][0], y: pts[i][1], terminal, glow: 0 });
    }
  }

  return { paths, nodes, cx, cy, r };
}

/** Point at a given distance along a built path. */
export function pointAt(path: BuiltPath, distance: number): Vec2 {
  const d = Math.max(0, Math.min(distance, path.length));
  let i = 1;
  while (i < path.acc.length - 1 && path.acc[i] < d) i += 1;

  const segStart = path.acc[i - 1];
  const segLength = path.acc[i] - segStart || 1;
  const t = (d - segStart) / segLength;
  const a = path.pts[i - 1];
  const b = path.pts[i];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
