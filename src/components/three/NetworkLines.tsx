import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type NetworkLinesProps = {
  count?: number;
  maxDistance?: number;
};

export default function NetworkLines({ count = 30, maxDistance = 3.2 }: NetworkLinesProps) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);

  // Initialize node positions and velocities
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Confine initially to a box
      pos[i * 3] = (Math.random() - 0.5) * 12;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;  // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;  // Z

      // Small velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  // Pre-allocate buffer for connected lines
  const maxLines = (count * (count - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 2 * 3), [maxLines]);

  useFrame(() => {
    if (!nodesRef.current || !lineRef.current) return;

    const posAttr = nodesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const linePosAttr = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;

    const coords = posAttr.array as Float32Array;
    const vel = velocities;

    // Update positions and handle boundary bounce
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      coords[idx] += vel[idx];
      coords[idx + 1] += vel[idx + 1];
      coords[idx + 2] += vel[idx + 2];

      // Keep them within boundary box
      if (Math.abs(coords[idx]) > 7) vel[idx] *= -1;
      if (Math.abs(coords[idx + 1]) > 5) vel[idx + 1] *= -1;
      if (Math.abs(coords[idx + 2]) > 4) vel[idx + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // Connect close nodes in the line segments buffer
    let lineIdx = 0;
    const lineCoords = linePosAttr.array as Float32Array;
    lineCoords.fill(0); // Reset existing lines

    for (let i = 0; i < count; i++) {
      const x1 = coords[i * 3];
      const y1 = coords[i * 3 + 1];
      const z1 = coords[i * 3 + 2];

      for (let j = i + 1; j < count; j++) {
        const x2 = coords[j * 3];
        const y2 = coords[j * 3 + 1];
        const z2 = coords[j * 3 + 2];

        // Quick distance calculation
        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          if (lineIdx < lineCoords.length - 6) {
            lineCoords[lineIdx++] = x1;
            lineCoords[lineIdx++] = y1;
            lineCoords[lineIdx++] = z1;
            lineCoords[lineIdx++] = x2;
            lineCoords[lineIdx++] = y2;
            lineCoords[lineIdx++] = z2;
          }
        }
      }
    }
    linePosAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Constellation dots */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#33e6ff"
          size={0.065}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.5}
        />
      </points>

      {/* Network connection paths */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent={true}
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
