import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "build",
    assetsDir: "assets",
  },
  server: {
    port: 3000,
  },
});
