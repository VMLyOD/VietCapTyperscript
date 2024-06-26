import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),reactRefresh()],
  server: {
    port: 3333
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      buffer: 'buffer/',
      '~': path.resolve(__dirname, './src')
    }
  }
})
