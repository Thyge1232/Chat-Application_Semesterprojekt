import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { env } from "process";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setupTests.ts",
    coverage: {
      provider: "v8",
      exclude: [
        "src/main.tsx", //entry point
        "src/app/App.tsx", //just the app wrapper
        "src/config/**", //configuration
        "src/features/**/types/**", //type definitions
        "src/api/**",
        "eslint.config.js",
        "vitest.config.ts",
        "vite.config.ts",
        "src/vite-env.d.ts",
      ],
      reporter: ["text", "text-summary", "lcov", "html", "cobertura"],
      reportsDirectory: "./coverage",
    },
  },
});
