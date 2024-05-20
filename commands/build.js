import fs from 'fs'
import { Clack } from '@archetype-org/clack'
import { copyDeskToUrbit }  from '../lib/files.js'
import { isInGolemProject, isUrbitInstalled, isShipCreated, isDeskMountedOnShip } from '../lib/checks.js'
import { buildUI } from '../lib/react.js'

async function build ({ uiOnly }) {
  try {
    await isInGolemProject()

    const { ships } = JSON.parse(fs.readFileSync('./ships/ships.json'))
    const { pier, desks } = ships[0] // only supports zod for now

    const deskName = desks[0]

    if (!uiOnly) {
      await isUrbitInstalled()
      await isShipCreated(pier)
      await isDeskMountedOnShip(deskName, pier)

      console.log('BUILD: building desk to urbit ship')
      await copyDeskToUrbit(deskName, pier)
      const urbitSafeDeskName = `%${deskName}`
      const clack = await Clack({ ship: `ships/${pier}` })
      await clack.commitDesk(urbitSafeDeskName)
      await clack.reviveDesk(urbitSafeDeskName)
    } else {
     console.log('BUILD: skipping desk build to urbit ship, because --ui-only flag set to true') 
    }
    
    console.log('BUILD: building UI')
    await buildUI(deskName)
    
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  build,
}
