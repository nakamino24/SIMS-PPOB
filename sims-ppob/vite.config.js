import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ⬅️ Pastikan base ini benar untuk Vercel
  build: {
    outDir: "dist",
  },
});
