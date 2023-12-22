import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
    },
    colors: {
      primary: "#105e38",
      secondary: "#a6e0b8",
      accent: "#37cdbe",
      neutral: "#d0f2db",
    },
  },
  plugins: [],
};
export default config;
