import type { MetadataRoute } from "next";
import { brandAssets, siteConfig } from "@/data/site";

/**
 * Web app manifest.
 *
 * Next.js serves this at /manifest.webmanifest and links it from every page, so
 * it does not need to be registered in the layout's metadata.
 *
 * Every value is either real company information or a design token that already
 * exists — nothing here is invented. Fields that would require information the
 * company has not supplied (screenshots, shortcuts, categories, related
 * applications) are omitted rather than guessed at.
 *
 * The icons are the official mark's generated derivatives. They are not declared
 * `maskable`: the disc fills its frame edge to edge, so a platform applying a
 * maskable safe zone would crop the ring. Leaving `purpose` unset keeps them as
 * "any", which is the honest description of this artwork.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    lang: siteConfig.locale,
    start_url: "/",
    display: "standalone",
    /* Both match --color-background, so the splash screen and the browser
       chrome are the same near-black navy as the site itself. */
    background_color: "#04060d",
    theme_color: "#04060d",
    icons: [
      { src: brandAssets.markSmall, sizes: "96x96", type: "image/png" },
      { src: brandAssets.markMedium, sizes: "256x256", type: "image/png" },
      { src: brandAssets.mark, sizes: "512x512", type: "image/png" },
    ],
  };
}
