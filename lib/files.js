import execSh from "exec-sh"
const execShPromise = execSh.promise
import { truthyString, leaf, branch } from './utils.js'

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
    await execShPromise(`cp -r ./apps/${desk}/desk-deps/urbit/* ./ships/${ship}/*`, true)
    await execShPromise(`cp -r ./apps/${desk}/desk-deps/landscape/* ./ships/${ship}/*`, true)
  } catch (err) {
    console.error(err)
    return err
  }
}

export {
  fileExists,
  folderExists,
  pathExists,
  createPath,
  createFile,
  copyDeskToUrbit,
}
