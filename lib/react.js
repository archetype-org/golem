import execSh from "exec-sh"
const execShPromise = execSh.promise

async function buildUI (name) {
    return execShPromise(`npm run --prefix ./apps/${name}/ui build`)
}

export {
    buildUI,
}

