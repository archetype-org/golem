import execSh from "exec-sh"
const execShPromise = execSh.promise
import { isInGolemProject } from '../lib/checks.js'
import { basename } from 'path'

async function removeDependency (name) {
  const projectName = basename(process.cwd())
  try {
    if (!!projectName && !!name) {
      await execShPromise(`rm -rf ./apps/${projectName}/desk-deps/${name}`);
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

async function uninstall (name) {
  try {
    await isInGolemProject()
    // todo: uninstall a package
    console.log(`Uninstalling ${name}`)
    await removeDependency(name)
    console.log(`Removed ${name} from dependencies`)
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  uninstall,
}
