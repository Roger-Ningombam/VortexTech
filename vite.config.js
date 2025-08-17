import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This tells Vite where the deployed project will live.
  base: '/VortexTech/', 
  plugins: [react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  },
  assetsInclude: ['**/*.glb', '**/*.gltf']
})