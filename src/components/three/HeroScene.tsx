import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import HeroCore from "./HeroCore";
import HeroParticles from "./HeroParticles";
import HeroProjectNodes from "./HeroProjectNodes";

// Inner scene wrapper to access useFrame, useThree
function InteractiveScene({ isMobile }: { isMobile: boolean }) {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Monitor Mouse movement on window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map to normalized range [-1, 1]
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Monitor Scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (!sceneGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    const scrollVal = scrollRef.current;

    // 1. Slow idle group rotation
    const baseRotationY = time * 0.05;

    // 2. Cursor-reactive parallax (lerped)
    let targetRotX = 0;
    let targetRotY = 0;
    let targetZ = 0;
    let targetY = 0;

    // Calculate scroll-based depth shift (moves slightly in Z and Y as user scrolls)
    // Capped at 1.5 units displacement
    const scrollRatio = Math.min(scrollVal / 1000, 1.2);

    if (!isMobile) {
      targetRotX = mouseRef.current.y * 0.15 - scrollRatio * 0.1;
      targetRotY = mouseRef.current.x * 0.18 + baseRotationY;
      targetZ = -scrollRatio * 1.5;
      targetY = -scrollRatio * 0.4;
    } else {
      // Simpler adjustments for mobile
      targetRotX = -scrollRatio * 0.08;
      targetRotY = baseRotationY * 0.4; // slower rotation on mobile
      targetZ = -scrollRatio * 0.8;
      targetY = -0.8 - scrollRatio * 0.3; // shifted down base position
    }

    // Apply smooth interpolation (lerp)
    sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.x, targetRotX, 0.08);
    sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.y, targetRotY, 0.08);
    sceneGroupRef.current.position.z = THREE.MathUtils.lerp(sceneGroupRef.current.position.z, targetZ, 0.08);
    sceneGroupRef.current.position.y = THREE.MathUtils.lerp(sceneGroupRef.current.position.y, targetY, 0.08);
  });

  // Position group to the right on desktop, center on mobile
  const groupBasePos: [number, number, number] = isMobile ? [0, -0.8, 0] : [2.0, 0, 0];

  return (
    <>
      {/* Immersive scene lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} />
      <directionalLight position={[-5, -5, -5]} intensity={0.1} />

      {/* Main floating group combining core, nodes, lines */}
      <group ref={sceneGroupRef} position={groupBasePos}>
        {/* Core AI/Builder engine */}
        <HeroCore />

        {/* Orbiting nodes/labels */}
        {!isMobile && <HeroProjectNodes />}
      </group>

      {/* Performant background star field */}
      <HeroParticles count={isMobile ? 120 : 350} mouseRef={mouseRef} />

      {/* Technical grid floor at bottom (desktop only) */}
      {!isMobile && (
        <gridHelper
          args={[30, 24, "#8b5cf6", "rgba(139, 92, 246, 0.03)"]}
          position={[0, -2.8, -2]}
          rotation={[0.1, 0, 0]}
        />
      )}
    </>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

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

  // Safe fallback if not mounted, SSR, or reduced motion preferred
  if (!mounted || reducedMotion) {
    return (
      <div 
        className="w-full h-full absolute inset-0"
        style={{
          background: "radial-gradient(circle at 75% 50%, rgba(51, 230, 255, 0.05) 0%, transparent 60%), radial-gradient(circle at 25% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)"
        }}
      />
    );
  }

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 1.5]} // limit DPR for high performance on retina displays
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
          pointerEvents: "none"
        }}
      >
        <InteractiveScene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
