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
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-semibold text-white shadow-md transition hover:bg-blue-500 cursor-pointer"
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
      className="font-semibold text-[#0078D7] underline hover:text-blue-700 cursor-pointer"
    >
      {children}
    </button>
  );
}
