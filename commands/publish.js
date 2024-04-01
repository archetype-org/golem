import { basename, extname } from 'path'
import { Registry } from '@archetype-org/ribbit'
import { getAccount } from '../lib/accounts.js'
import { getFileList, packageLibrary } from '../lib/files.js'
import { CONTRACT_ID } from '../lib/constants.js'

import {
	isInGolemProject,
	isValidLibraryPath,
} from '../lib/checks.js'

async function publish (path, version) {
  try {
  	await isInGolemProject()
  	await isValidLibraryPath(path)
  	const account = await getAccount()
  	console.log(`Successfully logged into NEAR with ${account.accountId} . . .\n`)
  	console.log(`Packaging ${path} . . .`)
  	const packageName = `@${account.accountId}/${basename(path)}`
  	const files = packageLibrary(path)
  	const packageContent ={
  		package: packageName,
  		files,
  	}
  	console.log(`${path} packaged Successfully as ${packageName}!`)
  	console.log(`Registering ${packageName} at the package registry and uploading . . .\n\n`)
		const registry = await new Registry(account, CONTRACT_ID)
		await registry.uploadAndCreateManifestWithPinning(
			packageContent.package,
			version,
			'urbit-library',
			packageContent
		)
  	console.log(`\n\n${packageName} V${version} successfully registered!
install it with:
		golem install ${packageName}
`)
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  publish,
}
