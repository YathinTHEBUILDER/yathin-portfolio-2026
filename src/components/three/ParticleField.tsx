import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ParticleFieldProps = {
  count?: number;
};

export default function ParticleField({ count = 600 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      // Spread particles across a wide 3D space
      arr[i * 3] = (Math.random() - 0.5) * 24;     // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16; // Z
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Very gentle drift rotation
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.008;
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
        color="#33e6ff"
        size={0.035}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.25}
        depthWrite={false}
      />
    </points>
  );
}
