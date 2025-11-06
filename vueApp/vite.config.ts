import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                // Tell Vue to treat these as native custom elements (web components)
                // and not try to resolve them as Vue components
                isCustomElement: tag => {
                    return tag === 'my-element' ||
                           tag === 'like-button' ||
                           tag === 'video-player';
                }
            }
        }
    })],
    server: {
        cors: true,
        port: 3333
    }
})
