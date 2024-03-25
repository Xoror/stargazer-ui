import fs from "fs";
import { readFile } from 'fs/promises';

const packageJson = JSON.parse(
  await readFile(
    new URL('../package.json', import.meta.url)
  )
)

const packageJsonTemplate = (folder) => {
    return {
      name: `${packageJson.name}/${folder}`,
      private: false,
      module: `./index.js`,
      types: `./index.d.ts`,
      peerDependencies: packageJson.peerDependencies,
    }
}

const getComponentsFolders = () => {
    const dirs = fs.readdirSync("./src")
    const dirsWithoutIndex = dirs.filter(name => !name.includes(".ts") && name != "styles" && name != "utils")
    return dirsWithoutIndex
  }
  
const write = () => {
    fs.writeFileSync(`./dist/package.json`, JSON.stringify(packageJson), 'utf-8')
    const folders = getComponentsFolders()
    folders.map(folder => {
        //fs.mkdirSync(`./dist/${folder}`)
        fs.writeFileSync(`./dist/${folder}/package.json`, JSON.stringify(packageJsonTemplate(folder)), 'utf-8', (error) => {
            // 4
            if (error) {
            console.log(`WRITE ERROR: ${error}`)
            } else {
            // 5
            console.log('FILE WRITTEN TO')
            }
        })
    })
}
write()