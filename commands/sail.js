const { fileExists, folderExists } = require("../lib/files");
const { fetchUrbitBinary, bootFakeShip, restartFakeShip } = require("../lib/urbit");

async function sail (shipName) {
  try {
    const urbitInstalled = await fileExists('urbit')
    if (!urbitInstalled) {
      console.log(`no urbit binary found downloading...`)
      await fetchUrbitBinary()
    }
    const shipCreated = await folderExists(shipName)
    if (!shipCreated) {
      console.log(`booting ${shipName} for the first time — may take a while`)
      await bootFakeShip(shipName)
    } else {
      console.log(`pier named ${shipName} already found, restarting`)
      await restartFakeShip(shipName)
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  sail,
}
