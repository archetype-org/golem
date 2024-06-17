import { Clack } from '@archetype-org/clack'
import { fileExists, folderExists } from './files.js'
import { fetchUrbitBinary, bootFakeShip, restartFakeShip } from './urbit.js'

async function isInGolemProject () {
  const condition = await fileExists('ships.json')
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

async function isShipCreated (shipName, { shell, connect } = { shell: false, connect: false }) {
  try {
    const condition = await folderExists(`ships/${shipName}`)
    if (!condition) {
      console.log(`booting ${shipName} for the first time — may take a while`)
      await bootFakeShip(shipName, { shell })
    } else {
      if (connect) {
        console.log(`pier named ${shipName} already found, attempting to connect to running ${shipName}`)
      } else {
        console.log(`pier named ${shipName} already found, restarting`)
        await restartFakeShip(shipName, { shell })
      }
    }
  } catch (err) {
    throw new Error(`failed to find or create ship named ${shipName}`)
  }
}

async function isDeskMountedOnShip (deskName, shipName) {
  const condition = await folderExists(`ships/${shipName}/${deskName}`)
  if (!condition) {
    const urbitSafeDeskName = `%${deskName}`
    try {
      console.log(`No desk found. Attempting to create and mount ${urbitSafeDeskName} on ${shipName}`)
      const clack = await Clack({ ship: `ships/${shipName}` })
      await clack.createDesk(urbitSafeDeskName)
      console.log(`Created ${urbitSafeDeskName} on ${shipName}`)
      await clack.mountDesk(urbitSafeDeskName)
      console.log(`Mounted ${urbitSafeDeskName} on ${shipName}`)
      await clack.close()
      console.log(`Desk ${urbitSafeDeskName} is ready`)
    } catch (err) {
      console.error(err)
      throw new Error(`
  could not create desk ${urbitSafeDeskName} on ship ~${shipName}
  Make sure ~${shipName} is running and run the commands:

  |new-desk ${urbitSafeDeskName}
  |mount ${urbitSafeDeskName}

  in the dojo, before rerunning this command
  `
      )
    }
  }
}

async function isValidLibraryPath(path) {
  const isInvalid = (path) => path[0] === '.' || path[0] === '*'
  if (isInvalid(path)) {
    throw new Error(
      `Cannot use relative path or glob syntax in the path to your library: ${path}`
    )
  }
}

export {
  isInGolemProject,
  isUrbitInstalled,
  isShipCreated,
  isDeskMountedOnShip,
  isValidLibraryPath,
}
