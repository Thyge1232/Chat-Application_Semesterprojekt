import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.venner.nu",
        changeOrigin: true,
        secure: false, // allow https without cert issues
        rewrite: (path) => path.replace(/^\/api/, ""), // 👈 strip /api
      },
    },
  },
});
