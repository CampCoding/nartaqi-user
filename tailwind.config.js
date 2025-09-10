/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Next.js App Router
    "./pages/**/*.{js,jsx,ts,tsx}", // If you still use Pages Router
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // In case you keep components in src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        "foundation-bluenormal": "var(--foundation-bluenormal)",
        "foundation-orangenormal": "var(--foundation-orangenormal)",
        foundationbluenormal: "var(--foundationbluenormal)",
        "variable-collection-stroke": "var(--variable-collection-stroke)",
        "variable-collection-text": "var(--variable-collection-text)",
        "variable-collection-white-moca":
          "var(--variable-collection-white-moca)",
      },

      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        noto: ["var(--font-noto-sans-arabic)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
