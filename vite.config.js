import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
//these are needed to preserve the folder structure so every component has its own entry point
import path, { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    // Dev config
    return {
      plugins: [react(), dts()],
      root: path.resolve(__dirname, 'dev'),
      build: {
        outDir: path.resolve(__dirname, 'dist'),
      },
    };
  } else {
    // Build config
    return {
      plugins: [react(), dts()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'ui',
          formats: ['es'],
          fileName: (format) => `ui.${format}.js`
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          input: Object.fromEntries(
            glob.sync('src/**/*.{ts,tsx}').map(file => [
              // The name of the entry point
              // lib/nested/foo.ts becomes nested/foo
              relative(
                'src',
                file.slice(0, file.length - extname(file).length)
              ),
              // The absolute path to the entry file
              // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
              fileURLToPath(new URL(file, import.meta.url))
            ])
          ),
          output: {
            inlineDynamicImports: false,
            entryFileNames: '[name].js',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            }
          }
        }
      }
    };
  }
});