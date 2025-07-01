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
        'neon-cyan': '#00ffff',
        'neon-pink': '#ff0080',
        'neon-green': '#00ff80',
        'deep-black': '#0a0a0a',
        'surface': '#1a1a1a',
        'surface-elevated': '#2a2a2a',
      },
      boxShadow: {
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor',
        'neon-sm': '0 0 5px currentColor, 0 0 10px currentColor',
        'depth': '0 4px 8px rgba(0, 255, 255, 0.1), 0 8px 16px rgba(0, 255, 255, 0.1), 0 16px 32px rgba(0, 255, 255, 0.1)',
        'depth-intense': '0 8px 16px rgba(0, 255, 255, 0.2), 0 16px 32px rgba(0, 255, 255, 0.2), 0 32px 64px rgba(0, 255, 255, 0.2)',
        'sun': "0 0 10px rgba(250, 204, 21, 0.4)",
        'moon': "0 0 10px rgba(148, 163, 184, 0.2)",
      },
      transitionTimingFunction: {
        'spring': "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        'float-3d': 'float3d 6s ease-in-out infinite',
        'rotate-3d': 'rotate3d 20s linear infinite',
        'pulse-3d': 'pulse3d 2s ease-in-out infinite',
        'hologram': 'hologram 8s ease infinite',
        'scanlines': 'scanlines 3s linear infinite',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'holographic': 'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%)',
        'geometric': 'linear-gradient(30deg, transparent 40%, rgba(0, 255, 255, 0.1) 40%, rgba(0, 255, 255, 0.1) 60%, transparent 60%), linear-gradient(-30deg, transparent 40%, rgba(255, 0, 128, 0.1) 40%, rgba(255, 0, 128, 0.1) 60%, transparent 60%)',
      },
      backgroundSize: {
        '200': '200% 200%',
        '400': '400% 400%',
        'geometric': '60px 60px',
      },
    },
  },
  plugins: [],
};