"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * App Router does not reliably scroll to a hash on client-side navigation.
 * After the route settles, find the target and scroll it — `html` already
 * carries scroll-padding for the fixed navbar.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      document.getElementById(id)?.scrollIntoView();
    }

    const frame = window.requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
