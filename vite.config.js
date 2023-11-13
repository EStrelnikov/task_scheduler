import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  server: {
    port: 8008,
  },
});
