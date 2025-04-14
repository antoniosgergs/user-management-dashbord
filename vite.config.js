import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import {viteMockServe} from 'vite-plugin-mock';

export default defineConfig({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {},
    },
  plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      viteMockServe({
         mockPath: 'mock',
         enable: true,
 }),
]})

