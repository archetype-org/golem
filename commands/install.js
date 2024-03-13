import { Registry } from '../../ribbit/dist/index.js'
import { getAccount } from '../lib/accounts.js'
import { isInGolemProject } from '../lib/checks.js'
import { basename } from 'path'

const CONTRACT_ID = 'lamentable-hobbies.testnet'

async function install (name) {
  try {
    const projectName = basename(process.cwd())
    console.log(`Installing: ${name} into ${projectName}`)
    await isInGolemProject()
    const account = await getAccount()
    const registry = await new Registry(account, CONTRACT_ID)
    const pkg = await registry.getLatestManifestData(account.accountId, name)    
    for (let file of pkg.files ) {
      createFile(`./apps/${projectName}/desk-deps/${pkg.package}${file.path}`)
    }
    console.log(`Installed: ${name}`)
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  install,
}
