// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// export default {
//     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//     theme: {
//       extend: {
//         fontFamily: {
//           figtree: ["Figtree", "sans-serif"],
//         },
//         colors: {
//           primary: "#00A6F4",
//           secondary: "#9333EA",

//         },
//       },
//     }, 
//     plugins: [],
//   }
  


import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
      },
      colors: {
        primary: "#00A6F4",
        secondary: "#9333EA",
      },
    },
  },
  plugins: [],
};

export default config;
