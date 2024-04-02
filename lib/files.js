import { readFileSync, readdirSync } from 'fs'
import { basename, extname, dirname} from 'path'
import { fileURLToPath } from 'url';
import execSh from "exec-sh"
const execShPromise = execSh.promise
import { truthyString, leaf, branch } from './utils.js'

const golemPath = dirname(fileURLToPath(import.meta.url));

async function nodeExists (nodeName, nodeKind='file') {
  const flag = {
    file: '-f',
    directory: '-d',
  }[nodeKind]
  try {
    const { ['stdout']: exists } = await execShPromise(`[ ${flag} ${nodeName} ] && echo "true" || echo "false"`, true);
    return truthyString(exists.trim())
  } catch (err) {
    console.error(err)
    return err
  }
}

async function fileExists (fileName) {
  return nodeExists(fileName)
}

async function pathExists (dirName) {
  return nodeExists(dirName, 'directory')
}

async function folderExists (dirName) {
  // folder is just a path of one
  return pathExists(dirName)
}
async function _makeDir (path) {
  try {
    await execShPromise(`mkdir ${path}`, true);
  } catch (err) {
    console.error(err)
    return err
  }
}

async function createPath (path) {
  const b = branch(path)
  if (!(await pathExists(b))) await createPath(b)
  if (!(await pathExists(path))) await _makeDir(path)
}


async function createFile (path, contents) {
  const b = branch(path)
  const fileName = leaf(path)
  await createPath(b)
  try {
    await execShPromise(`
cat << EOF > ${b}/${fileName}
${contents}
EOF
`, true);
  } catch (err) {
    console.error(err)
    return err
  }
}

async function copyDeskToUrbit (desk, ship) {
  try {
    await execShPromise(`cp -r ./apps/${desk}/desk/* ./ships/${ship}/*`, true)
    const packageDeps = readdirSync(`./apps/${desk}/desk-deps`)
    for (const packageName of packageDeps) {
      if (packageName[0] !== '@') {
        await execShPromise(`cp -r ./apps/${desk}/desk-deps/${packageName}/* ./ships/${ship}/*`, true)
      } else {
        // '@' means its an org folder!
        const orgName = packageName
        const orgPackageDeps = readdirSync(`./apps/${desk}/desk-deps/${orgName}`)
        for (const orgPackageName of orgPackageDeps) {
          await execShPromise(`cp -r ./apps/${desk}/desk-deps/${orgName}/${orgPackageName}/* ./ships/${ship}/*`, true)
        }
      }
    }
  } catch (err) {
    console.error(err)
    return err
  }
}

function getFileList (path) {
  if (isFolder(path)) {
    return readdirSync(path)
      .map((childName) => getFileList(`${path}/${childName}`))
      .reduce((all, child) => [...all, ...child],
      [])
  } else {
    return [{ 
      path: path.split('desk')[1],
      content: readFileSync(path, { encoding: 'utf8' }),
     }]
  }
}

function isFolder (path) {
  // a folder wont have a file extension name
  return !extname(path)
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
  return files
}

async function getTemplates () {
  const templateSuffix = '-desk.js'
  const templateFiles = readdirSync(`${golemPath}/../templates`)
    .filter(fileName => fileName.indexOf(templateSuffix) != -1)
  const templates = {}
  for (const fileName of templateFiles) {
    const templateName = basename(fileName).replace(templateSuffix,'')
    const { default: templateFunction } = await import(`../templates/${fileName}`)
    templates[templateName] = templateFunction
  }
  return templates
}

export {
  fileExists,
  folderExists,
  pathExists,
  createPath,
  createFile,
  copyDeskToUrbit,
  getFileList,
  isFolder,
  packageLibrary,
  getTemplates,
}
