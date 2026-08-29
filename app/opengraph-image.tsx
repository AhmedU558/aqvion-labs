import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/data/site";

export const alt = "AQVION LABS — AI, Automation & Software Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card.
 *
 * Rendered with next/og (bundled with Next.js — no extra dependency) so the
 * card stays in step with the design tokens instead of being a static export
 * that silently goes stale. The mark is embedded from the official asset.
 *
 * NOTE: next/og rasterises with its own bundled sans-serif, so the type here
 * is close to, but not exactly, Geist. Swap in a vendored Geist .ttf via the
 * `fonts` option when the licensed file is added to the repo.
 */
export default async function OpenGraphImage() {
  const mark = await readFile(join(process.cwd(), "public/brand/aqvion-mark-256.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#04060d",
          backgroundImage:
            "radial-gradient(900px 520px at 22% 8%, rgba(21,82,240,0.30), transparent 62%)," +
            "radial-gradient(760px 480px at 92% 96%, rgba(139,79,248,0.24), transparent 60%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={132} height={132} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                display: "flex",
                fontSize: 60,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#f2f5fa",
              }}
            >
              AQVION&nbsp;
              <span style={{ fontWeight: 400, color: "#8b95a9", letterSpacing: "0.1em" }}>
                LABS
              </span>
            </div>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.26em", color: "#2fb8ff" }}>
              CODE &bull; CREATE &bull; INNOVATE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              lineHeight: 1.25,
              letterSpacing: "-0.025em",
              color: "#c9d0dd",
              maxWidth: 940,
            }}
          >
            AI, automation and software engineering for organisations building something serious.
          </div>
          <div
            style={{
              display: "flex",
              height: 4,
              width: "100%",
              backgroundImage: "linear-gradient(100deg, #1552f0 0%, #4b32e8 46%, #8b4ff8 100%)",
            }}
          />
          <div style={{ display: "flex", fontSize: 22, color: "#5a6478", letterSpacing: "0.08em" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
