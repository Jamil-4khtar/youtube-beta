// export default {
//     base: '/youtube-beta/',
//     build: {
//         outDir: 'dist'
//     }
// }
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/youtube-beta/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: 'index.html',
                videoPage: 'src/pages/videoPage.html',
                searchPage: 'src/pages/searchPage.html'
            }
        }
    },
    server: {
        open: true
    }
})