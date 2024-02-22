import fs from 'fs'
import { isInGolemProject, isUrbitInstalled, isShipCreated } from "../lib/checks.js"

async function shell () {
  try {
    await isInGolemProject()
    await isUrbitInstalled()

    const { ships } = JSON.parse(fs.readFileSync('./ships/ships.json'))
    const { pier } = ships[0] // only supports zod for now

    await isShipCreated(pier, { shell: true })
  } catch (err) {
    console.log(err)
    return err
  }
}

export {
  shell,
}
