import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Automatically discover all HTML files in src directory
const htmlFiles = glob.sync('src/**/*.html', {
  ignore: ['**/node_modules/**', '**/dist/**']
})

const input = htmlFiles.reduce((acc: Record<string, string>, file: string) => {
  // Generate a name from the file path (e.g., 'src/index.html' -> 'main')
  // 'src/simulateur-couts-ia/index.html' -> 'simulateur-couts-ia/index'
  const relativePath = path.relative('src', file)
  const name = relativePath === 'index.html'
    ? 'main'
    : relativePath.replace('.html', '')

  acc[name] = path.resolve(__dirname, file)
  return acc
}, {})

export default defineConfig({
  plugins: [react()],
  root: 'src',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input,
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
