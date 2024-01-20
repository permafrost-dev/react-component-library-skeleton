import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const resolvePath = str => resolve(new URL(import.meta.url).pathname.replace('/vite.config.js', ''), str);

export default defineConfig({
    plugins: [
        externalizeDeps({
            deps: false,
            devDeps: false,
            except: [],
            nodeBuiltins: true,
            optionalDeps: true,
            peerDeps: true,
            useFile: resolvePath('package.json'),
        }),
    ],
    build: {
        lib: {
            name: '{package.name}',
            entry: ['src/index.tsx'],
            formats: ['es', 'cjs'],

        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
        cssMinify: 'lightningcss',
    },
    cacheDir: resolvePath('.cache'),
    resolve: {
        alias: {
            '@': resolvePath('./src'),
        },
    },
    define: {
        //'process.env.NODE_ENV': '"production"',
    },
});
