// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,jsx,ts,tsx}", // Next.js App Router
//     "./pages/**/*.{js,jsx,ts,tsx}", // If you still use Pages Router
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./src/**/*.{js,jsx,ts,tsx}", // In case you keep components in src
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#3B82F6",
//         "sup-title": "#71717A",
//         "foundation-bluenormal": "var(--primary)",
//         "foundation-bluedarker": "var(--foundation-bluedarker)",
//         "foundation-bluelight-hover": "var(--foundation-bluelight-hover)",
//         "foundation-bluewhite": "var(--foundation-bluewhite)",
//         "foundation-orangenormal": "var(--foundation-orangenormal)",
//         "foundation-yellowlight": "var(--foundation-yellowlight)",
//         "foundation-yellownormal": "var(--foundation-yellownormal)",
//         text: "#2D2D2D",
//         "variable-collection-stroke": "var(--variable-collection-stroke)",
//         "variable-collection-text": "var(--variable-collection-text)",
//         "variable-collection-white-moca":
//           "var(--variable-collection-white-moca)",
//       },

//       fontFamily: {
//         cairo: ["var(--font-cairo)", "sans-serif"],
//         noto: ["var(--font-noto-sans-arabic)", "sans-serif"],
//         inter: ["var(--font-inter)", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Next.js App Router
    "./pages/**/*.{js,jsx,ts,tsx}", // Pages Router
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // src folder if used
    "./public/**/*.{js,jsx,ts,tsx}", // src folder if used
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
          bg: "var(--color-primary-bg)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          light: "var(--color-secondary-light)",
          warm: "var(--color-secondary-warm)",
          dark: "var(--color-secondary-dark)",
        },
        tertiary: {
          DEFAULT: "var(--color-tertiary)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          alt: "var(--color-text-alt)",
        },
        bg: {
          DEFAULT: "var(--color-bg)",
          alt: "var(--color-bg-alt)",
        },
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: {
          DEFAULT: "var(--color-warning)",
          light: "var(--color-warning-light)",  
        },
        danger: "var(--color-danger)",
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
        noto: ["var(--font-noto-sans-arabic)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  // plugins: [], 
  plugins: [require("@tailwindcss/typography")],
};
