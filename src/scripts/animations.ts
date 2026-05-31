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

// 2. Cinematic Hero Timeline & Scroll Scrub
function initHeroAnimations(gsap: any, ScrollTrigger: any) {
  const isMobile = window.innerWidth <= 768;

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

  // Scroll Parallax / Depth separation for Hero (Desktop only)
  if (!isMobile && visual) {
    const heroSection = document.querySelector(".hero-section");
    const panel = document.querySelector(".product-lab-panel");
    const slab1 = document.querySelector('[data-depth-layer="1"]');
    const slab2 = document.querySelector('[data-depth-layer="2"]');
    const glowViolet = document.querySelector(".glow-violet");
    const glowCyan = document.querySelector(".glow-cyan");

    if (heroSection) {
      if (title) {
        gsap.to(title, {
          y: -65,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      if (panel) {
        scrubTl.to(panel, {
          rotateX: 10,
          rotateY: 8,
          y: 60,
          ease: "none",
        }, 0);
      }

      if (slab1) {
        scrubTl.to(slab1, {
          x: -80,
          y: -50,
          rotateZ: -12,
          scale: 0.92,
          opacity: 0.25,
          ease: "none",
        }, 0);
      }

      if (slab2) {
        scrubTl.to(slab2, {
          x: 80,
          y: 70,
          rotateZ: 8,
          scale: 0.92,
          opacity: 0.25,
          ease: "none",
        }, 0);
      }

      if (glowViolet) {
        scrubTl.to(glowViolet, { y: 180, opacity: 0.1, ease: "none" }, 0);
      }
      if (glowCyan) {
        scrubTl.to(glowCyan, { y: 120, opacity: 0.1, ease: "none" }, 0);
      }
    }
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
    const demoEl = showcase.querySelector("[data-project-depth-scene]");
    
    if (!copyEl || !demoEl) return;

    // A. Entrance reveal timeline
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

    const mainFrame = demoEl.querySelector('[data-project-depth-layer="3"]');
    const slabBack = demoEl.querySelector('[data-project-depth-layer="1"]');
    const slabMid = demoEl.querySelector('[data-project-depth-layer="2"]');
    const annotations = demoEl.querySelectorAll("[data-project-annotation]");

    // Demo frame rotates into place
    if (mainFrame) {
      showcaseTl.fromTo(mainFrame,
        { opacity: 0, y: 80, scale: 0.94, rotateX: 8, rotateY: -10 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 1.3, ease: "power4.out" },
        "-=0.7"
      );
    }

    // Reveal background slabs
    if (slabBack) {
      showcaseTl.fromTo(slabBack,
        { opacity: 0, scale: 0.85, z: -100 },
        { opacity: 1, scale: 1, z: -60, duration: 1.0, ease: "power3.out" },
        "-=1.1"
      );
    }

    if (slabMid) {
      showcaseTl.fromTo(slabMid,
        { opacity: 0, scale: 0.88, z: -80 },
        { opacity: 1, scale: 1, z: -30, duration: 1.0, ease: "power3.out" },
        "-=1.0"
      );
    }

    // Draw in technical annotation labels
    if (annotations.length > 0) {
      showcaseTl.fromTo(Array.from(annotations),
        { opacity: 0, scale: 0.8 },
        { opacity: 0.7, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
        "-=0.6"
      );
    }

    // B. Desktop-only scroll-scrub parallax
    if (!isMobile) {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: showcase,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      if (mainFrame) {
        scrubTl.fromTo(mainFrame, { yPercent: 5 }, { yPercent: -5, ease: "none" }, 0);
      }
      if (slabBack) {
        scrubTl.fromTo(slabBack, 
          { z: -80, yPercent: 9, rotate: -4 }, 
          { z: -40, yPercent: -9, rotate: -2, ease: "none" }, 
          0
        );
      }
      if (slabMid) {
        scrubTl.fromTo(slabMid, 
          { z: -45, yPercent: 4, rotate: 3 }, 
          { z: -15, yPercent: -4, rotate: 1, ease: "none" }, 
          0
        );
      }
    }
  });
}

// 6. AI Experiments Section
function initExperiments(gsap: any, ScrollTrigger: any) {
  const isMobile = window.innerWidth <= 768;
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
      // Main card containers animate in
      cards.forEach((cardWrapper) => {
        const card = cardWrapper.querySelector(".experiment-card");
        const slab = cardWrapper.querySelector("[data-experiment-depth-slab]");
        const chips = cardWrapper.querySelectorAll(".diagnostic-chip");

        expTl.fromTo(card,
          { opacity: 0, y: 80, rotateX: 10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.1, ease: "power4.out" },
          "-=0.9"
        );

        if (slab) {
          expTl.fromTo(slab,
            { opacity: 0, scale: 0.85, z: -80 },
            { opacity: 1, scale: 1, z: -35, duration: 0.9, ease: "power3.out" },
            "-=0.9"
          );
        }

        if (chips.length > 0) {
          expTl.fromTo(Array.from(chips),
            { opacity: 0, scale: 0.7 },
            { opacity: 0.25, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
            "-=0.5"
          );
        }
      });

      // Animate terminal lines inside each experiment card AFTER they land
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
          "-=0.4"
        );
      }
    }

    // Desktop-only subtle scrub parallax on rear slabs
    if (!isMobile) {
      const slabs = expSection.querySelectorAll("[data-experiment-depth-slab]");
      slabs.forEach((slab) => {
        gsap.fromTo(slab,
          { yPercent: 4, z: -45 },
          {
            yPercent: -4,
            z: -25,
            ease: "none",
            scrollTrigger: {
              trigger: slab,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    }
  }
}

// 7. Skills Topology Map
function initSkillsTopology(gsap: any, ScrollTrigger: any) {
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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

    // A. Center core node scales in and rotates slightly into place
    if (centerNode) {
      skillsTl.fromTo(centerNode,
        { opacity: 0, scale: 0.8, rotate: -30 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.0, ease: "back.out(1.5)" }
      );
    }

    // B. Draw angled SVG connection lines
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
      }, "-=0.6");
    }

    // C. Quadrant expansion entry for group cards
    if (groups.length > 0) {
      groups.forEach((group, idx) => {
        // Expand outwards based on layout quadrant
        let startX = 0, startY = 0, rotY = 0, rotX = 0;
        if (group.classList.contains("position-languages")) { startX = -40; startY = -40; rotY = -12; rotX = 8; }
        else if (group.classList.contains("position-frontend")) { startX = 40; startY = -40; rotY = 12; rotX = 8; }
        else if (group.classList.contains("position-backend")) { startX = -40; startY = 40; rotY = -12; rotX = -8; }
        else if (group.classList.contains("position-ai")) { startX = 40; startY = 40; rotY = 12; rotX = -8; }

        skillsTl.fromTo(group,
          { opacity: 0, x: startX, y: startY, rotateX: rotX, rotateY: rotY, scale: 0.94 },
          { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            rotateX: 0,
            rotateY: 0,
            scale: 1, 
            duration: 1.0, 
            ease: "power3.out" 
          },
          "-=0.9"
        );
      });
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

    // E. Desktop-only Continuous Floating Loop
    if (!isMobile && !prefersReducedMotion) {
      // Float center core
      if (centerNode) {
        gsap.to(centerNode, {
          y: -6,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Float quadrant cards staggered
      if (groups.length > 0) {
        groups.forEach((group, idx) => {
          gsap.to(group, {
            y: -4,
            duration: 3 + idx * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: idx * 0.4
          });
        });
      }
    }
  }
}

// 8. Playground Terminal
function initPlayground(gsap: any, ScrollTrigger: any) {
  const isMobile = window.innerWidth <= 768;
  const playgroundSection = document.querySelector("[data-playground-section]");
  if (playgroundSection) {
    const copyContainer = playgroundSection.querySelector("[data-playground-copy]");
    const terminalWrapper = playgroundSection.querySelector(".terminal-deck-wrapper");
    const backplate = playgroundSection.querySelector(".terminal-backplate");
    const chips = playgroundSection.querySelectorAll(".suggestion-chip");

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

    if (terminalWrapper) {
      playgroundTl.fromTo(terminalWrapper,
        { opacity: 0, y: 90, scale: 0.96, rotateX: 12 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotateX: 0, 
          duration: 1.1, 
          ease: "power4.out" 
        },
        "-=0.7"
      );
    }

    if (backplate) {
      playgroundTl.fromTo(backplate,
        { opacity: 0, scale: 0.9, z: -80 },
        { 
          opacity: 1, 
          scale: 1, 
          z: -35, 
          duration: 1.0, 
          ease: "power3.out" 
        },
        "-=0.9"
      );
    }

    if (chips.length > 0) {
      playgroundTl.fromTo(Array.from(chips),
        { opacity: 0, scale: 0.85, y: 10 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: "back.out(1.5)" 
        },
        "-=0.6"
      );
    }

    // Scroll Parallax (Desktop only)
    if (!isMobile) {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: playgroundSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      if (terminalWrapper) {
        scrubTl.fromTo(terminalWrapper, { yPercent: 4 }, { yPercent: -4, ease: "none" }, 0);
      }
      if (backplate) {
        scrubTl.fromTo(backplate, { z: -45, yPercent: 7 }, { z: -25, yPercent: -7, ease: "none" }, 0);
      }
    }
  }
}

// 9. Contact Section
function initContact(gsap: any, ScrollTrigger: any) {
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
        { opacity: 0, y: 35, rotateX: 6 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 0.9, 
          stagger: 0.08, 
          ease: "power3.out" 
        },
        "-=0.6"
      );
    }

    if (ctaPanel) {
      contactTl.fromTo(ctaPanel,
        { opacity: 0, y: 50, scale: 0.95, rotateX: 6 },
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

    // Micro-magnetic hover for CTA buttons (Desktop only)
    if (!isMobile && !prefersReducedMotion) {
      const buttons = contactSection.querySelectorAll(".cta-actions a");
      buttons.forEach((btn) => {
        if (!(btn instanceof HTMLElement)) return;

        const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power2.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power2.out" });

        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Pull up to 10px towards mouse pointer
          const moveX = (e.clientX - centerX) * 0.12;
          const moveY = (e.clientY - centerY) * 0.12;

          xTo(moveX);
          yTo(moveY);
        });

        btn.addEventListener("mouseleave", () => {
          xTo(0);
          yTo(0);
        });
      });
    }
  }
}

// 10. Global 3D Hover Tilt system
function initGlobal3DHover(gsap: any) {
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (isMobile || prefersReducedMotion) return;

  const cards = document.querySelectorAll("[data-tilt-card]");

  cards.forEach((card) => {
    if (!(card instanceof HTMLElement)) return;

    // Fast, responsive quickTo targets for X/Y rotation, scaling, and elevation
    const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });
    const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.4, ease: "power2.out" });
    const scaleTo = gsap.quickTo(card, "scale", { duration: 0.4, ease: "power2.out" });

    card.style.transformStyle = "preserve-3d";
    if (card.parentElement) {
      card.parentElement.style.perspective = "1400px";
    }

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalize offsets from element center (-1 to 1)
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // Premium, controlled maximum X/Y rotation (5 degrees max)
      const maxRotation = 5;

      const rotateY = percentX * maxRotation;
      const rotateX = -percentY * maxRotation;

      rotateXTo(rotateX);
      rotateYTo(rotateY);
      yTo(-6);
      scaleTo(1.02);
    });

    card.addEventListener("mouseleave", () => {
      rotateXTo(0);
      rotateYTo(0);
      yTo(0);
      scaleTo(1);
    });
  });
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
  initHeroAnimations(gsap, ScrollTrigger);
  initRevealAnimations(gsap, ScrollTrigger);
  initMotionCards(gsap, ScrollTrigger);
  initProjectShowcases(gsap, ScrollTrigger);
  initExperiments(gsap, ScrollTrigger);
  initSkillsTopology(gsap, ScrollTrigger);
  initPlayground(gsap, ScrollTrigger);
  initContact(gsap, ScrollTrigger);
  initGlobal3DHover(gsap);
}
