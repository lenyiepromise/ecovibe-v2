import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The "Deep Jungle" Backgrounds
        eco: {
          base: '#050B07',    // The darkest background (Main Page)
          card: '#0A120D',    // Card background
          surface: '#131816', // Lighter surface (Sidebar/Inputs)
          border: '#1A261E',  // Subtle borders
        },
        // The "Neon" Accents
        brand: {
          green: '#00F090',      // That bright electric green
          dim: '#00B965',        // Hover state
          dark: '#064e3b',       // Dark text on green bg
          glow: 'rgba(0, 240, 144, 0.5)',
        },
        // Text Colors
        text: {
          main: '#FFFFFF',
          muted: '#859E90',      // That specific gray-green text
          dim: '#4B5563',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'], 
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.00) 100%)',
        'gradient-glow': 'radial-gradient(circle at center, rgba(0, 240, 144, 0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
export default config;