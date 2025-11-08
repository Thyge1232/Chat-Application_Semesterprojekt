import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

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
      ],
      reporter: ["text", "text-summary", "lcov", "html", "cobertura"],
      reportsDirectory: "./coverage",
    },
  },
});
