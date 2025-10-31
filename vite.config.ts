import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "src/core"),
      "@home": path.resolve(__dirname, "src/apps/home"),
      "@services": path.resolve(__dirname, "src/core/services"),
      "@components": path.resolve(__dirname, "src/apps/home/components"),
      "@styles": path.resolve(__dirname, "src/apps/home/styles"),
    },
  },
});
