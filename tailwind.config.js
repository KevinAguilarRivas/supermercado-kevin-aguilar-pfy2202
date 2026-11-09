/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind solo genera las clases que encuentre en estos archivos (purga en producción)
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // Paleta NextPixel Market: estilo neón/cyberpunk en tonos verdes
      colors: {
        np: {
          bg: "#07130e",
          "bg-alt": "#0a1a13",
          surface: "#0f2219",
          "surface-alt": "#143023",
          border: "rgb(163 230 53 / 0.18)",
          primary: "#10b981",
          "primary-dark": "#34d399",
          accent: "#a3e635",
          cyan: "#22d3ee",
          white: "#f0fdf4",
          muted: "#9dbfae",
          footer: "#040c08",
        },
      },
      fontFamily: {
        display: ["Orbitron", "Segoe UI", "sans-serif"],
        sans: ["Rajdhani", "Segoe UI", "sans-serif"],
      },
      backgroundImage: {
        "np-hero":
          "linear-gradient(135deg, #05140d 0%, #064e3b 45%, #059669 75%, #22d3ee 160%)",
        "np-accent": "linear-gradient(120deg, #a3e635, #10b981)",
        "np-title": "linear-gradient(120deg, #d9f99d, #a5f3fc)",
      },
      borderRadius: {
        np: "16px",
      },
      boxShadow: {
        glow: "0 20px 50px rgba(16, 185, 129, 0.35)",
      },
    },
  },
  plugins: [],
};
