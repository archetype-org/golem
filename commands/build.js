const fs = require('fs')
const { copyDeskToUrbit} = require("../lib/files")
const { isInScrivenerProject, isUrbitInstalled, isShipCreated, isDeskMountedOnShip } = require("../lib/checks")

async function build () {
  try {
    await isInScrivenerProject()

    const { ships } = JSON.parse(fs.readFileSync('./ships/ships.json'))
    const { pier, desks } = ships[0] // only supports zod for now

    await isUrbitInstalled()
    await isShipCreated(pier)
    await isDeskMountedOnShip(desks[0], pier)

    await copyDeskToUrbit(desks[0], pier)
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  build,
}
