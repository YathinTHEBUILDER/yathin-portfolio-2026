import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isTouchDevice } from "../../lib/isTouchDevice";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touch, setTouch] = useState(true);

  useEffect(() => {
    // Perform touch device checks
    const hasTouch = isTouchDevice();
    setTouch(hasTouch);

    if (hasTouch) return;

    setVisible(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Center transform coordinates
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    // Performance-capped quickTo interpolation
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });

    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-tilt-card]") ||
        target.closest(".project-row") ||
        target.closest(".suggestion-chip") ||
        target.style.cursor === "pointer";

      setHovered(!!isLink);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (touch || !visible) return null;

  return (
    <>
      {/* 1. Glowing Core Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "var(--cyan)",
          borderRadius: "50%",
          zIndex: 9999,
          pointerEvents: "none",
          boxShadow: "0 0 8px var(--cyan)",
          transform: `scale(${hovered ? 0.6 : 1})`,
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      {/* 2. Outer Soft Trailing Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          border: hovered ? "1.5px solid var(--cyan)" : "1.5px solid rgba(51, 230, 255, 0.35)",
          borderRadius: "50%",
          zIndex: 9998,
          pointerEvents: "none",
          backgroundColor: hovered ? "rgba(51, 230, 255, 0.06)" : "transparent",
          transform: `scale(${hovered ? 1.45 : 1})`,
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s, border-color 0.25s",
          boxShadow: hovered ? "0 0 12px rgba(51, 230, 255, 0.15)" : "none",
        }}
      />
    </>
  );
}
