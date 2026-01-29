/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AI Engineer Dark Theme Palette
        'ai-navy': '#0A1628',
        'ai-navy-light': '#0D1B2A',
        'ai-charcoal': '#1A1F2E',
        'ai-charcoal-light': '#242938',
        'ai-slate': '#2D3344',
        
        // Accent Colors
        'ai-cyan': '#00D9FF',
        'ai-cyan-glow': 'rgba(0, 217, 255, 0.4)',
        'ai-blue': '#3B82F6',
        'ai-purple': '#8B5CF6',
        'ai-green': '#10B981',
        'ai-amber': '#F59E0B',
        
        // Text Colors
        'ai-text': '#E2E8F0',
        'ai-text-muted': '#94A3B8',
        'ai-text-dim': '#64748B',
        
        // Legacy support
        'neon-cyan': '#00D9FF',
        'neon-pink': '#EC4899',
        'neon-green': '#10B981',
        'deep-black': '#0A1628',
        'surface': '#1A1F2E',
        'surface-elevated': '#242938',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3), 0 0 40px rgba(0, 217, 255, 0.1)',
        'glow-cyan-intense': '0 0 30px rgba(0, 217, 255, 0.5), 0 0 60px rgba(0, 217, 255, 0.2)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
        'depth': '0 4px 16px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)',
        'depth-lg': '0 8px 32px rgba(0, 0, 0, 0.5), 0 16px 64px rgba(0, 0, 0, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(0, 217, 255, 0.1)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor',
        'neon-sm': '0 0 3px currentColor, 0 0 6px currentColor',
      },
      transitionTimingFunction: {
        'spring': "cubic-bezier(0.4, 0, 0.2, 1)",
        'smooth': "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'node-pulse': 'nodePulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px rgba(0, 217, 255, 0.4)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)' },
        },
        dataFlow: {
          '0%': { strokeDashoffset: '100', opacity: '0.3' },
          '50%': { opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '0.3' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        nodePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(180deg, #0A1628 0%, #0D1B2A 50%, #1A1F2E 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(36, 41, 56, 0.8) 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00D9FF 0%, #3B82F6 50%, #8B5CF6 100%)',
        'grid-pattern': 'linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        '200': '200% 200%',
        '400': '400% 400%',
        'grid': '40px 40px',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};