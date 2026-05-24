import readline from 'node:readline';
import { readFile } from 'fs/promises';
import { writeFileSync } from 'node:fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What change did you make (major/minor/bugfix)?\n`, async name => {
    const validInputs = ["major", "minor", "bugfix"]
    if(!validInputs.includes(name.toLowerCase())) {
        throw new Error("Invalid semver type!")
    }

    const packageJson = JSON.parse(
        await readFile(
            new URL('../package.json', import.meta.url)
        )
    )
    const test = packageJson.version.split(".")
    switch(name) {
        case "major":
            test[0] = parseFloat(test[0]) + 1
            break
        case "minor":
            test[1] = parseFloat(test[1]) + 1
            break
        case "bugfix":
            test[2] = parseFloat(test[2]) + 1
            break
        default:
            break
    }
    packageJson.version = test.join(".")
    writeFileSync(`../package.json`, JSON.stringify(packageJson, null, "\t"), 'utf-8')
    rl.close();
})