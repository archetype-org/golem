const execShPromise = require("exec-sh").promise
async function fileExists (fileName) {
  try {
    const { stdout } = await execShPromise(`[ -f ${fileName} ] && echo "true"`, true);
    const exists = stdout.trim() === 'true'
    return exists
  } catch (err) {
    if (err.code === 1) {
      // code 1 means it does not exist
      return false
    }
    console.error(err)
    return err
  }
}

async function folderExists (dirName) {
  try {
    const { stdout } = await execShPromise(`[ -d ${dirName} ] && echo "true"`, true);
    const exists = stdout.trim() === 'true'
    return exists
  } catch (err) {
    if (err.code === 1) {
      // code 1 means it does not exist
      return false
    }
    console.error(err)
    return err
  }
}

module.exports = {
  fileExists,
  folderExists,
}
