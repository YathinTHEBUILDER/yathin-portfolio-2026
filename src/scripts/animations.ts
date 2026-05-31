let initialized = false;

export async function initAnimations() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const preloader = document.querySelector("[data-preloader]");

  if (prefersReducedMotion) {
    preloader?.remove();
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });
    return;
  }

  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(preloader, {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out",
    onComplete: () => preloader?.remove(),
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  });
}
