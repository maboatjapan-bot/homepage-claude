/**
 * Modern Hero Gradient Background
 * Inspired by Apple and modern premium websites
 * Features dynamic animated gradient mesh with subtle movement
 */

export default function HeroGradient({ className = '' }) {
  return (
    <div
      className={`hero-gradient-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Animated gradient mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(13, 148, 136, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(30, 64, 175, 0.20) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(13, 148, 136, 0.15) 0%, transparent 40%)
          `,
          animation: 'gradientShift 20s ease-in-out infinite alternate',
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle top highlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(180deg, rgba(13, 148, 136, 0.05) 0%, transparent 100%)',
          animation: 'topPulse 8s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes gradientShift {
          0% {
            opacity: 0.6;
            transform: scale(1) translate(0, 0);
          }
          100% {
            opacity: 1;
            transform: scale(1.05) translate(-20px, 10px);
          }
        }

        @keyframes topPulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
