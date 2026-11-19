import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buildBreadcrumbSchema, JsonLd } from "./json-ld";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumbs({
  items,
  theme = "dark",
}: {
  items: BreadcrumbItem[];
  theme?: "dark" | "light";
}) {
  const fullItems: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    ...items,
  ];

  const textMuted = "text-text-muted";
  const textCurrent = "text-text";

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(fullItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
          {fullItems.map((item, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 ${textMuted} shrink-0`}
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className={`font-medium ${textCurrent}`}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={`${textMuted} hover:text-accent-text transition-colors`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

