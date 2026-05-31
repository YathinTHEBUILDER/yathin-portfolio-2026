let initialized = false;

// 1. Preloader Animation
function initPreloader(gsap: any) {
  const preloader = document.querySelector("[data-preloader]");
  if (!preloader) return;
  gsap.to(preloader, {
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out",
    onComplete: () => preloader.remove(),
  });
}

// 2. Cinematic Hero Timeline
function initHeroAnimations(gsap: any) {
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
}

// 3. Standard Scroll Reveal Elements
function initRevealAnimations(gsap: any, ScrollTrigger: any) {
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

// 4. Execution Loop Section (Motion Slabs Explosion)
function initMotionCards(gsap: any, ScrollTrigger: any) {
  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    const motionSection = document.querySelector("[data-motion-section]");
    const card1 = document.querySelector('[data-motion-card="1"]');
    const card2 = document.querySelector('[data-motion-card="2"]');
    const card3 = document.querySelector('[data-motion-card="3"]');
    const motionNum = document.querySelector("[data-motion-number]");
    const motionWord = document.querySelector("[data-motion-word]");
    const motionLines = document.querySelectorAll("[data-motion-line]");
    const motionTags = document.querySelectorAll("[data-motion-tag]");

    if (motionSection && card1 && card2 && card3) {
      gsap.set([card1, card2, card3], { transformOrigin: "center center" });
      gsap.set(motionLines, { transformOrigin: "center center" });

      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: motionSection,
          start: "top top",
          end: "+=160%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      if (motionNum) {
        cardsTl.fromTo(motionNum,
          { yPercent: 0 },
          { yPercent: -18, ease: "none" },
          0
        );
      }

      if (motionWord) {
        cardsTl.fromTo(motionWord,
          { xPercent: 0 },
          { xPercent: -18, ease: "none" },
          0
        );
      }

      cardsTl.fromTo(card1,
        { x: 0, y: 0, rotate: 0, scale: 1 },
        { x: "-42vw", y: -40, rotate: -9, scale: 0.96, ease: "power2.out" },
        0
      );

      cardsTl.fromTo(card2,
        { x: 0, y: 0, rotate: 0, scale: 1 },
        { x: 0, y: -24, rotate: 0, scale: 1.04, ease: "power2.out" },
        0
      );

      cardsTl.fromTo(card3,
        { x: 0, y: 0, rotate: 0, scale: 1 },
        { x: "42vw", y: 40, rotate: 9, scale: 0.96, ease: "power2.out" },
        0
      );

      if (motionTags.length > 0) {
        cardsTl.fromTo(motionTags,
          { x: 0, y: 0, opacity: 0 },
          { 
            x: (i: number) => [-35, 45, -45, 35, -25, 25][i % 6],
            y: (i: number) => [-50, -35, 40, 50, -15, 20][i % 6],
            opacity: 0.8,
            stagger: 0.04,
            ease: "power2.out"
          },
          0.05
        );
      }

      if (motionLines.length > 0) {
        cardsTl.fromTo(motionLines,
          { scaleX: 0 },
          { scaleX: 1, ease: "power2.inOut" },
          0
        );
      }
    }
  } else {
    const cards = document.querySelectorAll("[data-motion-card]");
    if (cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-motion-section]",
            start: "top 75%",
          } 
        }
      );
    }
  }
}

// 5. Featured Project Showcases
function initProjectShowcases(gsap: any, ScrollTrigger: any) {
  const isMobile = window.innerWidth <= 768;

  gsap.utils.toArray<HTMLElement>("[data-project-showcase]").forEach((showcase) => {
    const copyEl = showcase.querySelector("[data-project-copy]");
    const demoEl = showcase.querySelector("[data-demo-frame]");

    if (!copyEl || !demoEl) return;

    const showcaseTl = gsap.timeline({
      scrollTrigger: {
        trigger: showcase,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    const children = copyEl.children;
    if (children.length > 0) {
      showcaseTl.fromTo(Array.from(children),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );
    }

    showcaseTl.fromTo(demoEl,
      { opacity: 0, y: 80, scale: 0.94, rotateX: 8, rotateY: -8 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 1.2, ease: "power4.out" },
      "-=0.6"
    );

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
}

// 6. AI Experiments Section
function initExperiments(gsap: any, ScrollTrigger: any) {
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
}

// 7. Skills Topology Map
function initSkillsTopology(gsap: any, ScrollTrigger: any) {
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

    if (centerNode) {
      skillsTl.fromTo(centerNode,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
      );
    }

    if (lines.length > 0) {
      lines.forEach((line) => {
        if (line instanceof SVGPathElement) {
          const length = line.getTotalLength();
          gsap.set(line, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1
          });
        }
      });

      skillsTl.to(Array.from(lines), {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.5");
    }

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
}

// 8. Playground Terminal
function initPlayground(gsap: any, ScrollTrigger: any) {
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

// 9. Contact Section
function initContact(gsap: any, ScrollTrigger: any) {
  const contactSection = document.querySelector("[data-contact-section]");
  if (contactSection) {
    const copyContainer = contactSection.querySelector("[data-contact-copy]");
    const cards = contactSection.querySelectorAll("[data-contact-card]");
    const ctaPanel = contactSection.querySelector("[data-contact-cta]");

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    if (copyContainer && copyContainer.children.length > 0) {
      contactTl.fromTo(Array.from(copyContainer.children),
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out" 
        }
      );
    }

    if (cards.length > 0) {
      contactTl.fromTo(Array.from(cards),
        { opacity: 0, y: 32 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.08, 
          ease: "power3.out" 
        },
        "-=0.6"
      );
    }

    if (ctaPanel) {
      contactTl.fromTo(ctaPanel,
        { opacity: 0, y: 40, scale: 0.96 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.0, 
          ease: "power4.out" 
        },
        "-=0.6"
      );
    }
  }
}

// 10. Global 3D Hover Tilt system
function initGlobal3DHover(gsap: any) {
  // To be implemented in Step 3
}

// Main Entry Point
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

    // Instant reveal of Contact elements
    document.querySelectorAll("[data-contact-copy], [data-contact-card], [data-contact-cta]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.scale = "1";
        el.querySelectorAll("*").forEach((child) => {
          if (child instanceof HTMLElement) {
            child.style.opacity = "1";
            child.style.transform = "none";
            child.style.scale = "1";
          }
        });
      }
    });
    return;
  }

  const gsap = (await import("gsap")).default;
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  // Execute modular animations in sequence
  initPreloader(gsap);
  initHeroAnimations(gsap);
  initRevealAnimations(gsap, ScrollTrigger);
  initMotionCards(gsap, ScrollTrigger);
  initProjectShowcases(gsap, ScrollTrigger);
  initExperiments(gsap, ScrollTrigger);
  initSkillsTopology(gsap, ScrollTrigger);
  initPlayground(gsap, ScrollTrigger);
  initContact(gsap, ScrollTrigger);
  initGlobal3DHover(gsap);
}
