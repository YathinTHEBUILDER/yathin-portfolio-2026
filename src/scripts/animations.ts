let initialized = false;

export async function initAnimations() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const preloader = document.querySelector("[data-preloader]");

  // Graceful degradation for reduced motion
  if (prefersReducedMotion) {
    preloader?.remove();
    
    // Instant reveal of all data-reveal elements
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });

    // Instant reveal of Hero elements
    document.querySelectorAll("[data-hero-eyebrow], [data-hero-title], [data-hero-copy], [data-hero-actions], [data-hero-visual]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      }
    });

    // Instant reveal of Showcase elements
    document.querySelectorAll("[data-project-copy], [data-demo-frame]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
        // Also ensure children of data-project-copy are shown
        el.querySelectorAll("*").forEach((child) => {
          if (child instanceof HTMLElement) {
            child.style.opacity = "1";
            child.style.transform = "none";
          }
        });
      }
    });

    // Instant reveal of Experiments elements
    document.querySelectorAll("[data-experiment-card], [data-terminal-line]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });

    // Instant reveal of Skills Topology elements
    document.querySelectorAll("[data-skill-center], [data-skill-group], .skill-pill").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });

    // Make all connection paths fully visible
    document.querySelectorAll("[data-skill-line]").forEach((el) => {
      if (el instanceof SVGPathElement) {
        el.style.strokeDashoffset = "0";
      }
    });

    // Instant reveal of Playground elements
    document.querySelectorAll("[data-playground-copy], [data-playground-terminal]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.querySelectorAll("*").forEach((child) => {
          if (child instanceof HTMLElement) {
            child.style.opacity = "1";
            child.style.transform = "none";
          }
        });
      }
    });
    return;
  }

  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  // 1. Preloader dismissal
  gsap.to(preloader, {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out",
    onComplete: () => preloader?.remove(),
  });

  // 2. Cinematic Hero Timeline
  const heroTl = gsap.timeline({
    delay: 0.5,
  });

  const eyebrow = document.querySelector("[data-hero-eyebrow]");
  const title = document.querySelector("[data-hero-title]");
  const copy = document.querySelector("[data-hero-copy]");
  const actions = document.querySelector("[data-hero-actions]");
  const visual = document.querySelector("[data-hero-visual]");

  if (eyebrow) {
    heroTl.fromTo(eyebrow, 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }

  if (title) {
    heroTl.fromTo(title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power4.out" },
      "-=0.6"
    );
  }

  if (copy) {
    heroTl.fromTo(copy,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.7"
    );
  }

  if (actions) {
    heroTl.fromTo(actions,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.7"
    );
  }

  if (visual) {
    heroTl.fromTo(visual,
      { opacity: 0, y: 50, rotateX: 12, rotateY: -12, filter: "blur(20px)" },
      { opacity: 1, y: 0, rotateX: 0, rotateY: 0, filter: "blur(0px)", duration: 1.4, ease: "power4.out" },
      "-=1.0"
    );

    // Subtle entrance for floating card backdrops
    heroTl.fromTo(".floating-card",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
      "-=1.1"
    );
  }

  // 3. Standard Scroll Reveal Elements
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

  const isMobile = window.innerWidth <= 768;

  // 4. Phase 2B: MotionCards Scroll Scrub Parallax
  // We disable scrub fanning out on mobile for better touch performance and layout preservation
  if (!isMobile) {
    const section = document.querySelector(".motion-section");
    const card1 = document.querySelector('[data-motion-card="1"]');
    const card2 = document.querySelector('[data-motion-card="2"]');
    const card3 = document.querySelector('[data-motion-card="3"]');
    const chrome = document.querySelector(".chrome-object");
    const num = document.querySelector(".motion-number");

    if (section && card1 && card2 && card3) {
      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 30%",
          scrub: 1.2,
        }
      });

      // Card 1 fans left and slightly up/rotated
      cardsTl.fromTo(card1,
        { x: 0, y: 0, rotate: 0 },
        { x: -160, y: -40, rotate: -8, ease: "power2.out" },
        0
      );

      // Card 2 moves slightly up and retains alignment
      cardsTl.fromTo(card2,
        { x: 0, y: 0, rotate: 0 },
        { x: 0, y: -20, rotate: 0, ease: "power2.out" },
        0
      );

      // Card 3 fans right and down/rotated
      cardsTl.fromTo(card3,
        { x: 0, y: 0, rotate: 0 },
        { x: 160, y: 30, rotate: 8, ease: "power2.out" },
        0
      );

      // Parallax effect on chrome ball and numbers
      if (chrome) {
        cardsTl.fromTo(chrome,
          { yPercent: -10, rotate: 0 },
          { yPercent: 10, rotate: 45, ease: "none" },
          0
        );
      }

      if (num) {
        cardsTl.fromTo(num,
          { yPercent: 0 },
          { yPercent: -30, ease: "none" },
          0
        );
      }
    }
  } else {
    // Mobile fallback reveal
    const cards = document.querySelectorAll(".m-card");
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          } 
        }
      );
    });
  }

  // 5. Phase 3: Featured Project Showcases
  gsap.utils.toArray<HTMLElement>("[data-project-showcase]").forEach((showcase) => {
    const copyEl = showcase.querySelector("[data-project-copy]");
    const demoEl = showcase.querySelector("[data-demo-frame]");

    if (!copyEl || !demoEl) return;

    // A. Reveal timeline
    const showcaseTl = gsap.timeline({
      scrollTrigger: {
        trigger: showcase,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    // Stagger reveal text elements
    const children = copyEl.children;
    if (children.length > 0) {
      showcaseTl.fromTo(Array.from(children),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }

    // Interactive Demo Frame Fly-In
    showcaseTl.fromTo(demoEl,
      { opacity: 0, y: 80, scale: 0.94, rotateX: 8, rotateY: -8 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 1.2, ease: "power4.out" },
      "-=0.6"
    );

    // B. Subtle scrub parallax on desktop
    if (!isMobile) {
      gsap.fromTo(demoEl,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: showcase,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }
  });

  // 6. Phase 4: AI Experiments Section Scroll Trigger
  const expSection = document.querySelector("[data-experiment-section]");
  if (expSection) {
    const cards = expSection.querySelectorAll("[data-experiment-card]");
    
    const expTl = gsap.timeline({
      scrollTrigger: {
        trigger: expSection,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    if (cards.length > 0) {
      expTl.fromTo(cards,
        { opacity: 0, y: 60, rotateX: 8 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 1.0, 
          stagger: 0.15, 
          ease: "power3.out" 
        }
      );

      // Animate terminal lines inside each experiment card
      const lines = expSection.querySelectorAll("[data-terminal-line]");
      if (lines.length > 0) {
        expTl.fromTo(lines,
          { opacity: 0, x: -12 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            stagger: 0.08, 
            ease: "power2.out" 
          },
          "-=0.6"
        );
      }
    }
  }

  // 7. Phase 5: Skills Topology Map Scroll Trigger
  const skillsSection = document.querySelector("[data-skills-section]");
  if (skillsSection) {
    const centerNode = skillsSection.querySelector("[data-skill-center]");
    const lines = skillsSection.querySelectorAll("[data-skill-line]");
    const groups = skillsSection.querySelectorAll("[data-skill-group]");
    const pills = skillsSection.querySelectorAll(".skill-pill");

    const skillsTl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsSection,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    // A. Center core node scales in
    if (centerNode) {
      skillsTl.fromTo(centerNode,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
      );
    }

    // B. Draw angled SVG connection lines
    if (lines.length > 0) {
      lines.forEach((line) => {
        if (line instanceof SVGPathElement) {
          const length = line.getTotalLength();
          // Initialize path parameters dynamically
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1
          });
        }
      });

      // Animate strokeDashoffset to 0
      skillsTl.to(Array.from(lines), {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.5");
    }

    // C. Stagger group cards entry
    if (groups.length > 0) {
      skillsTl.fromTo(Array.from(groups),
        { opacity: 0, y: 40, scale: 0.96 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.9, 
          stagger: 0.12, 
          ease: "power3.out" 
        },
        "-=0.8"
      );
    }

    // D. Micro-stagger individual skill pills
    if (pills.length > 0) {
      skillsTl.fromTo(Array.from(pills),
        { opacity: 0, y: 12 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.03, 
          ease: "power1.out" 
        },
        "-=0.6"
      );
    }
  }

  // 8. Phase 6: Playground Interactive Terminal Scroll Trigger
  const playgroundSection = document.querySelector("[data-playground-section]");
  if (playgroundSection) {
    const copyContainer = playgroundSection.querySelector("[data-playground-copy]");
    const terminalEl = playgroundSection.querySelector("[data-playground-terminal]");

    const playgroundTl = gsap.timeline({
      scrollTrigger: {
        trigger: playgroundSection,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    // Animate [data-playground-copy] children: opacity 0 -> 1, y 30 -> 0, stagger 0.1
    if (copyContainer && copyContainer.children.length > 0) {
      playgroundTl.fromTo(Array.from(copyContainer.children),
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out" 
        }
      );
    }

    // Animate [data-playground-terminal]: opacity 0 -> 1, y 70 -> 0, scale 0.96 -> 1, rotateX 8 -> 0
    if (terminalEl) {
      playgroundTl.fromTo(terminalEl,
        { opacity: 0, y: 70, scale: 0.96, rotateX: 8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotateX: 0, 
          duration: 1.1, 
          ease: "power4.out" 
        },
        "-=0.6"
      );
    }
  }
}
