import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: "",
    build: {
        outDir: "build_out"
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/renderers/index', import.meta.url))
        }
    }
})
