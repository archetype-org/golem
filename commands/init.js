import fs from 'fs'
import { Clack } from '@archetype-org/clack'
import { copyDeskToUrbit }  from '../lib/files.js'
import { isInGolemProject, isUrbitInstalled, isShipCreated, isDeskMountedOnShip } from '../lib/checks.js'

async function build () {
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
  build,
}
