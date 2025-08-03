"use client";
import { useWebGLSupport } from './hooks';

interface AnimatedBackgroundProps {
  density?: number;
  speed?: number;
  colorScheme?: 'blue' | 'purple' | 'gradient';
  className?: string;
}

// Main AnimatedBackground component
export default function AnimatedBackground({
  className = "fixed inset-0 -z-10"
}: AnimatedBackgroundProps) {
  const { hasWebGL, isLowEndDevice } = useWebGLSupport();
  
  // Don't render on low-end devices or without WebGL
  if (!hasWebGL || isLowEndDevice) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-50 via-white to-gray-100`} />
    );
  }

  return (
    <div className={className}>
      <div className="w-full h-full">
        {/* CSS-based animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradients */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
          </div>
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 20}s`,
                }}
              >
                <div
                  className={`w-8 h-8 ${
                    i % 3 === 0 ? 'bg-blue-500 rounded-full' :
                    i % 3 === 1 ? 'bg-purple-500 rotate-45' :
                    'bg-pink-500 rounded-full'
                  } animate-float`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// CSS animations (to be added to globals.css)
export const backgroundAnimationCSS = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;