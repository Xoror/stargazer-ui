import readline from 'node:readline';
import { readFile, writeFile } from 'fs/promises';
import { writeFileSync } from 'node:fs';

const fetchLatestVersionNumber = async () => {
    try {
        const response = await fetch("https://registry.npmjs.org/-/v1/search?text=stargazer-ui")
        const data = await response.json()
        const packageData = data.objects.find(data => data.package.name === "stargazer-ui")
        return packageData.package.version
    } catch(err) {
        console.log(err)
    }
}
const latestVersion = await fetchLatestVersionNumber()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const vars = process.argv.slice(2)
if(vars.length === 0) {
    throw new Error("You need to provide a version type as an argument")
} 
const versionChangeTyp = vars.find(entry => entry.includes("--version")).split("=")[1]
const validInputs = ["major", "minor", "bugfix"]
if(!validInputs.includes(versionChangeTyp.toLowerCase())) {
    throw new Error("Invalid semver type!")
}
const packageJson = JSON.parse(
    await readFile(
        new URL('../package.json', import.meta.url)
    )
)
const versionArray= latestVersion.split(".")
switch(versionChangeTyp) {
    case "major":
        versionArray[0] = parseFloat(versionArray[0]) + 1
        break
    case "minor":
        versionArray[1] = parseFloat(versionArray[1]) + 1
        break
    case "bugfix":
        versionArray[2] = parseFloat(versionArray[2]) + 1
        break
    default:
        break
}
packageJson.version = versionArray.join(".")
//writeFileSync(`../package.json`, JSON.stringify(packageJson, null, "\t"), 'utf-8')
try {
    writeFile(`./package.json`, JSON.stringify(packageJson, null, "\t"), 'utf-8').then(result => {
        console.log("write file then", result)
    }).finally(() => {
        console.log("file written")
        process.exit()
    })
} catch (err) {
    throw new Error(err)
}

/*
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
*/