import { basename, extname } from 'path'
import { Registry } from '../../ribbit/dist/index.js'
import { getAccount } from '../lib/accounts.js'
import { getFileList } from '../lib/files.js'
import {
	isInGolemProject,
	isValidLibraryPath,
} from '../lib/checks.js'

const CONTRACT_ID = 'lamentable-hobbies.testnet'

async function publish (path) {
  try {
  	await isInGolemProject()
  	await isValidLibraryPath(path)
  	const account = await getAccount()
  	const packageContent = packageLibrary(path)
		// console.log(JSON.stringify(packageContent, null, 2))

		const registry = await new Registry(account, CONTRACT_ID)
		await registry.uploadAndCreateManifest(
			basename(path),
			// todo: track and bump version
			'1.0.0',
			'json',
			packageContent
		)

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
