import { Geist, JetBrains_Mono } from "next/font/google";

/**
 * Two families, no more.
 *
 * Geist carries the entire editorial voice — from 11px UI text to the display
 * scale. JetBrains Mono is reserved for technical signal: section numbers,
 * eyebrows, metadata, categories and system indicators.
 *
 * Both are self-hosted by `next/font` at build time, so there is no runtime
 * request to a font CDN and no layout shift.
 */
export const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const fontVariables = `${geistSans.variable} ${jetbrainsMono.variable}`;
