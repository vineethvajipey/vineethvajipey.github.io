import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        main: './index.html',
        blog: './pages/blog.html',
        post1: './pages/blog/post1.html',
        post2: './pages/blog/post2.html'
      },
      output: {
        manualChunks: {
          'orbit-animations': ['./src/js/OrbitWheel.js'],
          'scroll-effects': ['./src/js/ScrollHandler.js'],
          'navigation': ['./src/js/Navigation.js']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    exclude: []
  }
});