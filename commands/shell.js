const fs = require('fs')
const { isInScrivenerProject, isUrbitInstalled, isShipCreated } = require("../lib/checks");
async function shell () {
  try {
    await isInScrivenerProject()
    await isUrbitInstalled()

    const { ships } = JSON.parse(fs.readFileSync('./ships/ships.json'))
    const { pier } = ships[0] // only supports zod for now

    await isShipCreated(pier, { shell: true })
  } catch (err) {
    console.log(err)
    return err
  }
}

module.exports = {
  shell,
}
