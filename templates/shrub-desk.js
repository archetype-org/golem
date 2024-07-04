import { cruft } from '../partials/cruft.js'
import { shrubFiles } from '../partials/shrub-files.js'

function shrubDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...shrubFiles(shipName, deskName),
  ]
  return { files }
}

export default shrubDesk

