import { fileURLToPath } from 'node:url';

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // mcp-server is an independent package with its own vitest config and
    // dependency tree; it must not be swept up by the root test run.
    exclude: [...configDefaults.exclude, 'mcp-server/**'],
  },
});
