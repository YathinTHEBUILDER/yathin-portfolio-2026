let initialized = false;

export async function initSmoothScroll() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  const Lenis = (await import("lenis")).default;
  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.08,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.1,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  window.addEventListener("beforeunload", () => {
    lenis.destroy();
  });

  (window as any).lenis = lenis;
}
