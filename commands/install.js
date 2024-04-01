import { basename } from 'path'
import { Registry } from '@archetype-org/ribbit'
import { getAccount } from '../lib/accounts.js'
import { isInGolemProject } from '../lib/checks.js'
import { createFile } from '../lib/files.js'
import { CONTRACT_ID } from '../lib/constants.js'


function parsePackageName (packageName) {
  const isValidPackageName = pn => /^@.+\/.+/.test(pn)
  if (!isValidPackageName) throw new Error(`Invalid Package Name: ${packageName}`)
  const [accountId, name] = packageName.replace('@','').split('/')
  return { accountId, name }
}

async function install (packageName) {
  const { accountId, name } = parsePackageName(packageName)
  try {
    const projectName = basename(process.cwd())
    console.log(`Installing: ${packageName} into ${projectName}`)
    await isInGolemProject()
    const account = await getAccount()
    console.log(`Connecting to registry as ${account.accountId} . . .`)
    const registry = await new Registry(account, CONTRACT_ID)
    const pkg = await registry.getLatestManifestDataFromGateway(accountId, packageName)
    console.log(`${packageName} retrieved! writing files . . .`)
    for (let file of pkg.files ) {
      createFile(`./apps/${projectName}/desk-deps/${pkg.package}${file.path}`, file.content)
    }
    console.log(`Installed: ${packageName} successfully!`)
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  install,
}
