import { shrubCruft } from '../partials/shrub.js'

function shrubDesk (shipName, deskName) {
  const files = [
    ...shrubCruft(shipName, deskName),
  ]
  return { files }
}

export default shrubDesk

