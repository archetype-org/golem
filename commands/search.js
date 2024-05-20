import { Registry } from '@archetype-org/ribbit'
import { getAccount } from '../lib/accounts.js'
import { isInGolemProject } from '../lib/checks.js'
import { CONTRACT_ID } from '../lib/constants.js'


function parsePackageName (packageName) {
  const isValidPackageName = pn => /^@.+\/.+/.test(pn)
  if (!isValidPackageName) throw new Error(`Invalid Package Name: ${packageName}`)
  const [accountId, name] = packageName.replace('@','').split('/')
  return { accountId, name }
}

async function search (packageName) {
  const { accountId, name } = parsePackageName(packageName)
  try {
    console.log(`SEARCH: Searching for : ${packageName}`)
    await isInGolemProject()
    const account = await getAccount()
    console.log(`SEARCH: Connecting to registry as ${account.accountId} . . .`)
    const registry = await new Registry(account, CONTRACT_ID)
    console.log(`SEARCH: Searching for @${accountId}/${name} in registry . . .`)
    const pkg = await registry.getLatestManifestDataFromGateway(accountId, name)
    if (!!pkg.files) {
        console.log(`SEARCH: Package ${name} found under ${accountId}! Install it with:\n
        golem install ${packageName}
`)
    } else {
      console.log(`SEARCH: No package found for ${packageName}`)
    }
  } catch (err) {
    console.log(`SEARCH: No package found for ${packageName}`)
    return err
  }
}

export {
  search,
}
