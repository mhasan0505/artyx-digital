"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";

export function CookiePreferencesButton() {
  const openPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("artyx:open-cookie-settings"));
    }
  };

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold cursor-pointer"
    >
      <SlidersHorizontal className="h-4 w-4" />
      Customize Cookie Preferences
    </button>
  );
}

export function CookiePreferencesTextButton({
  children = "Cookie Settings",
}: {
  children?: React.ReactNode;
}) {
  const openPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("artyx:open-cookie-settings"));
    }
  };

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="font-semibold text-accent-text underline hover:text-text cursor-pointer"
    >
      {children}
    </button>
  );
}
