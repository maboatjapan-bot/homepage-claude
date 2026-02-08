/**
 * Hero Section Particle Background
 * Lightweight animated particles for hero section backgrounds
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Scene3D from './shared/Scene3D';

function Particles({ count = 200, radius = 8 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Create a wide, shallow distribution
      pos[i3] = (Math.random() - 0.5) * radius * 2;     // x: spread wide
      pos[i3 + 1] = (Math.random() - 0.5) * radius;     // y: less vertical
      pos[i3 + 2] = (Math.random() - 0.5) * radius * 0.5; // z: shallow depth
    }
    return pos;
  }, [count, radius]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color('#0d9488'); // brand-teal
    const color2 = new THREE.Color('#1e40af'); // brand-blue

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    return col;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle floating motion
      pointsRef.current.rotation.y = time * 0.02;
      pointsRef.current.position.y = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        transparent
        opacity={0.7}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroParticles({
  particleCount = 200,
  radius = 8,
  className = '',
  style = {},
}) {
  return (
    <Scene3D
      cameraPosition={[0, 0, 5]}
      controls={false}
      lighting={false}
      className={className}
      style={style}
    >
      {/* Minimal lighting for particles */}
      <ambientLight intensity={0.5} />
      <Particles count={particleCount} radius={radius} />
    </Scene3D>
  );
}
