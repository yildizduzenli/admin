import {reactRouter} from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    global: 'globalThis',
    'process.env': 'import.meta.env',
  },
  optimizeDeps: {
    include: ['@upstash/redis'],
  },
  resolve: {
    alias: {
      '@': '/app',
    },
  },
  ssr: {
    noExternal: ['@uiw/react-md-editor', '@uiw/react-markdown-preview'],
  },
});
