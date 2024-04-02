import execSh from 'exec-sh'
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

function parsePackageName (packageName) {
  const isValidPackageName = pn => /^@.+\/.+/.test(pn)
  if (!isValidPackageName) throw new Error(`Invalid Package Name: ${packageName}`)
  const [accountId, name] = packageName.replace('@','').split('/')
  return { accountId, name }
}

async function uninstall (packageName) {
  try {
    await isInGolemProject()
    console.log(`Uninstalling ${packageName}`)
    await removeDependency(packageName)
    console.log(`Removed ${packageName} from dependencies`)
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  uninstall,
}
