import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroCore() {
  const coreGroupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerGlassRef = useRef<THREE.Mesh>(null);
  const outerShellRef = useRef<THREE.Mesh>(null);
  
  // Orbit ring refs
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);

  const isAssembledRef = useRef(false);

  useEffect(() => {
    const handleIntroComplete = () => {
      isAssembledRef.current = true;
    };
    window.addEventListener("intro-complete", handleIntroComplete);

    // If preloader is already gone, trigger instantly
    if (!document.querySelector("[data-preloader]")) {
      isAssembledRef.current = true;
    }

    return () => window.removeEventListener("intro-complete", handleIntroComplete);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Slow, premium base core group rotation
    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y = time * 0.06;
    }

    // Assembly target parameters
    const targetRingScale = isAssembledRef.current ? 1.0 : 6.0;
    const targetInnerScale = isAssembledRef.current ? 1.0 : 0.05;

    // 2. Inner wireframe rotation (slightly faster, counter-direction)
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.18;
      innerRef.current.rotation.x = time * 0.12;
      
      const assembleScale = THREE.MathUtils.lerp(innerRef.current.scale.x, targetInnerScale, 0.05);
      // Subtle organic breathing pulse
      const pulse = 0.88 + Math.sin(time * 2.0) * 0.04;
      const finalScale = assembleScale * pulse;
      innerRef.current.scale.set(finalScale, finalScale, finalScale);
    }

    // 3. Outer glass shell micro-pulse
    if (outerGlassRef.current) {
      const targetGlassScale = isAssembledRef.current ? 1.0 : 0.05;
      const assembleScale = THREE.MathUtils.lerp(outerGlassRef.current.scale.x, targetGlassScale, 0.04);
      const pulse = 1.02 + Math.sin(time * 1.2) * 0.015;
      const finalScale = assembleScale * pulse;
      outerGlassRef.current.scale.set(finalScale, finalScale, finalScale);
    }

    // 4. Subtle large transparent outer wireframe shell rotation
    if (outerShellRef.current) {
      outerShellRef.current.rotation.y = time * 0.025;
      outerShellRef.current.rotation.z = -time * 0.015;
      const s = THREE.MathUtils.lerp(outerShellRef.current.scale.x, targetRingScale * 0.6, 0.03);
      outerShellRef.current.scale.set(s, s, s);
    }

    // 5. Orbit rings rotating slowly and assembling dynamically at staggered speeds
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.08;
      ring1Ref.current.rotation.y = time * 0.04;
      const s = THREE.MathUtils.lerp(ring1Ref.current.scale.x, targetRingScale, 0.035);
      ring1Ref.current.scale.set(s, s, s);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.06;
      ring2Ref.current.rotation.z = time * 0.03;
      const s = THREE.MathUtils.lerp(ring2Ref.current.scale.x, targetRingScale, 0.045);
      ring2Ref.current.scale.set(s, s, s);
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.03;
      ring3Ref.current.rotation.z = -time * 0.07;
      const s = THREE.MathUtils.lerp(ring3Ref.current.scale.x, targetRingScale, 0.055);
      ring3Ref.current.scale.set(s, s, s);
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y = time * 0.05;
      ring4Ref.current.rotation.x = -time * 0.05;
      const s = THREE.MathUtils.lerp(ring4Ref.current.scale.x, targetRingScale, 0.065);
      ring4Ref.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={coreGroupRef}>
      {/* 1. Inner dense wireframe core (violet emissive geometry) */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#8b5cf6" // Violet core
          wireframe={true}
          transparent={true}
          opacity={0.65}
          emissive="#8b5cf6"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* 2. Volumetric internal light sphere (cyan glow center) */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color="#33e6ff"
          transparent={true}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Outer reflective glass-like sphere (highly polished glass shell) */}
      <mesh ref={outerGlassRef}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshPhysicalMaterial
          color="#0b0f19"
          roughness={0.05}
          metalness={0.1}
          transparent={true}
          opacity={0.45}
          transmission={0.9}
          thickness={2.0}
          ior={1.6}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          emissive="#33e6ff"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 4. Subtle large transparent outer wireframe shell (added volume and tech details) */}
      <mesh ref={outerShellRef}>
        <dodecahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial
          color="#33e6ff"
          wireframe={true}
          transparent={true}
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Orbit Rings (Thin, technical, wrapping at different angles to build 3D volume) */}
      {/* Ring 1 - Cyan ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.65, 0.008, 8, 96]} />
        <meshBasicMaterial
          color="#33e6ff"
          transparent={true}
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 2 - Violet ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.95, 0.006, 8, 96]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent={true}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 3 - Deep blue/cyan ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
        <torusGeometry args={[2.25, 0.005, 8, 96]} />
        <meshBasicMaterial
          color="#4f7cff"
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 4 - Thin outer cyan ring */}
      <mesh ref={ring4Ref} rotation={[-Math.PI / 6, Math.PI / 5, Math.PI / 3]}>
        <torusGeometry args={[2.55, 0.004, 6, 96]} />
        <meshBasicMaterial
          color="#33e6ff"
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 6. Center localized point lights to cast reflections/glowing aura */}
      <pointLight color="#33e6ff" intensity={5.0} distance={8} decay={1.5} />
      <pointLight color="#8b5cf6" intensity={4.0} distance={6} decay={1.5} />
    </group>
  );
}
