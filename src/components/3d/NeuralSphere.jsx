/**
 * 3D Neural Network Sphere - React + React Three Fiber Version
 * Interactive 3D visualization of neural network with animated nodes
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Scene3D from './shared/Scene3D';
import LightingSetup from './shared/LightingSetup';

function NeuralNetworkNodes({ nodeCount = 80, radius = 2 }) {
  const groupRef = useRef();

  // Generate Fibonacci sphere distribution for even node placement
  const { positions, indices } = useMemo(() => {
    const positions = [];
    const indices = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      positions.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusAtY * radius,
          y * radius,
          Math.sin(theta) * radiusAtY * radius
        )
      );
      indices.push(i);
    }

    return { positions, indices };
  }, [nodeCount, radius]);

  // Animate nodes (breathing effect)
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.0005;

      // Breathing animation for each node
      groupRef.current.children.forEach((node, i) => {
        if (node.type === 'Mesh') {
          const scale = 1 + Math.sin(time * 2 + i * 0.3) * 0.25;
          node.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {indices.map((i) => (
        <mesh key={`node-${i}`} position={positions[i]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#0d9488' : '#1e40af'}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function NeuralConnections({ positions, maxDistance = 1.2 }) {
  const linesRef = useRef();

  // Generate connections between nearby nodes
  const { linePositions } = useMemo(() => {
    const linePositions = [];

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const distance = positions[i].distanceTo(positions[j]);
        if (distance < maxDistance) {
          linePositions.push(positions[i].x, positions[i].y, positions[i].z);
          linePositions.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }

    return { linePositions };
  }, [positions, maxDistance]);

  // Animate line opacity
  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.getElapsedTime();
      const material = linesRef.current.material;
      material.opacity = 0.08 + Math.sin(time * 3) * 0.05;
    }
  });

  return (
    <line ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={new Float32Array(linePositions)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#0d9488" transparent opacity={0.1} />
    </line>
  );
}

function OuterParticleRing({ count = 300, radius = 2.8 }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = radius + Math.random() * 0.5;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(theta) * r;
    }
    return pos;
  }, [count, radius]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= 0.001;
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
      </bufferGeometry>
      <pointsMaterial
        color="#1e40af"
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function NeuralSphere({
  nodeCount = 80,
  radius = 2,
  className = '',
  style = {},
}) {
  const { positions } = useMemo(() => {
    const pos = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      pos.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusAtY * radius,
          y * radius,
          Math.sin(theta) * radiusAtY * radius
        )
      );
    }

    return { positions: pos };
  }, [nodeCount, radius]);

  return (
    <Scene3D
      cameraPosition={[0, 0, 5]}
      controls={false}
      lighting={false}
      className={className}
      style={style}
    >
      <LightingSetup preset="neon" />

      {/* Neural Network Nodes */}
      <NeuralNetworkNodes nodeCount={nodeCount} radius={radius} />

      {/* Connections between nodes */}
      <NeuralConnections positions={positions} maxDistance={1.2} />

      {/* Outer particle ring */}
      <OuterParticleRing count={300} radius={2.8} />
    </Scene3D>
  );
}
