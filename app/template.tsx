"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initialMount = useRef(true);

  useEffect(() => {
    // 1. Immediately reset scroll position to top on route change
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // Mark that initial mount has occurred
    if (initialMount.current) {
      initialMount.current = false;
    }

    // 2. Refresh GSAP ScrollTrigger pins and positions once the new route DOM settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div className={`flex-1 w-full ${!initialMount.current ? "animate-route-enter" : ""}`}>
      {children}
    </div>
  );
}
