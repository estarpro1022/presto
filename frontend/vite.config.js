import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup.js",
    exclude: ["node_modules", "dist", ".cache"],
    include: ["src/**/*.test.{js,ts,jsx,tsx}"], 
  },
  server: {
    port: 3000,
    host: true
  },
});
