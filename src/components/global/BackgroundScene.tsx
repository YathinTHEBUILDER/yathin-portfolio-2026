import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SceneCore from "../three/SceneCore";

export default function BackgroundScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check reduced motion state
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Return static premium background if not mounted, on server, or if reduced-motion is preferred
  if (!mounted || reducedMotion) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 75% 30%, rgba(51,230,255,0.06), transparent 45%), radial-gradient(circle at 20% 80%, rgba(139,92,246,0.06), transparent 45%), #030305",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "#030305", // Black backdrop base
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 60 }}
        dpr={[1, 1.5]} // Performance capped DPR
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SceneCore isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
