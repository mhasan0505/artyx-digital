import projectsData from "./projects.json";

export interface ProjectImage {
  src: string;
  label: string;
  bg: string;
}

export interface ProjectResult {
  metric: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  industry: string;
  relationshipType: string;
  roleAndScope: string;
  description: string;
  /** Thumbnail used on the listing card */
  image: string;
  /** Tailwind bg class for the listing card */
  bg: string;
  /** Hero cover image on the detail page */
  coverImage: string;
  /** Tailwind bg class for the detail cover */
  coverBg: string;
  client: string;
  year: string;
  duration: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  results: ProjectResult[];
  tech: string[];
  relatedServiceSlug: string;
  images: ProjectImage[];
}

const projects = projectsData as Project[];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs
    .map((s) => getProjectBySlug(s))
    .filter((p): p is Project => Boolean(p));
}

export function getCategories(): string[] {
  const cats = ["All", ...new Set(projects.map((p) => p.category))];
  return cats;
}
