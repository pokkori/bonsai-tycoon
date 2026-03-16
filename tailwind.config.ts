import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        washi: {
          50: "#f5f0e8",
          100: "#ede4d0",
          200: "#e8dcc8",
          300: "#d4c4a0",
        },
        deepGreen: "#1b4332",
        vermillion: "#c0392b",
        gold: "#d4af37",
      },
      fontFamily: {
        serif: ["Noto Serif JP", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
