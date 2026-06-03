import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

type ProjectNodeProps = {
  name: string;
  type: string;
  status: string;
  accent: string;
  relPos: [number, number, number];
  phase: number;
};

function FloatingNode({ name, type, status, accent, relPos, phase }: ProjectNodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Store initial relative position
  const initialPos = useMemo(() => new THREE.Vector3(...relPos), [relPos]);

  // Calculate local vector from the core (0,0,0) to this node
  // In the node's local coordinate system, the core is at -position
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
    accent === "blue" ? "#4f7cff" : 
    accent === "violet" ? "#8b5cf6" : "#ffd166";

  // Create THREE.Line programmatically to avoid JSX SVG type conflicts
  const connectionLine = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Line(lineGeometry, material);
  }, [lineGeometry, accentColor]);

  // Safely dispose WebGL resources on component unmount
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

    // Floating animation (gentle Y translation and micro rotational wobble)
    const floatY = Math.sin(time * 0.8 + phase) * 0.12;
    const floatX = Math.cos(time * 0.6 + phase) * 0.08;
    
    groupRef.current.position.set(
      initialPos.x + floatX,
      initialPos.y + floatY,
      initialPos.z
    );

    // Micro rotation
    groupRef.current.rotation.z = Math.sin(time * 0.4 + phase) * 0.03;
    groupRef.current.rotation.y = Math.cos(time * 0.5 + phase) * 0.04;

    // Pulse connection line opacity
    const mat = connectionLine.material as THREE.LineBasicMaterial;
    if (mat) {
      mat.opacity = 0.15 + Math.sin(time * 4.0 + phase) * 0.12;
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

      {/* Floating HTML Card */}
      <Html
        distanceFactor={4.5}
        position={[0, 0, 0]}
        transform
        pointerEvents="auto"
      >
        <div 
          className="flex flex-col gap-1 p-[14px] rounded-[14px] bg-[#0d0f17]/85 border border-white/[0.08] backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-white/20 select-none pointer-events-auto"
          style={{
            width: "160px",
            boxShadow: `0 8px 30px rgba(0, 0, 0, 0.4), 0 0 10px ${accentColor}12`
          }}
        >
          {/* Top category row */}
          <div className="flex items-center justify-between w-full">
            <span className="font-mono text-[8px] text-[#626b78] uppercase tracking-wider">{type}</span>
            <div className="flex items-center gap-[4px] px-[6px] py-[2px] rounded-full bg-white/[0.03] border border-white/[0.04]">
              <span className="relative flex h-[4.5px] w-[4.5px]">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[${accentColor}]`} style={{ backgroundColor: accentColor }} />
                <span className="relative inline-flex rounded-full h-[4.5px] w-[4.5px]" style={{ backgroundColor: accentColor }} />
              </span>
              <span className="font-sans text-[7.5px] font-medium text-[#9aa4b2] whitespace-nowrap">{status}</span>
            </div>
          </div>

          {/* Project Name */}
          <h4 className="font-sans text-[13px] font-bold text-white tracking-tight mt-0.5">{name}</h4>
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
        status="Experiment"
        accent="blue"
        relPos={[-2.0, 1.3, 0.2]}
        phase={0}
      />

      {/* Node 2: F.R.I.D.A.Y */}
      <FloatingNode
        name="F.R.I.D.A.Y"
        type="Realtime AI"
        status="Experiment"
        accent="violet"
        relPos={[2.1, 0.9, -0.4]}
        phase={2.0}
      />

      {/* Node 3: InvoiceFlow */}
      <FloatingNode
        name="InvoiceFlow"
        type="Fintech Platform"
        status="Prototype"
        accent="green"
        relPos={[-1.6, -1.3, 0.4]}
        phase={4.0}
      />
    </group>
  );
}
