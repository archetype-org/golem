import { basename, extname } from 'path'
import { Registry } from '@archetype-org/ribbit'
import { getAccount } from '../lib/accounts.js'
import { getFileList } from '../lib/files.js'
import {
	isInGolemProject,
	isValidLibraryPath,
} from '../lib/checks.js'

const CONTRACT_ID = 'lamentable-hobbies.testnet'

async function publish (path, version) {
  try {
  	await isInGolemProject()
  	await isValidLibraryPath(path)
  	const account = await getAccount()
  	console.log(`Successfully logged into NEAR with ${account.accountId} . . .\n`)
  	console.log(`Packaging ${path} . . .`)
  	const packageContent = packageLibrary(path)
  	const packageName = `@${account.accountId}/${basename(path)}`
  	console.log(`${path} packaged Successfully as ${packageName}!`)
  	console.log(`Registering ${packageName} at the package registry and uploading . . .\n\n`)
		const registry = await new Registry(account, CONTRACT_ID)
		await registry.uploadAndCreateManifestWithPinning(
			basename(path),
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

function packageLibrary (path) {
	// local checks & conditionals
	const isContainedIn = (array, item) => new Set(array).has(item)
	const isInSpecialFolder = (path) => isContainedIn(
		['lib', 'mar', 'sur', 'ted', 'app'],
		path.split('/')[0]
	)
	const isRoot = (path) => path[0] === '/'

	// get files at path
  const projectName = basename(process.cwd())
	const libraryPath = isRoot(path) ? `./apps/${projectName}/desk${path}` :
		isInSpecialFolder(path) ?  `./apps/${projectName}/desk/${path}` :
			`./apps/${projectName}/desk/lib/${path}`
	const files = getFileList(libraryPath) 
	
	return {
		package: basename(libraryPath),
		files, 
	}
}

export {
  publish,
}
