// Global shared state for synchronizing GSAP ScrollTrigger with the 3D WebGL Canvas
export interface Scroll3DState {
  heroScrollProgress: number;     // 0 to 1 through Hero
  servicesScrollProgress: number; // 0 to 1 through Services
  productsScrollProgress: number; // 0 to 1 through Featured Products
  activeStage: "hero" | "services" | "products" | "exit";
}

export const scroll3DState: Scroll3DState = {
  heroScrollProgress: 0,
  servicesScrollProgress: 0,
  productsScrollProgress: 0,
  activeStage: "hero",
};
