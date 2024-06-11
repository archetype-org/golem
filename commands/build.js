import fs from 'fs'
import { Clack } from '@archetype-org/clack'
import { copyDeskToUrbit }  from '../lib/files.js'
import { isInGolemProject, isUrbitInstalled, isShipCreated, isDeskMountedOnShip } from '../lib/checks.js'
import { buildUI } from '../lib/react.js'

async function build ({ uiOnly, connect }) {
  try {
    await isInGolemProject()

    const { ships } = JSON.parse(fs.readFileSync('./ships/ships.json'))

    if (!uiOnly) {
      await isUrbitInstalled()

      for (const ship of ships) {
        const { pier, desks } = ship

        await isShipCreated(pier, { connect })

        for (const desk of desks) {
          await isDeskMountedOnShip(desk, pier)

          console.log(`BUILD: building desk ${desk} to urbit ship ${pier}`)
          await copyDeskToUrbit(desk, pier)
          const urbitSafeDeskName = `%${desk}`
          const clack = await Clack({ ship: `ships/${pier}` })
          await clack.commitDesk(urbitSafeDeskName)
          await clack.reviveDesk(urbitSafeDeskName)
        }
      }
    } else {
      console.log('BUILD: skipping desk build to urbit ship, because --ui-only flag was set') 
    }

    const uniqueDesks = new Set(ships.flatMap(ship => ship.desks))
    for (const desk of uniqueDesks) {
      console.log(`BUILD: building UI for ${desk}`)
      await buildUI(desk)
    }
    
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  build,
}
