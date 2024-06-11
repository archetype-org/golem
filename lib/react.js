import execSh from "exec-sh"
import fs from "fs"
const execShPromise = execSh.promise

async function buildUI (name) {
    const uiPath = `./apps/${name}/ui`
    const nodeModulesPath = `${uiPath}/node_modules`

    if (!fs.existsSync(nodeModulesPath)) {
        console.log("BUILD: node_modules not found, installing...")
        await execShPromise(`npm install --prefix ${uiPath}`)
    }

    const buildCommand = `npm run --prefix ${uiPath} build`
    return execShPromise(buildCommand)
}

export {
    buildUI,
}
