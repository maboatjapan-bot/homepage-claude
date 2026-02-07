/**
 * Reusable Lighting Setup Component
 * Provides standardized lighting configurations for different moods
 */

import { ContactShadows, Environment, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function LightingSetup({
  preset = 'standard',
  shadows = false,
}) {
  const presets = {
    standard: (
      <>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow={shadows} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0d9488" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#1e40af" />
      </>
    ),
    bright: (
      <>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow={shadows} />
        <pointLight position={[-5, 5, -5]} intensity={0.8} />
      </>
    ),
    dramatic: (
      <>
        <ambientLight intensity={0.3} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow={shadows}
        />
        <pointLight position={[5, 0, 5]} intensity={1} color="#0d9488" />
        <pointLight position={[-5, 0, -5]} intensity={1} color="#1e40af" />
      </>
    ),
    neon: (
      <>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 5, 0]} intensity={2} color="#0d9488" />
        <pointLight position={[5, 0, 0]} intensity={1.5} color="#1e40af" />
        <pointLight position={[-5, 0, 0]} intensity={1.5} color="#0d9488" />
        <pointLight position={[0, -5, 0]} intensity={1} color="#1e40af" />
      </>
    ),
  };

  return (
    <>
      {presets[preset] || presets.standard}

      {/* Optional shadows */}
      {shadows && <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2} />}

      {/* Optional environment map for reflections */}
      {preset === 'standard' && <Environment preset="city" />}
    </>
  );
}
