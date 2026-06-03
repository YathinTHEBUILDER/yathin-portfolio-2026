import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroCore() {
  const coreGroupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerGlassRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate core group slowly
    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.y = time * 0.1;
    }

    // Inner wireframe rotation (slightly faster, counter-direction)
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.25;
      innerRef.current.rotation.x = time * 0.15;
      
      // Subtle pulse
      const scale = 0.85 + Math.sin(time * 2.5) * 0.05;
      innerRef.current.scale.set(scale, scale, scale);
    }

    // Outer glass shell pulse
    if (outerGlassRef.current) {
      const scale = 1.0 + Math.sin(time * 1.5) * 0.02;
      outerGlassRef.current.scale.set(scale, scale, scale);
    }

    // Rings rotating on different axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.3;
      ring2Ref.current.rotation.z = time * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = time * 0.15;
      ring3Ref.current.rotation.z = -time * 0.35;
    }
  });

  return (
    <group ref={coreGroupRef}>
      {/* 1. Inner dense wireframe core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#8b5cf6" // Violet core
          wireframe={true}
          transparent={true}
          opacity={0.6}
          emissive="#8b5cf6"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* 2. Volumetric internal light sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#33e6ff" // Cyan glow center
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Outer reflective glass-like sphere */}
      <mesh ref={outerGlassRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshPhysicalMaterial
          color="#0b0f19"
          roughness={0.1}
          metalness={0.1}
          transparent={true}
          opacity={0.4}
          transmission={0.8}
          thickness={1.5}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#33e6ff"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* 4. Orbit Rings (Thin, technical, glowing) */}
      {/* Ring 1 - Outer cyan ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.012, 8, 64]} />
        <meshBasicMaterial
          color="#33e6ff"
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 2 - Mid violet ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.8, 0.008, 8, 64]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ring 3 - Outer thin blue ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.006, 6, 48]} />
        <meshBasicMaterial
          color="#4f7cff"
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Center localized point light to cast shadows/reflections */}
      <pointLight color="#33e6ff" intensity={2.0} distance={5} decay={2} />
      <pointLight color="#8b5cf6" intensity={1.5} distance={4} decay={2} />
    </group>
  );
}
