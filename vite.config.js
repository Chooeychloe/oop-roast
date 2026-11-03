import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative asset URLs also work when a static host serves the app from a subpath.
  base: "./",
  plugins: [react(), tailwindcss()],
});
