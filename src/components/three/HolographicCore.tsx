import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type HolographicCoreProps = {
  isMobile?: boolean;
};

export default function HolographicCore({ isMobile = false }: HolographicCoreProps) {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate inner wireframe structure
    if (innerRef.current) {
      innerRef.current.rotation.y = time * 0.12;
      innerRef.current.rotation.x = time * 0.08;
      
      // Pulse scale gently
      const scale = 1.0 + Math.sin(time * 2.0) * 0.03;
      innerRef.current.scale.set(scale, scale, scale);
    }

    // Rotate outer wireframe in reverse
    if (outerRef.current) {
      outerRef.current.rotation.y = -time * 0.18;
      outerRef.current.rotation.z = time * 0.12;
      
      const scaleOuter = 1.38 + Math.cos(time * 2.0) * 0.02;
      outerRef.current.scale.set(scaleOuter, scaleOuter, scaleOuter);
    }

    // Inner glow core pulsing size
    if (coreGlowRef.current) {
      const glowScale = 0.55 + Math.sin(time * 4.0) * 0.04;
      coreGlowRef.current.scale.set(glowScale, glowScale, glowScale);
    }
  });

  // Align to the right visual panel on desktop, center at bottom on mobile
  const position: [number, number, number] = isMobile ? [0, -1.8, -0.5] : [2.6, 0.4, 0];

  return (
    <group position={position}>
      {/* Denser inner wireframe sphere */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial
          color="#8b5cf6" // Violet core
          wireframe={true}
          transparent={true}
          opacity={0.24}
        />
      </mesh>

      {/* Denser outer wireframe Icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshBasicMaterial
          color="#33e6ff" // Cyan outer wireframe
          wireframe={true}
          transparent={true}
          opacity={0.12}
        />
      </mesh>

      {/* Soft volumetric center core sphere */}
      <mesh ref={coreGlowRef}>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshBasicMaterial
          color="#33e6ff"
          transparent={true}
          opacity={0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Local lighting helper for interactive glow reflection */}
      <pointLight color="#33e6ff" intensity={0.6} distance={6} decay={2} />
    </group>
  );
}
