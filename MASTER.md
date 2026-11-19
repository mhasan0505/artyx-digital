# MASTER.md — Artyx Digital Canonical Design System

> **Single Source of Truth** for the Artyx Digital web platform.  
> Governed by the validated Visual Thesis and Interaction Thesis.

---

## 1. Visual & Interaction Theses

### Visual Thesis
> Deep obsidian architectural ground (`#070B06`) with brand charcoal surfaces (`#333333`), illuminated by high-voltage neon lime accents (`#7FFF00` exactly), set in extended geometric display type (Unbounded for wordmark & display, Space Grotesk for section headings, Inter for body, and Geist Mono for metrics), structured on a disciplined 8px modular grid with sharp 16px/24px hairline-bordered cards and specular lime reflections.

### Light Theme Invariant
> Light mode uses ivory-slate ground (`#F6F8F3`) with white cards (`#FFFFFF`). **CRITICAL RULE**: `#7FFF00` has a 1.2:1 failure ratio against light backgrounds and MUST NEVER be used for text, links, or buttons in light mode. Light theme action elements, typography accents, and interactive controls use `#3E7000` (5.8:1 contrast, WCAG AA compliant). `#7FFF00` is strictly decorative (borders, ambient glows).

### Interaction Thesis
> The hero features a real-time 3D object built directly from `artyx-icon.svg` (extruded with bevel, subtle lime emissive glow, retaining both inner cutouts) that slowly idles and tilts toward the cursor. As the user scrolls through pinned service sections, the camera and 3D object dynamically morph. Micro-interactions run on crisp mechanical timings (250–350ms) driven by `power3.out` (`cubic-bezier(0.16, 1, 0.3, 1)`), featuring magnetic buttons and 3D card tilt with cursor-following lime specular highlights—with zero bounce and full graceful degradation when `prefers-reduced-motion` is active.

`Allowed patterns: mono labels, hairline rules, neon lime glow, procedural noise, wireframe 3D geometry, interactive cursor, marquee strip.`

---

## 2. Color System Tokens

### Dark Theme (Default)
| Token | Hex / Value | Role / Usage |
|---|---|---|
| `--bg-void` | `#070B06` | Page body background (near-black with subtle green cast) |
| `--surface-card` | `#333333` | Brand charcoal ground for cards, containers & panels |
| `--surface-elevated`| `#3D3D3D` | Dropdowns, hover states, active pill badges |
| `--surface-inset` | `#242424` | Code blocks, input backgrounds, terminal drawers |
| `--lime-primary` | `#7FFF00` | Exact brand neon lime (H1 accents, CTA buttons, active indicators) |
| `--lime-glow` | `rgba(127, 255, 0, 0.35)` | Specular highlights, box-shadows, 3D bloom glow |
| `--lime-border` | `rgba(127, 255, 0, 0.20)` | Hairline borders on cards and badges |
| `--text-primary` | `#F4F6F0` | High-contrast body and heading text |
| `--text-muted` | `#A3ABA0` | Supporting copy, metadata, timestamps |
| `--border-subtle` | `rgba(255, 255, 255, 0.10)`| Subtle divider lines |

### Light Theme
| Token | Hex / Value | Role / Usage |
|---|---|---|
| `--bg-light` | `#F6F8F3` | Page body background (ivory-tinted clean ground) |
| `--surface-light` | `#FFFFFF` | Card surfaces, modals, containers |
| `--surface-light-elevated` | `#EDEFEA` | Secondary panels, tag backgrounds |
| `--lime-action` | `#3E7000` | Text, links, CTA buttons (WCAG AA 5.8:1 contrast on ivory) |
| `--lime-decorative` | `#7FFF00` | Ambient glow, thin accent borders only (NEVER text) |
| `--text-light-primary` | `#0D140A` | Headings, primary copy |
| `--text-light-muted` | `#4F5E4A` | Secondary text, captions |
| `--border-light` | `rgba(62, 112, 0, 0.18)` | Card borders and input outlines |

---

## 3. Typography Scale & Hierarchy

### Font Families
- **Wordmark & Display**: `Unbounded`, system-ui, sans-serif (lowercase, wide tracking)
- **Headings**: `Space Grotesk`, system-ui, sans-serif
- **Body & Editorial**: `Inter`, system-ui, sans-serif
- **Metrics, Code & Labels**: `Geist Mono` / `JetBrains Mono`, monospace

### Scale & Hierarchy
| Style | Size | Line Height | Tracking | Weight |
|---|---|---|---|---|
| **Display Mega** | `4.00rem` (64px) | `1.05` | `-0.02em` | 700 / 800 |
| **Heading 1** | `3.00rem` (48px) | `1.10` | `-0.02em` | 700 |
| **Heading 2** | `2.25rem` (36px) | `1.18` | `-0.01em` | 700 |
| **Heading 3** | `1.50rem` (24px) | `1.28` | `0.00em` | 600 |
| **Body Large** | `1.125rem` (18px)| `1.60` | `0.00em` | 400 / 500 |
| **Body Base** | `1.00rem` (16px) | `1.60` | `0.00em` | 400 |
| **Caption** | `0.875rem` (14px)| `1.50` | `0.01em` | 500 |
| **Mono Label** | `0.75rem` (12px) | `1.40` | `0.08em` | 600 (uppercase) |

### Logo Wordmark Standard
```
artyx digital
build. launch. grow.
```
- **"artyx"**: Lowercase, Unbounded font, weight 700, tracking `0.14em`.
- **"digital"**: Lowercase, Unbounded / Space Grotesk, weight 600, tracking `0.28em`, color `--lime-primary`.
- **Tagline**: Lowercase or Titlecase, `Build. Launch. Grow.`, tracking `0.15em`, Geist Mono.

---

## 4. Spacing, Layout & Grid
- **Base Grid**: 8px modular unit.
- **Section Padding**:
  - Mobile: `py-16` (64px)
  - Desktop: `py-24` to `py-28` (96px–112px)
- **Container Max-Width**: `max-w-7xl` (1280px), centered with `px-6 lg:px-8`.
- **Card Padding**: `p-6` to `p-10` (24px to 40px).
- **Corner Radii**:
  - Buttons / Controls: `12px` (`rounded-xl`)
  - Cards / Containers: `20px` to `24px` (`rounded-2xl` / `rounded-3xl`)
  - Badges / Chips: `9999px` (`rounded-full`)

---

## 5. Motion Tokens & Animation Standards

| Token | Duration | Easing | Role |
|---|---|---|---|
| `--motion-micro` | `250ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hover states, button press, glow shifts |
| `--motion-standard`| `400ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Drawer open, modal reveal, tab switch |
| `--motion-macro` | `750ms` | `power3.out` | Section entry, card stagger, line unmask |
| `--motion-scroll` | `1.2s scrub` | `none` (linked to scroll) | Parallax background, 3D model rotation |
| `--motion-stagger`| `120ms` | — | Sequential list & card reveals |

### Interaction Rules
- **Hover Micro-Interactions**: Magnetic attraction (`stiffness: 150`, `damping: 15`), 3D card tilt (`perspective: 1000px`, `rotateX/Y` up to 8deg) with radial lime specular reflection.
- **No Spring Bounce**: 0% overshoot on UI surfaces.
- **`prefers-reduced-motion`**: Handled via `gsap.matchMedia()`. When active:
  - Scroll pinning is disabled.
  - Multi-layer parallax is disabled.
  - 3D model ceases idle rotation and tilt; renders in static neutral angle.
  - All transitions snap instantly to opacity 1.

---

## 6. Real-Time 3D Hero Specification

- **Asset**: `public/artyx-icon.svg`
- **Loader**: Three.js `SVGLoader`
- **Extrusion Parameters**:
  - Depth: `28`
  - Bevel Enabled: `true`
  - Bevel Thickness: `2`
  - Bevel Size: `1.5`
  - Bevel Segments: `3`
  - Inner Cutouts: Preserved from SVG sub-paths via even-odd polygon holes.
- **Material**:
  - Standard/Physical Material
  - Base Color: `#7FFF00`
  - Emissive: `#7FFF00` (`emissiveIntensity: 0.38`)
  - Roughness: `0.22`
  - Metalness: `0.75`
- **Animation Loop**:
  - Continuous slow idle: `rotation.y += delta * 0.3`, `rotation.x += delta * 0.15`.
  - Pointer Parallax: `MathUtils.damp` tracking mouse coordinate offsets.
  - Scroll Timeline: Linked to ScrollTrigger through service sections.
- **Performance**:
  - Clamped `dpr={[1, 1.5]}`
  - Lazy loaded via `useSyncExternalStore` client gate (zero SSR hydration errors).
  - Geometries and materials disposed on unmount.

