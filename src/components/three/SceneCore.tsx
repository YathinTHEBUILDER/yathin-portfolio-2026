import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import ParticleField from "./ParticleField";
import NetworkLines from "./NetworkLines";

type SceneCoreProps = {
  isMobile?: boolean;
};

export default function SceneCore({ isMobile = false }: SceneCoreProps) {
  const { camera } = useThree();
  const scrollYRef = useRef(0);
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state) => {
    const scrollVal = scrollYRef.current;
    
    // Normalize scroll mapping (e.g., 2000px corresponds to 1 full camera sweep)
    const scrollRatio = scrollVal / (isMobile ? 1200 : 2200);

    // Mouse movement interactive offsets (desktop only)
    let pointerX = 0;
    let pointerY = 0;
    if (!isMobile) {
      pointerX = state.pointer.x * 1.6;
      pointerY = state.pointer.y * 1.0;
    }

    // Target coordinates
    const targetCamX = pointerX;
    // As we scroll, camera moves downward and slightly zooms back in Z space
    const targetCamY = -scrollRatio * 6.5 + pointerY;
    const targetCamZ = 7.5 + scrollRatio * 2.5;

    // Smooth lerps
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.06);

    // Make the camera look at a center point shifted down by scroll
    lookAtTargetRef.current.set(0, camera.position.y * 0.85, -2.5);
    camera.lookAt(lookAtTargetRef.current);
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[4, 6, 4]} intensity={0.3} />
      
      {/* Background drifting particles */}
      <ParticleField count={isMobile ? 150 : 550} />

      {/* Network constellation (desktop only) */}
      {!isMobile && <NetworkLines count={26} maxDistance={3.5} />}



      {/* Floating Low-Opacity Tech Data Planes (desktop only) */}
      {!isMobile && (
        <group>
          <gridHelper 
            args={[32, 24, "#8b5cf6", "rgba(139, 92, 246, 0.015)"]} 
            position={[0, -2.5, -4]} 
            rotation={[0.3, 0.1, 0.05]} 
          />
          <gridHelper 
            args={[24, 16, "#33e6ff", "rgba(51, 230, 255, 0.01)"]} 
            position={[3, -5.5, -6]} 
            rotation={[0.15, -0.15, -0.05]} 
          />
        </group>
      )}
    </>
  );
}
