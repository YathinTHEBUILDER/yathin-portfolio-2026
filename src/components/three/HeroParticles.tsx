import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type HeroParticlesProps = {
  count?: number;
  mouseRef: React.RefObject<{ x: number; y: number }>;
};

export default function HeroParticles({ count = 250, mouseRef }: HeroParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-generate random particle positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spherical coordinates or wide box coordinates for immersive scattering
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      // Distance from center between 4.0 and 12.0 units
      const distance = 3.5 + Math.random() * 8.5;

      arr[i * 3] = distance * Math.sin(phi) * Math.cos(theta); // X
      arr[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta); // Y
      arr[i * 3 + 2] = distance * Math.cos(phi); // Z
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Slow continuous rotation
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = time * 0.01;

    // 2. Subtle cursor parallax shift
    const targetX = mouseRef.current.x * 0.4;
    const targetY = mouseRef.current.y * 0.4;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#33e6ff" // cyan particles
        size={0.045}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
