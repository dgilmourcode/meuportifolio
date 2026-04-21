import { defineConfig } from 'vite'

export default defineConfig({
  base: '/meuportifolio/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    // Divide o bundle em chunks menores — carregamento paralelo mais rápido
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [], // reservado para futuras libs externas
        },
        // Nomes previsíveis para cache de longo prazo
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // Avisa se algum chunk ultrapassar 400kb
    chunkSizeWarningLimit: 400,
    // Otimiza imagens e assets pequenos como inline base64
    assetsInlineLimit: 4096,
  },
})