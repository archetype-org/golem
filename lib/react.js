import execSh from "exec-sh"
import { pathExists } from './files.js'
const execShPromise = execSh.promise

async function buildUI (name) {
    const uiPath = `./apps/${name}/ui`
    if (!(await pathExists(uiPath))) {
        console.log(`BUILD: No /ui folder in ${name}, skipped building`)
        return
    }

    const nodeModulesPath = `${uiPath}/node_modules`

    if (!(await pathExists(nodeModulesPath))) {
        console.log("BUILD: node_modules not found, installing...")
        await execShPromise(`npm install --prefix ${uiPath}`)
    }

    const buildCommand = `npm run --prefix ${uiPath} build`
    return execShPromise(buildCommand)
}

export {
    buildUI,
}
