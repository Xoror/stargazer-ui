import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
//import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";

import fs from "fs"
import { readFile } from 'fs/promises';

const packageJson = JSON.parse(
  await readFile(
    new URL('./package.json', import.meta.url)
  )
)
const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json"
  }),
  //terser(),
]

const getComponentsFolders = () => {
  const dirs = fs.readdirSync("./src")
  const dirsWithoutIndex = dirs.filter(name => !name.includes(".ts") && name != "styles" && name != "utils")
  return dirsWithoutIndex
}

const component = (folder) => {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `dist/${folder}/index.esm.js`,
        exports: 'named',
        sourcemap: true,
        format: 'esm',

      },
      {
        file: `dist/${folder}/index.cjs.js`,
        exports: 'named',
        sourcemap: true,
        format: 'cjs',
      }
    ],
    plugins: [
      ...plugins,
      generatePackageJson({
        baseContents: {
          name: `${packageJson.name}/${folder}`,
          private: false,
          main: './index.cjs.js',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/${folder}/`
      }),
    ],
    external: [/node_modules/, /\.\.\/utils/],
  };
}

export default [
  {
    input: ['src/index.ts', ...getComponentsFolders().map(folder => `src/${folder}/index.ts`)],
    output: [
      {
        dir: "dist",
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        banner: `'use client';`,
        preserveModules: true,
        preserveModulesRoot: 'src',
      }
    ],
    plugins: plugins,
    external: ['react', 'react-dom'],
  }
]
/*
  {
    input: ['src/index.ts', 'src/Button/index.ts'],
    output: [
      {
        dir:"dist",
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
      }
    ],
    plugins: plugins,
    external: ['react', 'react-dom'],
  }
]
*/


/*
      {
        input: 'src/index.ts',
        output: [
          {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
          },
        ],
        plugins: [...plugins],
        external: ['react', 'react-dom'],
      },
];
*/

/* Code split, works well but for intellisense
{
  input: ['src/index.ts', 'src/Button/index.ts'],
  output: [
    {
      dir: "dist",
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
    },
  ],
  plugins: [...plugins],
  external: ['react', 'react-dom'],

*/