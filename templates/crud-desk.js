import { cruft } from '../partials/cruft.js'
import { crudAgent } from '../partials/crud-agent.js'
import { itemFiles } from '../partials/item-files.js'
import { reactFiles } from '../partials/react-files.js'

function crudDesk (shipName, deskName) {
  const files = [
    ...cruft(shipName, deskName),
    ...crudAgent(shipName, deskName),
    ...itemFiles(shipName, deskName),
    ...reactFiles(shipName, deskName),
  ]
  return { files }
}

export default crudDesk
