import fs from 'fs'
import { isInGolemProject, isUrbitInstalled, isShipCreated, isDeskMountedOnShip } from '../lib/checks.js'

async function init () {
  try {
    await isInGolemProject()

    const { ships } = JSON.parse(fs.readFileSync('./ships.json'))

    await isUrbitInstalled()

    for (const ship of ships) {
      const { pier, desks } = ship

      console.log(`INIT: Creating ship for ${pier}...`)
      await isShipCreated(pier)
      console.log(`INIT: ${pier} created.`)

      for (const desk of desks) {
        console.log(`INIT: Mounting ${desk} on ${pier}...`)
        await isDeskMountedOnShip(desk, pier)
        console.log(`INIT: Successfully mounted desk: ${desk} on pier: ${pier}.`)
      }
    }

    console.log(`INIT: The fakeships: ${ships.map(ship => ship.pier).join(', ')} have been initialized with ${ships.flatMap(ship => ship.desks).join(', ')}`)

  } catch (err) {
    console.error('INIT: An error occurred while attempting to create the fakeships:', err)
    return err
  }
}

export {
  init,
}
