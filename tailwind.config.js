/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md2: "872px",
      },
      fontSize: {
        title: ["clamp(3rem, 14vw, 9rem)"],
        "heading-1": ["clamp(2.5rem, 6.5vw, 10rem)"],
        "heading-2": ["clamp(2.4rem, 8vw, 10rem)"],
        "heading-3": ["clamp(2rem, 5vw, 2.75rem)"],
        special: ["clamp(2rem, 4vw, 3.25rem)"],
        "works-title": ["clamp(1.25rem, 2vw, 1.5rem)"],
        "body-1": ["clamp(1.1rem, 2vw, 1.3rem)"],
        "body-2": ["clamp(1rem, 1.5vw, 1.5rem)"],
        "body-3": "1.1rem",
        "body-4": ["clamp(0.75rem, 3vw, 1rem)"],
      },
      letterSpacing: {
        headings: "-0.03em",
      },
      fontFamily: {
        general: ["GeneralSans-Variable", "sans-serif"],
        grotesk: ["CabinetGrotesk-Variable", "sans-serif"],
        serif: ["DMSerifText-Regular", "serif"],
        urdu: ["NotoSansArabic_Condensed-Medium", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        "primary-200": "#F2F2F2", // very light gray, almost white → good for backgrounds
        "primary-300": "#E6E6E6", // light gray → subtle section separators / cards
        "primary-400": "#D9D9D9", // medium-light gray → borders, muted UI elements

        "secondary-100": "#F6FAF7", // very light, almost white-green tint → soft background highlight
        "secondary-500": "#8FA58F", // medium sage green → base text / buttons
        "secondary-600": "#5E862B", // LawYaar brand green → vibrant highlight / attention-grabbing

        "accent-400": "#0E0E0C", // almost black → primary text / headings
        "accent-300": "#262626", // dark gray → secondary text / icons
        "accent-200": "#4D4D4D", // medium gray → placeholders, subdued UI
        "accent-100": "#666666", // lighter gray → disabled text, subtle borders
      },
    },
  },
  plugins: [],
};
