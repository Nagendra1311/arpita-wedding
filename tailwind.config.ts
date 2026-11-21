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
        background: "#080706",
        foreground: "#f7f4ee",
        luxury: {
          950: "#050403",
          900: "#0c0a08",
          850: "#14110d",
          800: "#1a1612",
          700: "#27211b",
        },
        gold: {
          50: "#fdfbf7",
          100: "#faf4e6",
          200: "#f2e3be",
          300: "#e5cc8f",
          400: "#d4b35e",
          500: "#c49b38",
          600: "#aa8029",
          700: "#86611e",
          800: "#654718",
          900: "#473212",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Playfair Display", "Georgia", "serif"],
        cormorant: ["'Cormorant Garamond'", "Baskerville", "serif"],
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "shimmer": "shimmer 3s ease-in-out infinite",
        "golden-glow": "glow 4s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        glow: {
          "0%": {
            filter: "drop-shadow(0 0 15px rgba(212, 179, 94, 0.35)) drop-shadow(0 0 35px rgba(196, 155, 56, 0.2))",
          },
          "100%": {
            filter: "drop-shadow(0 0 30px rgba(212, 179, 94, 0.7)) drop-shadow(0 0 65px rgba(196, 155, 56, 0.45))",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSubtle: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.02)", opacity: "0.92" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
