import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

type ProjectNodeProps = {
  name: string;
  type: string;
  accent: string;
  relPos: [number, number, number];
  phase: number;
};

function FloatingNode({ name, type, accent, relPos, phase }: ProjectNodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Store initial relative position
  const initialPos = useMemo(() => new THREE.Vector3(...relPos), [relPos]);

  // Calculate local vector from the core (0,0,0) to this node
  const linePoints = useMemo(() => {
    const points = [];
    // Start at core (local -relPos)
    points.push(new THREE.Vector3(-relPos[0], -relPos[1], -relPos[2]));
    points.push(new THREE.Vector3(0, 0, 0));
    return points;
  }, [relPos]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  // Color mapping based on accent
  const accentColor = 
    accent === "green" ? "#3dd9a0" : 
    accent === "cyan" ? "#33e6ff" : 
    accent === "violet" ? "#8b5cf6" : "#ffd166";

  // Create THREE.Line programmatically
  const connectionLine = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Line(lineGeometry, material);
  }, [lineGeometry, accentColor]);

  // Dispose WebGL resources on component unmount
  useEffect(() => {
    return () => {
      connectionLine.geometry.dispose();
      if (Array.isArray(connectionLine.material)) {
        connectionLine.material.forEach((m) => m.dispose());
      } else {
        connectionLine.material.dispose();
      }
    };
  }, [connectionLine]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Gentle float animation (slow breathing motion)
    const floatY = Math.sin(time * 0.7 + phase) * 0.14;
    const floatX = Math.cos(time * 0.5 + phase) * 0.08;
    
    groupRef.current.position.set(
      initialPos.x + floatX,
      initialPos.y + floatY,
      initialPos.z
    );

    // Micro rotation wobble for 3D realism
    groupRef.current.rotation.z = Math.sin(time * 0.35 + phase) * 0.02;
    groupRef.current.rotation.y = Math.cos(time * 0.45 + phase) * 0.03;

    // Pulse connection line opacity to feel active
    const mat = connectionLine.material as THREE.LineBasicMaterial;
    if (mat) {
      mat.opacity = 0.2 + Math.sin(time * 3.0 + phase) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection Line from Core (0,0,0) to Node */}
      <primitive object={connectionLine} />

      {/* Tiny light emitter at node connection point */}
      <mesh>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
      </mesh>

      {/* Floating Holographic Badge Card */}
      <Html
        distanceFactor={4.5}
        position={[0, 0.15, 0]}
        transform
        pointerEvents="auto"
      >
        <div 
          className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[#080b11]/85 border border-white/[0.08] backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-white/20 select-none pointer-events-auto"
          style={{
            width: "210px",
            boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5), 0 0 15px ${accentColor}1c`,
            borderLeft: `3px solid ${accentColor}`
          }}
        >
          {/* Left section: status dot and Name */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-[5px] w-[5px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: accentColor }} />
              <span className="relative inline-flex rounded-full h-[5px] w-[5px]" style={{ backgroundColor: accentColor }} />
            </span>
            <span className="font-sans text-[11px] font-bold text-[#f5f7fb] tracking-wide uppercase whitespace-nowrap">{name}</span>
          </div>

          {/* Right section: Type */}
          <span className="font-mono text-[8.5px] font-semibold text-[#8a95a5] uppercase tracking-wider bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/[0.04] whitespace-nowrap">
            {type}
          </span>
        </div>
      </Html>
    </group>
  );
}

export default function HeroProjectNodes() {
  return (
    <group>
      {/* Node 1: J.A.R.V.I.S */}
      <FloatingNode
        name="J.A.R.V.I.S"
        type="AI Assistant"
        accent="cyan"
        relPos={[-1.7, 0.7, 0.3]}
        phase={0}
      />

      {/* Node 2: F.R.I.D.A.Y */}
      <FloatingNode
        name="F.R.I.D.A.Y"
        type="Realtime AI"
        accent="violet"
        relPos={[1.7, 0.4, -0.2]}
        phase={2.0}
      />

      {/* Node 3: InvoiceFlow */}
      <FloatingNode
        name="InvoiceFlow"
        type="Fintech Platform"
        accent="green"
        relPos={[-1.3, -0.8, 0.4]}
        phase={4.0}
      />
    </group>
  );
}
