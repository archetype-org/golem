import fs from 'fs'
import { isInGolemProject, isUrbitInstalled, isShipCreated } from "../lib/checks.js"

async function shell (shipName) {
  try {
    await isInGolemProject()
    await isUrbitInstalled()

    const { ships } = JSON.parse(fs.readFileSync('./ships/ships.json'))

    const ship = shipName 
      ? ships.find(s => s.pier === shipName) 
      : ships[0]

    if (!ship) {
      throw new Error(`Ship with name ${shipName} does not exist.`)
    }

    const { pier } = ship

    await isShipCreated(pier, { shell: true })
  } catch (err) {
    console.error(`SHELL: An error occurred while attempting to connect to ${shipName}:`, err)
    return err
  }
}

export {
  shell,
}
