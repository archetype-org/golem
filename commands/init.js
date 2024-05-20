import fs from 'fs'
import { isInGolemProject, isUrbitInstalled, isShipCreated, isDeskMountedOnShip } from '../lib/checks.js'

async function init () {
  try {
    await isInGolemProject()

    const { ships } = JSON.parse(fs.readFileSync('./ships/ships.json'))
    const { pier, desks } = ships[0] // only supports zod for now

    await isUrbitInstalled()
    await isShipCreated(pier)
    await isDeskMountedOnShip(desks[0], pier)
    console.log(`Initialized fakeship for ${desks[0]}`)

  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  init,
}
