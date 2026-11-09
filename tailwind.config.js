/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind solo genera las clases que encuentre en estos archivos (purga en producción)
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      // Paleta de la marca NextPixel (la misma de la web de Frontend I)
      colors: {
        np: {
          bg: '#120a1f',
          'bg-alt': '#180e2b',
          surface: '#211236',
          'surface-alt': '#2a1743',
          border: 'rgb(232 121 249 / 0.18)',
          primary: '#8b5cf6',
          'primary-dark': '#6d28d9',
          accent: '#e879f9',
          cyan: '#22d3ee',
          white: '#f8f5ff',
          muted: '#b8a9d9',
          footer: '#0d0717',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'Segoe UI', 'sans-serif'],
        sans: ['Rajdhani', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'np-hero': 'linear-gradient(135deg, #170b30 0%, #4c1d95 45%, #9333ea 75%, #22d3ee 160%)',
        'np-accent': 'linear-gradient(120deg, #e879f9, #8b5cf6)',
        'np-title': 'linear-gradient(120deg, #f5d0fe, #a5f3fc)',
      },
      borderRadius: {
        np: '16px',
      },
      boxShadow: {
        glow: '0 20px 50px rgba(139, 92, 246, 0.35)',
      },
    },
  },
  plugins: [],
};
