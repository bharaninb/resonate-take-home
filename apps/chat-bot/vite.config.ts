/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/chat-bot',
  server: {
    port: 4200,
    host: 'localhost',
    hmr: {
      overlay: true,
    }
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [!process.env.VITEST && reactRouter()],
  // ssr: {
  //   noExternal: ['@ant-design/x'],
  // },
  
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    
  },
}));
