"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

import { wedding } from "@/lib/wedding";

// Suppress THREE.Clock deprecation warning caused by R3F internal loop
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
    originalWarn(...args);
  };
}

const PARTICLE_COUNT = 1500;
const particlePositions = (() => {
  const p = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    p[i * 3] = (Math.random() - 0.5) * 20;
    p[i * 3 + 1] = (Math.random() - 0.5) * 20;
    p[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  return p;
})();

function AtmosphereParticles() {
  const positions = particlePositions;

  const pointsRef = useRef<THREE.Points>(null);

  const time = useRef(0);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      time.current += delta;
      pointsRef.current.rotation.y = time.current * 0.02;
      pointsRef.current.position.y = Math.sin(time.current * 0.1) * 0.5;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d4af37" // warm gold
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CameraController({ isIntroFinished }: { isIntroFinished: boolean }) {
  useFrame((state) => {
    if (!isIntroFinished) return;

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollProgress = scrollY / maxScroll;

    // Cinematic target positions based on scroll
    // Starts at z=8, moves inwards as we scroll
    const targetZ = 8 - scrollProgress * 10; 
    const targetY = scrollProgress * 2;
    const targetX = Math.sin(scrollProgress * Math.PI) * 1.5;

    // Smooth lerp for buttery camera movement
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.03;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.03;

    // Subtle rotation
    state.camera.rotation.y = Math.sin(scrollProgress * Math.PI) * 0.1;
    state.camera.rotation.x = -scrollProgress * 0.05;
  });

  return null;
}



export function WeddingCanvas({ introState }: { introState: string }) {
  const isFinished = introState === "finished" || introState === "transitioning";
  return (
    <div className={`fixed inset-0 z-[1] pointer-events-none transition-colors duration-1000 ${isFinished ? "bg-transparent" : "bg-night"}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#fdf4e3" />
          
          <AtmosphereParticles />
          <CameraController isIntroFinished={isFinished} />

          {/* Very soft warm environment lighting */}
          <Environment preset="sunset" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
