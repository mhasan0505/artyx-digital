import { permanentRedirect } from "next/navigation";
import { getAllProjects } from "@/lib/projects";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function LegacyPortfolioSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/work/${slug}/`);
}
