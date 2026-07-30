"use client";

import { Sparkles } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";

const BASE_POSITION = { x: -0.34, y: 0.06 };
const BASE_ROTATION = { x: 0.035, y: -0.22, z: 0.02 };

function Satellite({
  position,
  scale,
  opacity,
}: {
  position: [number, number, number];
  scale: number;
  opacity: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color="#aebdce"
        roughness={0.24}
        metalness={0.68}
        transmission={0.08}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function InteractiveCore() {
  const group = useRef<Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    let animationFrame = 0;
    let animating = false;

    const animate = () => {
      const current = group.current;
      if (!current) {
        animating = false;
        return;
      }

      const rotationX = BASE_ROTATION.x - target.y * 0.095;
      const rotationY = BASE_ROTATION.y + target.x * 0.17;
      const rotationZ = BASE_ROTATION.z + target.x * 0.025;
      const positionX = BASE_POSITION.x + target.x * 0.16;
      const positionY = BASE_POSITION.y - target.y * 0.09;

      current.rotation.x += (rotationX - current.rotation.x) * 0.13;
      current.rotation.y += (rotationY - current.rotation.y) * 0.13;
      current.rotation.z += (rotationZ - current.rotation.z) * 0.13;
      current.position.x += (positionX - current.position.x) * 0.13;
      current.position.y += (positionY - current.position.y) * 0.13;
      invalidate();

      const remaining =
        Math.abs(rotationX - current.rotation.x) +
        Math.abs(rotationY - current.rotation.y) +
        Math.abs(positionX - current.position.x) +
        Math.abs(positionY - current.position.y);

      if (remaining > 0.001) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        animating = false;
      }
    };

    const startAnimation = () => {
      if (animating) return;
      animating = true;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight) * 2 - 1));
      startAnimation();
    };

    const reset = () => {
      target.x = 0;
      target.y = 0;
      startAnimation();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [invalidate]);

  return (
    <group
      ref={group}
      position={[BASE_POSITION.x, BASE_POSITION.y, 0]}
      rotation={[BASE_ROTATION.x, BASE_ROTATION.y, BASE_ROTATION.z]}
    >
      <mesh>
        <icosahedronGeometry args={[1.18, 4]} />
        <meshPhysicalMaterial
          color="#c9d1d9"
          roughness={0.18}
          metalness={0.74}
          transmission={0.14}
          transparent
          opacity={0.38}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.008, 8, 220]} />
        <meshBasicMaterial color="#8a96a3" transparent opacity={0.28} />
      </mesh>

      <mesh rotation={[0.5, Math.PI / 3.3, 0.4]}>
        <torusGeometry args={[3.35, 0.004, 8, 240]} />
        <meshBasicMaterial color="#d7dee7" transparent opacity={0.14} />
      </mesh>

      <mesh rotation={[-0.22, Math.PI / 2.2, -0.36]}>
        <torusGeometry args={[4.05, 0.003, 8, 260]} />
        <meshBasicMaterial color="#8fa5c1" transparent opacity={0.08} />
      </mesh>

      <Satellite position={[3.34, 0.96, -1.35]} scale={0.19} opacity={0.38} />
      <Satellite position={[0.78, -2.18, -0.15]} scale={0.16} opacity={0.48} />
    </group>
  );
}

export function UniverseScene() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.27} />
      <directionalLight position={[4, 5, 5]} intensity={2.45} />
      <pointLight position={[-4, -2, 2]} intensity={6.4} distance={8.5} />
      <pointLight position={[3.8, 1.2, 2.5]} intensity={2.1} distance={5.5} color="#9ab6db" />
      <InteractiveCore />
      <Sparkles count={66} scale={[10, 7, 6]} size={1.15} speed={0} opacity={0.31} />
    </Canvas>
  );
}
