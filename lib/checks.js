const { fileExists, folderExists } = require("./files");
const { fetchUrbitBinary, bootFakeShip, restartFakeShip } = require("./urbit");

async function isInScrivenerProject () {
  const condition = await fileExists('ships/ships.json')
  if (!condition) {
    throw new Error(`Could not identify the current directory as a project. Make sure you are running the command from inside a project`)
  }
}

async function isUrbitInstalled () {
  try {
    const condition = await fileExists('./ships/urbit')
    if (!condition) {
      console.log(`no urbit binary found downloading...`)
      await fetchUrbitBinary()
    }
  } catch (err) {
    throw new Error(`Did not find the urbit binary installed in the project and failed to fetch a new copy. Check your internet connection and rerun the attempted command.`)
  }
}

async function isShipCreated (shipName, { shell } = { shell: false}) {
  try {
    const condition = await folderExists(`ships/${shipName}`)
    if (!condition) {
      console.log(`booting ${shipName} for the first time — may take a while`)
      await bootFakeShip(shipName, { shell })
    } else {
      console.log(`pier named ${shipName} already found, restarting`)
      await restartFakeShip(shipName, { shell })
    }
  } catch (err) {
    throw new Error(`failed to find or create ship named ${shipName}`)
  }
}

async function isDeskMountedOnShip (deskName, shipName) {
  const condition = await folderExists(`ships/${shipName}/${deskName}`)
  if (!condition) {
    // todo: replace error with mount
    throw new Error(`
desk ${deskName} not mounted on ship ~${shipName}
Make sure ~${shipName} is running and run the commands:

|new-desk %${deskName}
|mount %${deskName}

in the dojo, before rerunning this command
`
    )
  }
}

module.exports = {
  isInScrivenerProject,
  isUrbitInstalled,
  isShipCreated,
  isDeskMountedOnShip,
}
