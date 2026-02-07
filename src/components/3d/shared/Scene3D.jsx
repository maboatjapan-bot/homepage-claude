/**
 * Reusable 3D Scene Component
 * Provides a standardized Three.js scene setup with common configurations
 */

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function Scene3D({
  children,
  cameraPosition = [0, 0, 5],
  controls = true,
  lighting = true,
  className = '',
  style = {},
}) {
  return (
    <div className={`scene-3d-container ${className}`} style={style}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Camera */}
        <PerspectiveCamera makeDefault position={cameraPosition} fov={75} />

        {/* Orbit Controls (optional) */}
        {controls && <OrbitControls enableZoom={false} enablePan={false} />}

        {/* Default Lighting */}
        {lighting && (
          <>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
          </>
        )}

        {/* Custom Content */}
        {children}
      </Canvas>

      <style jsx>{`
        .scene-3d-container {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .scene-3d-container canvas {
          display: block !important;
          outline: none !important;
        }
      `}</style>
    </div>
  );
}
