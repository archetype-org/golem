import { cruft } from '../partials/cruft.js'
import { sailFiles } from '../partials/sail-files.js'
import { itemFiles } from '../partials/item-files.js'
import { reactFiles } from '../partials/react-files.js'

function sailDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...sailFiles(shipName, deskName),
    ...itemFiles(shipName, deskName),
    ...reactFiles(shipName, deskName),
  ]
  return { files }
}

export {
  sailDesk,
}
