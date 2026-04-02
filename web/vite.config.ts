import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      'class-transformer/storage': 'class-transformer'
    }
  },
  optimizeDeps: {
    include: [ '@app/common' ]
  },
  build: {
    commonjsOptions: {
      include: [ /common/, /node_modules/ ]
    }
  },
  define: {
    'process.env': {}
  }
})
