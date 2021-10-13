import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()
    // , eslintPlugin()
  ],
  build: {
    target: 'es2015'
  }
})
