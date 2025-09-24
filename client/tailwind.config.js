/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // BarBooks Theme Colors
        barbook: {
          navy: "#21293B",
          "navy-dark": "#1A2130",
          "navy-light": "#2A3441",
          gray: "#D3D3D3",
          "gray-light": "#E8E8E8",
          "gray-dark": "#B8B8B8",
          accent: "#4A90E2",
          "accent-light": "#6BA3E8",
          "accent-dark": "#3A7BC8",
        },
        // Background gradient colors
        "barbook-bg": {
          primary: "#21293B",
          secondary: "#1A2130",
          tertiary: "#2A3441",
        },
      },
      backgroundImage: {
        "barbook-gradient":
          "linear-gradient(135deg, #21293B 0%, #1A2130 50%, #2A3441 100%)",
        "barbook-curves":
          "radial-gradient(ellipse at top right, #1A2130 0%, transparent 70%), radial-gradient(ellipse at top center, #2A3441 0%, transparent 60%)",
      },
      fontFamily: {
        barbook: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(74, 144, 226, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(74, 144, 226, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
