/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vortex-orange': '#ff6b35',
        'vortex-blue': '#4f9cf9',
        'glass-black': 'rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'stripe-move': 'stripe-move 2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            'box-shadow': '0 0 20px rgba(255, 107, 53, 0.3)' 
          },
          '100%': { 
            'box-shadow': '0 0 40px rgba(255, 107, 53, 0.8)' 
          }
        },
        'stripe-move': {
          '0%': { 
            transform: 'translateX(-100%)' 
          },
          '100%': { 
            transform: 'translateX(300%)' 
          }
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}