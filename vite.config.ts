import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(),
    // , eslintPlugin()
    tsconfigPaths()
  ],
  build: {
    target: 'es2015'
  }
})
