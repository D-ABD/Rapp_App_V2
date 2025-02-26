import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // ✅ Active les variables globales (`test`, `expect`)
    environment: 'jsdom', // ✅ Simule un navigateur pour tester React
    setupFiles: './src/setupTests.ts', // ✅ Charge la config Jest-DOM
  },
});
